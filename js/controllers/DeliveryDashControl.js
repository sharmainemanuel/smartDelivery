app.controller('DeliveryDashCtrl',['$scope', '$rootScope','$ionicLoading','$http','$localDb','$timeout','$ionicModal',function($scope,$rootScope,$ionicLoading,$http,$localDb,$timeout,$ionicModal){
	var storage = JSON.parse(localStorage.getItem("userlog"));
	$scope.haha = null;
	var onRequestSuccess = function(response){
		console.log(response.data);
		$scope.dispatch = response.data;
	}
	var onDeliverSuccess = function(responses){
			//console.log(responses.data);
			$scope.haha = responses.data;
			console.log($scope.haha);
		}
	$http.post("http://iligtas.ph/smartDelivery/smartd/__getdispatch.php",{deliveryman:storage[0].deliveryid}).then(onRequestSuccess);

	$ionicModal.fromTemplateUrl('templates/modals/view-orders.html', {
	    scope: $scope,
	    animation: 'slide-in-up',
	    backdropClickToClose: true
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });

	  $scope.openModal = function(title,dop,customer) {
	    $scope.myTitle = title;
	    $scope.modal.show();
	    $http.post("http://iligtas.ph/smartDelivery/smartd/__getordersingle.php",{deliveryman:storage[0].deliveryid,dpurchase:dop,customer:customer}).then(onDeliverSuccess);
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

	  $scope.doRefresh = function() {
	  	$http.post("http://iligtas.ph/smartDelivery/smartd/__getdispatch.php",{deliveryman:storage[0].deliveryid}).then(onRequestSuccess).finally(function() {
	       // Stop the ion-refresher from spinning
	       $scope.$broadcast('scroll.refreshComplete');
	     });
	  };
}]);