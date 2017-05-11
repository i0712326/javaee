/**
 * 
 */
define(['/Talalah/js/scripts/lib/prototypeUrl.js'], function(PrototypeUrl){
	/* customer module */
	
	var $Customer = function(){
		var that = new PrototypeUrl('/customer');
		return that;
	}
	var $Comment = function(){
		var that = new PrototypeUrl('/comment');
		return that;
	}
	var $CartProduct = function(){
		var that = new PrototypeUrl('/cartProduct');
		that.CartItem = new PrototypeUrl('/cartProduct/item');
		that.CartTravel = new PrototypeUrl('/cartProduct/travel');
		return that;
	}
	
	var $Cart = function(){
		var that = new PrototypeUrl('/cart');
		return that;
	}
	
	
	return{
		Customer	:	new $Customer(),
		Comment		:	new $Comment(),
		CartProduct	:	new $CartProduct(),
		Car			:	new $Cart()
	}
	
});