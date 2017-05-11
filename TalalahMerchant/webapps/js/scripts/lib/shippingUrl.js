/**
 * 
 */
define(['/TalalahMerchant/js/scripts/lib/prototypeUrl.js'],function(PrototypeUrl){
	
	/* shipping module */
	
	var $Address = function(){
		var that = new PrototypeUrl('/address');
		return that;
	}
	var $District = function(){
		var that = new PrototypeUrl('/district');
		return that;
	}
	var $Shipping = function(){
		var that = new PrototypeUrl('/shipping');
		return that;
	}
	return {
		Address		:	new $Address(),
		District	:	new $District(),
		Shipping	:	new $Shipping()
	}
});