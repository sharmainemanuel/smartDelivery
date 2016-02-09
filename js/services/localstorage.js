angular.module("MyStorage",[])
    .factory("$localDb",function(){
	var userGetItem = function(){
		var strge = JSON.parse(localStorage.getItem("userlog")) || [];
		return strge;
	}
	var cartGetItem = function(){
		var cart = JSON.parse(localStorage.getItem("mycart")) || [];
		return cart;
	}
	var getUserId = function(){
		var strge = JSON.parse(localStorage.getItem("userlog")) || [];
		return strge[0].userid;
	}
	var getUserZip = function(){
		var strge = JSON.parse(localStorage.getItem("userlog")) || [];
		return strge[0].zip;
	}
	var getReceiveOrders = function(){
		var order = JSON.parse(localStorage.getItem("successOrders")) || [];
		return order;
	}
	var setReceiveOrders = function(item){
		localStorage.setItem("successOrders",JSON.stringify(item));
	}
	var userSetItem = function(item){
		var store = userGetItem();
		store.push(item);
		localStorage.setItem("userlog",JSON.stringify(store));
	}
	var userUpdateItem = function(item){
		var strage = [];
		strage.push(item);
		localStorage.setItem("userlog",JSON.stringify(strage));
	}
	var cartSetItem = function(item){
		var store = cartGetItem();
		store.push(item);
		localStorage.setItem("mycart",JSON.stringify(store));
	}
	var userDeleteItem = function(id){
		var json = userGetItem();
		for (i=0;i<json.length;i++){
			if (json[i].idno == id){
				json.splice(i,1);
			}
		}
		localStorage.setItem("userlog",JSON.stringify(json));
	}
	var cartDeleteItem = function(id){
		var json = cartGetItem();
		for (i=0;i<json.length;i++){
			if (json[i].productid == id){
				json.splice(i,1);
			}
		}
		localStorage.setItem("mycart",JSON.stringify(json));
	}

	var userGetSelected = function(id){
		var json = userGetItem();
		for (i=0;i<json.length;i++){
			if (json[i].idno == id){
				return json[i];
			}
		}
		return;
	}

	var cartGetSelected = function(id){
		var json = cartGetItem();
		for (i=0;i<json.length;i++){
			if (json[i].productid == id){
				return json[i];
			}
		}
		return;
	}

	var cartCheckExist = function(id){
		var json = cartGetItem();
		for (i=0;i<json.length;i++){
			if (json[i].productid == id){
				return true
			}
		}
		return false;
	}


	var userEdits = function(item){
		var json = userGetItem();
		for (i=0;i<json.length;i++){
			if (json[i].idno == item.idno){
				json[i].firstname = item.firstname;
				json[i].lastname = item.lastname;
				json[i].middlename = item.middlename;
			}
		}
		localStorage.setItem("userlog",JSON.stringify(json));
	}

	var cartEdits = function(item){
		var json = cartGetItem();
		for (i=0;i<json.length;i++){
			if (json[i].productid == item.productid){
				json[i].qty = item.qty;
				json[i].total = item.total;
			}
		}
		localStorage.setItem("mycart",JSON.stringify(json));
	}

	var cartTotal = function(){
		var json = cartGetItem();
		var total = 0;
		for (i=0;i<json.length;i++){
			total += json[i].qty;
		}
		return total;
	}

	var cartTotalAmount = function(){
		var json = cartGetItem();
		var totalAmount = 0;
		for (i=0;i<json.length;i++){
			totalAmount += json[i].total;
		}
		return totalAmount;
	}

	return {
		userSetItem : userSetItem,
		userGetItem : userGetItem,
		userDeleteItem : userDeleteItem,
		userGetSelected : userGetSelected,
		userEdits : userEdits,
		getUserId : getUserId,
		getUserZip : getUserZip,
		cartSetItem : cartSetItem,
		cartGetItem : cartGetItem,
		cartDeleteItem : cartDeleteItem,
		cartGetSelected : cartGetSelected,
		cartEdits : cartEdits,
		cartCheckExist: cartCheckExist,
		cartTotal: cartTotal,
		cartTotalAmount: cartTotalAmount,
		getReceiveOrders : getReceiveOrders,
		setReceiveOrders : setReceiveOrders,
		userUpdateItem : userUpdateItem
	};
});