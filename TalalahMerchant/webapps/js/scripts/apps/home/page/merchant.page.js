/**
 * 
 */
define(function(require,exports,module){
	
	var Model 	= require('model');
	var View	= require('merchantView');
	var HView	= require('homeView');
	var init	= require('init');
	
	var talalah = init.init();
	var max = talalah.com.client.app.page.max;
	
	var MerchantPage = function(mcId){
		var mcId = mcId;
		this.render = function(){
			var $view = $('<div></div>');
			var merchant = new Model.Merchant({id:mcId});
			merchant.fetch({
				success:function(item, response, options){
					var data = item.toJSON();
					var merchantView = new View.MerchantView({model:item});
					$view.append(merchantView.render());
					var products = new Model.Products();
					products.url = talalah.com.client.app.entity.product.product.get+"/mc/"+data.mcId+"?first=0&max="+max+"&review=1";
					products.fetch({
						success:function(items, response, options){
							var productViews = new HView.ProductViews({collection:items});
							$view.find('#product-list').append(productViews.render());
						}
					});
				}
			});
			return $view;
		}
	}
	
	var endPoint = {
			showMerchantPage : function(mcId){
				var merchantPage = new MerchantPage(mcId);
				return merchantPage.render();
			}
	}
	
	return endPoint;
});