/**
 *  Check out javascript application
 */
define(['jquery', 'underscore','backbone','handlebars'], 
		function($, _, Backbone, Handlebars){
	
	var ApplicationRouter = Backbone.Router.extend({
		initialize:function(){
			
		},
		routes:{
			'ShipProduct':'shipProduct',
			'BillPay':'billPay'
		},
		shipProduct:function(){
			
		},
		billPay:function(){
			
		}
	});
	
	return {
		start:function(){
			var applicationRouter = new ApplicationRouter();
			Backbone.history.start();
		}
	};
});