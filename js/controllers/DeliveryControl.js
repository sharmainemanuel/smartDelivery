app.controller('DeliveryCtrl',['$rootScope', '$scope','$ionicModal','$http','$localDb','$ionicPopup','$ionicHistory', function($rootScope,$scope,$ionicModal,$http,$localDb,$ionicPopup,$ionicHistory){
	$scope.prov = "Select Province";
	$http.get('js/external/province.json').success(function(response) {
        $scope.province = response;
    });
    $scope.payment = {paypal:"cod"};
    $scope.getData = function(name){
    	$scope.prov = name;
    	$scope.modal.hide();
    }
    $scope.confirmDelivery = function(){
    	$scope.showConfirm();
    };
	$ionicModal.fromTemplateUrl('templates/modals/select-input.html', {
	    scope: $scope,
	    animation: 'slide-in-up',
	    backdropClickToClose: true
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });

	  $scope.openModalSelect = function() {
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


	  // An alert dialog
	 $scope.showAlert = function(message) {
	   var alertPopup = $ionicPopup.alert({
	     title: 'Order Success',
	     template: 'Order has been sent!'
	   });

	   alertPopup.then(function(res) {
	   	$ionicHistory.clearHistory();
	   	$ionicHistory.clearCache();
	   	localStorage.removeItem("mycart");
	   	$rootScope.updateCarts();
	   	location.href = "#/tab/dash";
	   });
	 };

	  $scope.showConfirm = function() {
	   var confirmPopup = $ionicPopup.confirm({
	     title: 'Send Order',
	     template: 'Are you sure you want to send this order?'
	   });

	   confirmPopup.then(function(res) {
	     if(res) {
	     	var onDeliverComplete = function(response){
				console.log(response.data);
			}
	       var mycart = $localDb.cartGetItem();
	    	var mydta = $localDb.userGetItem();
	    	var myaddress = $scope.payment.house + " " + $scope.payment.street + " " + mydta[0].city + ", " + mydta[0].zip;
	    	$http.post("http://localhost/smartd/__order.php",{items:mycart,address:myaddress,customer:mydta[0].userid,city:mydta[0].city,merchant:mydta[0].merchantid}).then(onDeliverComplete);
	       $scope.showAlert();
	     } else {
	       console.log('You are not sure');
	     }
	   });
	 };
}]);