app.controller('AccountCtrl',['$scope', '$rootScope','$ionicModal','$http','$localDb','$ionicHistory' , function($scope,$rootScope,$ionicModal,$http,$localDb,$ionicHistory){
	$ionicModal.fromTemplateUrl('templates/modals/select-merchant.html', {
	    scope: $scope,
	    animation: 'slide-in-up',
	    backdropClickToClose: true
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });
	  $rootScope.updateUser();
	  $scope.openModal = function() {
	    $scope.myTitle = "Select Merchant";
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

	  var onUserCompleteUser = function(response){
		console.log(response.data);
		$scope.listMerchant = response.data;
	 }

	  var myzip = $localDb.getUserZip();
	  $http.post("http://localhost/smartd/__getmerchant.php",{zipcode:myzip}).then(onUserCompleteUser);

	  $scope.setMerchant = function(id){
	  	var onChangeComplete = function(response){
		 	console.log(response.data);
		 	$scope.closeModal();
		 	$ionicHistory.clearHistory();
		 	$ionicHistory.clearCache();
		 	localStorage.removeItem("mycart");
		 	$localDb.userUpdateItem(response.data);
		 	$rootScope.updateUser();
		 	$rootScope.updateCarts();
		 }
	  	var cstomer = $localDb.userGetItem();
	  	$http.post("http://localhost/smartd/__changemerchant.php",{userid:cstomer[0].userid,mid:id}).then(onChangeComplete);
	  }
	  $scope.logOut = function(){
	  	$ionicHistory.clearHistory();
	    console.log('Cleared History');
	            
	    //REMOVE BACK BUTTON ON THE REDIRECT PAGE
	    $ionicHistory.nextViewOptions({
	      disableBack: true
	    });
	    console.log('Cleared Back button');
	      
	    //REMOVE LOCALSTORAGE DETAILS
	    localStorage.removeItem('userlog');
	    localStorage.removeItem('successOrders');
	    localStorage.removeItem('mycart');
	      
	    //GO TO (CONFIG OTHERWISE) THE DEFAULT PAGE
	    location.href = "#/login";
	  }
}]);