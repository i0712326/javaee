/**
 * 
 */
define(['/TalalahMerchant/js/scripts/lib/prototypeUrl.js'], function(PrototypeUrl){
	/* order module */
	
	var $Order = function(){
		var that = new PrototypeUrl('/order');
		return that;
	}
	var $Payment = function(){
		var that = new PrototypeUrl('/payment');
		return that;
	}
	var $OrderProduct = function(){
		var that = new PrototypeUrl('/orderProduct');
		that.OrderItem = new PrototypeUrl('/orderProduct/item');
		that.OrderTravel = new PrototypeUrl('/orderProduct/travel');
		return that;
	}
	
	return{
		Order			:	new $Order(),
		Payment			:	new $Payment(),
		OrderProduct	:	new $OrderProduct()
	};
});