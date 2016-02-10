app.controller('AppCtrl',['$scope', '$rootScope','$ionicSideMenuDelegate','$window','$localDb','$http', function($scope,$rootScope,$ionicSideMenuDelegate,$window,$localDb,$http){
  $scope.utype = "customer";
  $scope.setType = function(type){
    $scope.utype = type;
  }
  $rootScope.delivered = [];
	$scope.tabhide = "";
  $scope.tabCustomer = "";
  $scope.tabDelivery = "tabs-item-hide";
  $rootScope.updateUser = function(){
    $scope.myuser = $localDb.userGetItem();
  }
	$scope.checkout = function() {
    $ionicSideMenuDelegate.toggleRight();
  };
  $rootScope.forCustomer = function(){
  	$scope.tabCustomer = "tabs-item-hide";
  }
  $rootScope.forDelivery = function(){
    $scope.tabDelivery = "tabs-item-hide";
  }
  $rootScope.forCustomerHide = function(){
    $scope.tabCustomer = "";
  }
  $rootScope.forDeliveryHide = function(){
    $scope.tabDelivery = "";
  }
  $scope.cart = $localDb.cartGetItem();
  $scope.carttotal = $localDb.cartTotal();
  $scope.cartamount = $localDb.cartTotalAmount();
  $rootScope.updateCarts = function(){
  	$scope.cart = $localDb.cartGetItem();
  	$scope.carttotal = $localDb.cartTotal();
  	$scope.cartamount = $localDb.cartTotalAmount();
  }
  $scope.deleteItem = function(id){
  	$localDb.cartDeleteItem(id);
  	$rootScope.updateCarts();
  }
  $scope.updateItem = function(id){
    $rootScope.toggleRight();
    $window.location.href = "#/tab/list/product/profile/" + id;
  }
  /*$rootScope.updateDash = function(){
    var onOrderComplete = function(response){
      console.log(response.data);
      localStorage.setItem("successOrders",JSON.stringify(response.data)); 
      $rootScope.updateUser();
    }
    var cstmer = $localDb.getUserId();      
    $http.post("http://localhost/smartd/__getorders.php",{customer:cstmer}).then(onOrderComplete);
  }*/
}]);