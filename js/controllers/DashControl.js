app.controller('DashCtrl',['$scope', '$rootScope','$ionicLoading','$http','$localDb','$timeout','$ionicModal',function($scope,$rootScope,$ionicLoading,$http,$localDb,$timeout,$ionicModal){
	/*$ionicLoading.show({
	    template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'

	});
    $scope.hideLoad = function(){
	   	$ionicLoading.hide();
	};*/
	var onSuc = function(responsess){
		console.log(responsess.data);
	};
	$scope.acceptDeliver = function(dop){
		var storage = JSON.parse(localStorage.getItem("userlog"));
		$http.post("http://iligtas.ph/smartDelivery/smartd/__acceptorders.php",{pdate:dop,customer:storage[0].userid}).then(onSuc);
		$scope.closeModal();
		$scope.doRefresh();
	}
	var onDeliverSuccess = function(responses){
		console.log(responses.data);
		$scope.customerorder = responses.data;
	}
	$ionicModal.fromTemplateUrl('templates/modals/view-orderscustomer.html', {
	    scope: $scope,
	    animation: 'slide-in-up',
	    backdropClickToClose: true
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });

	  $ionicModal.fromTemplateUrl('templates/modals/view-orderscustomers.html', {
	    scope: $scope,
	    animation: 'slide-in-up',
	    backdropClickToClose: true
	  }).then(function(modal) {
	    $scope.modal2 = modal;
	  });

	  $scope.openModal = function(title,dop,customer) {
	  	var storage = JSON.parse(localStorage.getItem("userlog"));
	    $scope.myTitle = title;
	    $scope.modal.show();
	    $http.post("http://iligtas.ph/smartDelivery/smartd/__getordercustomer.php",{dpurchase:dop,customer:storage[0].userid}).then(onDeliverSuccess);
	  };

	  $scope.openModal2 = function(title) {
	    $scope.myTitle = title;
	    $scope.modal2.show();
	  };

	  $scope.getOrderList = function(title,dop,customer){
	  	var storage = JSON.parse(localStorage.getItem("userlog"));
	  	$http.post("http://iligtas.ph/smartDelivery/smartd/__getordercustomerpending.php",{dpurchase:dop,customer:storage[0].userid}).then(onDeliverSuccess);
	  	$scope.openModal2(title);
	  }
	  $scope.getOrderList2 = function(title,dop,customer){
	  	var storage = JSON.parse(localStorage.getItem("userlog"));
	  	$http.post("http://iligtas.ph/smartDelivery/smartd/__getordercustomersuccess.php",{dpurchase:dop,customer:storage[0].userid}).then(onDeliverSuccess);
	  	$scope.openModal2(title);
	  }
	  $scope.closeModal = function() {
	    $scope.modal.hide();
	    $scope.customerorder = [];
	  };
	  $scope.closeModal2 = function() {
	    $scope.modal2.hide();
	    $scope.customerorder = [];
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

	var uid = $localDb.getUserId();

	var onDeliverComplete = function(responses){
		if(responses.data != "0null"){
			console.log(responses.data);
		  $scope.ondeliver = responses.data;
		  console.log("deliver complete");
		}
	};
	var onOrderComplete = function(responsess){
		if(responsess.data!="null"){
			console.log(responsess.data);
			  localStorage.removeItem("successOrder");
			  $localDb.setReceiveOrders(responsess.data);
			  $scope.orders = null;
			  $scope.orders = $localDb.getReceiveOrders();
			  console.log("orderComplete");
		}
	};

	var onRequestComplete = function(response){
	  if(response.data!="0null"){
	  	console.log(response.data);
	  $scope.pending = response.data;
	  }
	  $http.post("http://iligtas.ph/smartDelivery/smartd/__getorders.php",{customer:uid}).then(onOrderComplete);
	  $http.post("http://iligtas.ph/smartDelivery/smartd/__getOndelivery.php",{customer:uid}).then(onDeliverComplete);	  
	};

	$http.post("http://iligtas.ph/smartDelivery/smartd/__getPending.php",{customer:uid}).then(onRequestComplete);
	$scope.orders = $localDb.getReceiveOrders();

	$scope.doRefresh = function() {
	  	$http.post("http://iligtas.ph/smartDelivery/smartd/__getPending.php",{customer:uid}).then(onRequestComplete).finally(function() {
	       // Stop the ion-refresher from spinning
	       $scope.$broadcast('scroll.refreshComplete');
	     });
	  };
}]);