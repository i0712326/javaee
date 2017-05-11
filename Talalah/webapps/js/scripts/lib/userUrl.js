/**
 * 
 */
define(['/Talalah/js/scripts/lib/prototypeUrl.js'], function(PrototypeUrl){
	
	var $User = function(){
		var that = new PrototypeUrl('/user');
		return that;
	}
	
	var $Role = function(){
		var that = new PrototypeUrl('/role');
		return that;
	}
	
	var $Rate = function(){
		var that = new PrototypeUrl('/rate');
		return that;
	}
	
	var $Message = function(){
		var that = new PrototypeUrl('/message');
		that.Received = new PrototypeUrl('/message/received');
		that.Sent = new PrototypeUrl('/message/sent');
		return that;
	}
	
	return {
		User 	: new $User(),
		Role 	: new $Role(),
		Rate 	: new $Rate(),
		Message : new $Message()
	}
});