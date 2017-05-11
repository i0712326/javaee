/**
 * 
 */
define(['/Talalah/js/scripts/lib/prototypeUrl.js'],function(PrototypeUrl){
	/* merchant module */
	var $Merchant = function(){
		var that = new PrototypeUrl('/merchant');
		return that;
	}
	var $MerchantCatGrp = function(){
		var that = new PrototypeUrl('/merchantCatGrp');
		return that;
	}
	var $MerchantCode = function(){
		var that = new PrototypeUrl('/merchantCode');
		return that;
	}
	var $TransCodeCat = function(){
		var that = new PrototypeUrl('/transCodeCat');
		return that;
	}
	
	return {
		Merchant		:	new $Merchant(),
		MerchantCode	:	new $MerchantCode(),
		MerchantCatGrp	:	new $MerchantCatGrp(),
		TransCodeCat	:	new $TransCodeCat()
	}
	
});
