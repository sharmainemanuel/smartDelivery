app.controller('ProductProfileCtrl',['$scope', '$rootScope','$stateParams','$http','$localDb','$ionicHistory', function($scope,$rootScope,$stateParams,$http,$localDb,$ionicHistory){
	var pid = $stateParams.productid;
	$scope.qty = 1;
	var min = 1;

	var onRequestComplete = function(response){
	 	console.log(response.data);
	 	$scope.productExist = $localDb.cartCheckExist(pid);
	 	console.log($scope.productExist);
		$scope.product = response.data;
	};

	if($localDb.cartCheckExist(pid)){
		$scope.productExist = $localDb.cartCheckExist(pid);
		console.log($scope.productExist);
		$scope.product = $localDb.cartGetSelected(pid);
		$scope.qty = $scope.product.qty;
		console.log($scope.product);
	}
	else{
		$http.post("http://localhost/smartd/__getproduct.php",{productid:pid}).then(onRequestComplete);
	}

	$scope.incrementQty = function(){
		$scope.qty++;
	}
	$scope.decrementQty = function(){
		if($scope.qty > 1 ){
 			$scope.qty--;
	 	}
	}
	$scope.addToCart = function(){
		$scope.product.qty = $scope.qty;
		$scope.product.total = $scope.qty * $scope.product.pprice;
	 	$localDb.cartSetItem($scope.product);
	 	console.log($scope.product);
	 	$rootScope.updateCarts();
	 	$ionicHistory.goBack();
	 	//$localDb.cartSetItem();
	}
	$scope.updateCart = function(){
		$scope.product.qty = $scope.qty;
		$scope.product.total = $scope.qty * $scope.product.pprice;
		$localDb.cartEdits($scope.product);
		$rootScope.updateCarts();
		$ionicHistory.goBack();
	}
}]);