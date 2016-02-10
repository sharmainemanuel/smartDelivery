app.controller('DeliveryAccountCtrl',['$scope', '$rootScope','$ionicModal','$http','$localDb','$ionicHistory' , function($scope,$rootScope,$ionicModal,$http,$localDb,$ionicHistory){
	if(JSON.parse(localStorage.getItem("userlog"))[0].deliverystatus==0){
		$scope.statuses = false;
	}
	else{
		$scope.statuses = true;	
	}
	var onRequestComplete = function(response){
		var storage = JSON.parse(localStorage.getItem("userlog"));
		console.log(storage[0].deliverystatus);
		storage[0].deliverystatus = $scope.statuses;
		localStorage.setItem("userlog",JSON.stringify(storage));
	}
	$scope.updateStatus = function(){
		if($scope.statuses==0){
			$scope.statuses=1;
		}
		else{
			$scope.statuses=0;
		}
		var dm = JSON.parse(localStorage.getItem("userlog"))[0].deliveryid;
		$http.post("http://iligtas.ph/smartDelivery/smartd/__updatestatus.php",{stats:$scope.statuses,deliveryman:dm}).then(onRequestComplete);	
	};

	$scope.logOut = function(){
	  	$ionicHistory.clearHistory();
	    console.log('Cleared History');
	            
	    //REMOVE BACK BUTTON ON THE REDIRECT PAGE
	    $ionicHistory.nextViewOptions({
	      disableBack: true
	    });
	    console.log('Cleared Back button');
	      
	    //REMOVE LOCALSTORAGE DETAILS
	    localStorage.removeItem('userlog');
	    localStorage.removeItem('deliveredItem');
	      
	    //GO TO (CONFIG OTHERWISE) THE DEFAULT PAGE
	    location.href = "#/login";
	  }
}]);