/**
 * 
 */
define(['/TalalahMerchant/js/scripts/lib/prototypeUrl.js'], function(PrototypeUrl){
	
	/* travel module*/
	
	var $Travel = function(){
		var that = new PrototypeUrl('/travel');
		return that;
	}
	var $Destination = function(){
		var that = new PrototypeUrl('/destination');
		return that;
	}
	var $ActivityCategory = function(){
		var that = new PrototypeUrl('/activityPrototype');
		return that;
	}
	var $Activity = function(){
		var that = new PrototypeUrl('/activity');
		return that;
	}
	
	return {
		Travel				:	new $Travel(),
		Destination			:	new $Destination(),
		ActivityCategory	:	new $ActivityCategory(),
		Activity			:	new $Activity()
	};
	
});