app.controller('ListCtrl',['$scope', '$rootScope','$stateParams','$http','$localDb', function($scope,$rootScope,$stateParams,$http,$localDb){
	var uid = $stateParams.category;
	var mid = $localDb.userGetItem();
	$scope.searchshow = false;
	$scope.toggleShow = function(){
		if($scope.searchshow==false){
			$scope.searchshow = true;
		}else{
			$scope.searchshow = false;
		}
	};
	$scope.product_title = uid;
	var onRequestComplete = function(response){
	  console.log(response.data);
	  $scope.products = response.data;
	};
	var onRequestFailed = function(error){
		console.log("Error.");
	};
	$http.post("http://localhost/smartd/__getproducts.php",{category:uid,merchant:mid[0].merchantid}).then(onRequestComplete);
}]);
