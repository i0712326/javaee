/**
 * 
 */
define(function(require,exports,modules){
	var View 	= require('home.view');
	var Model 	= require('model');
	var init	= require('init');
	var talalah = init.init();
	var max = talalah.com.client.app.page.max;
	
	var MerchantHomePage = function(mcId){
		var id = mcId;
		
		this.render = function(){
			var merchant = new Model.Merchant({id:id});
			var merchantHomeView = new View.MerchantHomeView({model:merchant}); 
			var $ele = $('<div></div>')
			merchant.urlRoot = talalah.com.client.app.entity.merchant.merchant.get;
			merchant.fetch({
				success : function(item,resp,opts){
					merchantHomeView.model = item;
					$ele.append(merchantHomeView.render());
					var products = new Model.Products();
					products.url = talalah.com.client.app.entity.product.product.get+"/mc/"+id+"?first=0&max="+max;
					products.fetch({
						success : function(items, resp, opts){
							if(items.length>0){
								var productViews = new View.ProductViews({collection:items});
								$ele.find('#products').append(productViews.render());
							}
							else{
								$ele.find('#product0').show();
							}
						}
					});
				}
			});
			
			return $ele;
		}
	}
	
	var accessPoint = {
			showMerchantHome: function(id){
				var merchantHomePage = new MerchantHomePage(id);
				return merchantHomePage.render();
			}
	}
	
	return accessPoint;
	
});