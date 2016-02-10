app.controller('ProfileCtrl',['$scope', '$rootScope', function($scope,$rootScope){
	var info = JSON.parse(localStorage.getItem("userlog"));
	$scope.username = info[0].first + " " + info[0].last;
	$scope.myAddress = info[0].state + ", " + info[0].city + ", " + info[0].zip; 
}]);