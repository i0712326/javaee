/**
 * 
 */
define(['/Talalah/js/scripts/lib/prototypeUrl.js'], function(PrototypeUrl){
/* item module */
	
	var $Item = function(){
		var that = new PrototypeUrl('/item');
		return that;
	}
	var $ItemShippingProvider = function(){
		var that = new PrototypeUrl('/itemShippingProvider');
		return that;
	}
	var $ShippingProvider = function(){
		var that = new PrototypeUrl('/shippingProvider');
		return that;
	}
	
	return {
		Item					:	new $Item(),
		ItemShippingProvider	:	new $ItemShippingProvider(),
		ShippingProvider		:	new $ShippingProvider()
	}
});