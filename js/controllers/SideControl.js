app.controller('SideCtrl',['$scope', '$rootScope','$ionicSideMenuDelegate', function($scope,$rootScope,$ionicSideMenuDelegate){
	$rootScope.toggleRight = function() {
    	$ionicSideMenuDelegate.toggleRight();
  	};
  	$rootScope.disableSide = function(){
  		$ionicSideMenuDelegate.canDragContent(false);
  	}
  	$rootScope.enableSide = function(){
  		$ionicSideMenuDelegate.canDragContent(true);
  	}
}]);