app.controller('ProvinceCtrl',['$scope', '$rootScope','$http', function($scope,$rootScope,$http){
	$http.get('external/province.json').success(function(response) {
        console.log(response);
    });
}])
.controller('SignupCtrl',['$scope', '$rootScope','$http','$ionicModal', function($scope,$rootScope,$http,$ionicModal){
	
}]);