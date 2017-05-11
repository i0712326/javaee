/**
 * 
 */
define(function(){
	
	/* root service url */
	
	var init = function(url){
		
		var rootUrl ='http://localhost:8080/ServiceEngine/service'+url;
		
		this.save 	= rootUrl + '/save';
		this.get 	= rootUrl + '/get';
		this.update = rootUrl + '/update';
		this.remove	= rootUrl + '/delete';
	}
	
	return init;
	
});