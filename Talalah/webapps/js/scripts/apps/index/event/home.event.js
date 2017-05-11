/**
 * 
 */
define(function(require,exports,module){
	var Model = require('model');
	var init  = require('init');
	
	var talalah = init.init();
	
	var HomeEvent = function(){
		this.loadMoreTravel = function(count, that, ProductViews){
			that.$el.find('#tvlLoader').show();
			that.$el.find('#travelBtn').hide();
			var travelProducts = new Model.Products();
			travelProducts.url = talalah.com.client.app.entity.product.travel.travel.get+"?first="+count+"&max=4";
			travelProducts.fetch({
				success:function(items, response, options){
					setTimeout(function(){
						if(items.length>0){
							var travelViews = new ProductViews({collection:items});
							that.$el.find('#travel-product').append(travelViews.render());
						}
						that.$el.find('#tvlLoader').hide();
						that.$el.find('#travelBtn').show();
					},3000);
					
				}
			});
		}
		this.loadMoreItem = function(count, that, ProductViews){
			that.$el.find('#iteLoader').show();
			that.$el.find('#itemBtn').hide();
			var itemProducts = new Model.Products();
			itemProducts.url = talalah.com.client.app.entity.product.item.item.get+"?first="+count+"&max=4";
			itemProducts.fetch({
				success:function(items, response, options){
					setTimeout(function(){
						if(items.length>0){
							var itemViews = new ProductViews({collection:items});
							that.$el.find('#item-product').append(itemViews.render());
						}
						that.$el.find('#iteLoader').hide();
						that.$el.find('#itemBtn').show();
						
					},3000);
					
				}
			});
		}
		
	}
	
	return new HomeEvent();
});