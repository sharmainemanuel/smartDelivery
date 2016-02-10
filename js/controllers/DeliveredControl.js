app.controller('DeliveredCtrl',['$rootScope', '$scope','$ionicModal','$http','$localDb','$ionicPopup','$ionicHistory', function($rootScope,$scope,$ionicModal,$http,$localDb,$ionicPopup,$ionicHistory){
	$rootScope.delivered = JSON.parse(localStorage.getItem("deliveredItem"));

	$scope.doRefresh = function() {
		var onRequestSuccess = function(responses){
			console.log(responses.data);
			var storage = [];
			storage.push(JSON.stringify(responses.data));
			localStorage.setItem("deliveredItem",storage);
			$rootScope.delivered = JSON.parse(localStorage.getItem("deliveredItem"));
			var cstmer = $localDb.getUserId();			
			$http.post("http://iligtas.ph/smartDelivery/smartd/__getorders.php",{customer:cstmer}).then(onOrderComplete);
		}
		var storages = JSON.parse(localStorage.getItem("userlog"));
	  	$http.post("http://iligtas.ph/smartDelivery/smartd/__getdelivered.php",{deliveryman:storages[0].deliveryid}).then(onRequestSuccess).finally(function() {
	       // Stop the ion-refresher from spinning
	       $scope.$broadcast('scroll.refreshComplete');
	     });
	  };
}]);