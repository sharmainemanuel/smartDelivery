app.controller('LocationCtrl',['$scope', '$rootScope','$ionicModal','$http','$localDb','$ionicHistory', function($scope,$rootScope,$ionicModal,$http,$localDb,$ionicHistory){
	$scope.location = {province:"Select Province",city:"Select City",zippy:"",customerid:""};
	$http.get('js/external/province.json').then(function(response) {
        $scope.provinces = response.data;
        $http.get('js/external/city.json').then(function(response) {
	        $scope.city = response.data;
	    });
    });

	$ionicModal.fromTemplateUrl('templates/modals/select-location.html', {
	    scope: $scope,
	    animation: 'slide-in-up',
	    backdropClickToClose: true
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });

	  $ionicModal.fromTemplateUrl('templates/modals/select-city.html', {
	    scope: $scope,
	    animation: 'slide-in-up',
	    backdropClickToClose: true
	  }).then(function(modal) {
	    $scope.modal2 = modal;
	  });

	  $scope.openModal = function(title) {
	    $scope.myTitle = title;
	    $scope.modal.show();
	  };
	  $scope.openModalTwo = function(title) {
	  	if($scope.location.province != "Select Province"){
	  		$scope.myTitle = title;
	    	$scope.modal2.show();
	  	}
	  };
	  $scope.closeModal = function() {
	    $scope.modal.hide();
	  };
	  $scope.closeModalTwo = function() {
	    $scope.modal2.hide();
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

	  $scope.setProvince = function(data){
	  	$scope.location.province = data;
	  	$scope.closeModal();

	  	angular.forEach($scope.city,function(value,key){
        	angular.forEach(value,function(val,k){
	        	if(k==$scope.location.province){
	        		$scope.ct = val;
	        		console.log("meron");
	        		return;
	        	}
	        });
        });
	  };
	  $scope.setCity = function(data,zip){
	  	$scope.location.city = data;
	  	$scope.location.zippy = zip;
	  	$scope.closeModalTwo();
	  }
	  var onChangeComplete = function(response){
	  	var temp = JSON.parse(localStorage.getItem("userlog"));
	  	var typ = temp[0].usertype;
	  	localStorage.removeItem("userlog");
	  	response.data.usertype = typ;
	  	$localDb.userSetItem(response.data);
	  	$ionicHistory.goBack();
	  };
	  $scope.setLocation = function(){
		if($scope.location.city != "Select City"){
			var item = JSON.parse(localStorage.getItem("userlog"));
			$scope.location.customerid = item[0].userid;
			console.log($scope.location);
			$http.post("http://localhost/smartd/__changelocation.php",$scope.location).then(onChangeComplete);	
		}  		
	  }
}]);