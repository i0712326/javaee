/**
 * 
 */
define(function(require,exports,module){
	
	var $ 		= require('jquery');
	var Model 	= require('model');
	var init	= require('init');
	var View 	= require('travel.view');
	
	var talalah = init.init();
	
	var TravelPage = function(){
		this.render = function(){
			var user		   = new Model.User();
			var products	   = new Model.Products();
			var destinations   = new Model.Destinations();
			
			var travelPageView  = new View.TravelPageView({model:user});
			var $view = travelPageView.render();
			destinations.url = talalah.com.client.app.entity.product.travel.destination.get+"?first=0&max=3";
			destinations.fetch({
				success:function(items, response, options){
					 var dests = items.models;
					 var ind = 0;
					 $.each(dests,function(index, dest){
						 var name = dest.toJSON().name;
						 var id = dest.toJSON().id;
						 var travelByDestinations = new Model.Products();
						 travelByDestinations.url = talalah.com.client.app.entity.product.travel.travel.get+"/destination?name="+name+"&first=0&max=1";
						 travelByDestinations.fetch({
							 success:function(items, response, options){
								 var travelMainViews = new View.TravelMainViews({collection:items});
								 $view.find('#product-list').append(travelMainViews.render(id,index));
								
							 }
						 });
					 });
				}
			});
			
			return $view;
			
		}
	}
	
	var endPoint = {
			showTravelPage : function(){
				var travelPage = new TravelPage();
				return travelPage.render();
			}
	}
	
	return endPoint;
})