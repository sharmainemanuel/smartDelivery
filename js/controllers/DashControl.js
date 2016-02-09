app.controller('DashCtrl',['$scope', '$rootScope','$ionicLoading','$http','$localDb','$timeout','$ionicModal',function($scope,$rootScope,$ionicLoading,$http,$localDb,$timeout,$ionicModal){
	/*$ionicLoading.show({
	    template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'

	});
    $scope.hideLoad = function(){
	   	$ionicLoading.hide();
	};*/
	var onSuc = function(responsess){
		console.log(responsess);
	};
	$scope.acceptDeliver = function(dop){
		var storage = JSON.parse(localStorage.getItem("userlog"));
		$http.post("http://localhost/smartd/__acceptorders.php",{pdate:dop,customer:storage[0].userid}).then(onSuc);
		$scope.closeModal();
	}
	var onDeliverSuccess = function(responses){
		//console.log(responses.data);
		console.log(responses);
		$scope.customerorder = responses.data;
		console.log($scope.customerorder);
	}
	$ionicModal.fromTemplateUrl('templates/modals/view-orderscustomer.html', {
	    scope: $scope,
	    animation: 'slide-in-up',
	    backdropClickToClose: true
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });

	  $scope.openModal = function(title,dop,customer) {
	  	var storage = JSON.parse(localStorage.getItem("userlog"));
	    $scope.myTitle = title;
	    $scope.modal.show();
	    $http.post("http://localhost/smartd/__getordercustomer.php",{dpurchase:dop,customer:storage[0].userid}).then(onDeliverSuccess);
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

	var uid = $localDb.getUserId();
	var onRequestComplete = function(response){
	  console.log(response.data);
	  $scope.pending = response.data;
	};

	$http.post("http://localhost/smartd/__getPending.php",{customer:uid}).then(onRequestComplete);
	$scope.orders = $localDb.getReceiveOrders();

	$scope.doRefresh = function() {
	  	$http.post("http://localhost/smartd/__getPending.php",{customer:uid}).then(onRequestComplete).finally(function() {
	       // Stop the ion-refresher from spinning
	       $scope.$broadcast('scroll.refreshComplete');
	     });
	  };
}]);