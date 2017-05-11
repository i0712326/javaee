/**
 * 
 */
define(['/Talalah/js/scripts/lib/prototypeUrl.js'],function(PrototypeUrl){
	
	/* product module */
	
	var $Product = function(){
		var that = new PrototypeUrl('/product');
		return that;
	}
	var $ProductCategory = function(){
		var that = new PrototypeUrl('/productCategory');
		return that;
	}
	var $ProductImg	= function(){
		var that = new PrototypeUrl('/productImg');
		return that;
	}
	
	return {
		Product				:	new $Product(),
		ProductCategory		:	new $ProductCategory(),
		ProductImg			:	new $ProductImg()
	};
});