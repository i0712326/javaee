/**
 * 
 */

define(function(require,exports,module){
	
	var Model 	= require('model');
	var View  	= require('product.view');
	var init	= require('init');
	var talalah	= init.init();
	var ProductMainPage = function(mcId){
		this.mcId = mcId;
		
		this.render = function(){
			var merchant		= new Model.Merchant({id:mcId})
			var productMainView = new View.ProductMainView({model:merchant});
			var $ele			= productMainView.render();
			var products = new Model.Products();
			products.url = talalah.com.client.app.entity.product.product.get+"/mc/"+mcId+"?first=0&max=8";
			products.fetch({
				success:function(items,resp,opt){
					var productViews = new View.ProductViews({collection:items});
					$ele.find('#products').append(productViews.render());
				}
			});
			
			return $ele;
		}
	}
	var endPoint = {
			showProducts : function(mcId){
				var productMainPage = new ProductMainPage(mcId);
				return productMainPage.render();
			}
	}
	return endPoint;
});