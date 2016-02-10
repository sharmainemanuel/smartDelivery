app.controller('LoginCtrl',['$scope','$ionicModal','$http','$localDb','$rootScope','$location','$ionicHistory','$ionicLoading','$timeout', function($scope,$ionicModal,$http,$localDb,$rootScope,$location,$ionicHistory,$ionicLoading,$timeout){
	$scope.active = 'customer';
	$scope.formData = {};
	$scope.regData = {};
	$rootScope.disableSide();    

	$scope.showLoadLog = function(){
	  	$ionicLoading.show({
		 template: 'Loading...',
		 duration: '3000'
		});	
  	};

	$scope.showLoad = function(){
	  	$ionicLoading.show({
		 template: 'Loading...',
		 duration: '3000'
		});	

	  	$timeout(function(){
	  		$location.path('/tab/dash');
	  		$scope.hideLoad();
	  	},3000);
  	};
  	$scope.showLoadDeliver = function(){
	  	$ionicLoading.show({
		 template: 'Loading...',
		 duration: '3000'
		});	

	  	$timeout(function(){
	  		$location.path('/tabdelivery/ddash');
	  		$scope.hideLoad();
	  	},3000);
  	};

	if(localStorage.getItem("userlog")!=null&&JSON.parse(localStorage.getItem("userlog"))[0].usertype=="customer"){
		var onOrderComplete = function(response){
			console.log(response.data);
			console.log(JSON.stringify(response.data));
			$localDb.setReceiveOrders(response.data);
			$rootScope.enableSide();
		}
		var cstmer = $localDb.getUserId();			
		$http.post("http://iligtas.ph/smartDelivery/smartd/__getorders.php",{customer:cstmer}).then(onOrderComplete);
		$scope.showLoad();
  	}
  	if(localStorage.getItem("userlog")!=null&&JSON.parse(localStorage.getItem("userlog"))[0].usertype=="delivery"){
  		$rootScope.disableSide();	
		$scope.showLoadDeliver();
  	}

    $scope.setActive = function(type) {
        $scope.active = type;
    };
    
    $scope.isActive = function(type) {
        return type === $scope.active;
    };
    
    $ionicModal.fromTemplateUrl('templates/modals/signup.html', {
	    scope: $scope,
	    animation: 'slide-in-up',
	    backdropClickToClose: true
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });

	  $scope.openSignUp = function() {
	    $scope.myTitle = "SignUp";
	    $scope.modal.show();
	  };
	  $scope.closeModal = function() {
	    $scope.modal.hide();
	  };
	  //Cleanup the modal when we're done with it!
	  $scope.$on('$destroy', function() {
	    $scope.modal.remove();
	  });
	  // Execute action on hide modal
	  $scope.$on('modal.hidden', function() {
	    // Execute action
	  });
	  // Execute action on remove modal
	  $scope.$on('modal.removed', function() {
	    // Execute action
	  });
	  
       $scope.hideLoad = function(){
	      $ionicLoading.hide();
	   };

	  $scope.loginCustomer = function(){
	  	var user = $scope.formData.user;
		var pass = $scope.formData.pass;
		if($scope.active=="customer"){
			$http.post("http://iligtas.ph/smartDelivery/smartd/__login.php",{username:user,password:pass}).then(onUserCompleteUser);	
		}
		if($scope.active=="delivery"){
			$scope.showLoadLog();
			$http.post("http://iligtas.ph/smartDelivery/smartd/__logindeliver.php",{username:user,password:pass}).then(onDeliveryCompleteUser);	
		}
	 };

	 var onUserCompleteUser = function(response){
		console.log(response.data);
		if(response.data != "false"){
			$localDb.userSetItem(response.data);
			$ionicHistory.clearHistory();
			$ionicHistory.clearCache();
		    //REMOVE BACK BUTTON ON THE REDIRECT PAGE
		    $ionicHistory.nextViewOptions({
		      disableBack: true
		    });
			var onOrderComplete = function(response){
				console.log(response.data);
				$rootScope.enableSide();
				$localDb.setReceiveOrders(response.data);	
				$rootScope.updateUser();
				$location.path('/tab/dash');
			}
			var cstmer = $localDb.getUserId();			
			$http.post("http://iligtas.ph/smartDelivery/smartd/__getorders.php",{customer:cstmer}).then(onOrderComplete);
		}
		else{
			console.log("Account Doesnt Exist");
		}
	 }

	 var onDeliveryCompleteUser = function(response){
		console.log(response.data);
		var delivert = response.data.deliveryid;
		if(response.data != "false"){
			response.data.usertype = $scope.active;
			$localDb.userSetItem(response.data);
			var onRequestSuccess = function(responses){
				console.log(responses.data);
				var storage = [];
				storage.push(JSON.stringify(responses.data));
				localStorage.setItem("deliveredItem",storage);
				$rootScope.disableSide();
				$scope.hideLoad();
				$location.path('/tabdelivery/ddash');
			}
			$http.post("http://iligtas.ph/smartDelivery/smartd/__getdelivered.php",{deliveryman:delivert}).then(onRequestSuccess);
			$ionicHistory.clearHistory();
			$ionicHistory.clearCache();
		    //REMOVE BACK BUTTON ON THE REDIRECT PAGE
		    $ionicHistory.nextViewOptions({
		      disableBack: true
		    });
		}
		else{
			console.log("Account Doesnt Exist");
		}
	 }
	 $scope.checkModel = {isAgree:false};
	 $scope.createAccount = function(){
	 	console.log($scope.regData);
	 	if($scope.regData.password == $scope.regData.cpassword && $scope.checkModel.isAgree == true){
	 		console.log("Parehas");
	 	}
	 }
}]);