/**
 * 
 */
define(function(require,exports,module){
	var Model 	= require('model');
	var View	= require('customerView');
	var init	= require('init');
	var PrdView	= require('productView');
	
	var talalah = init.init();
	var max		= talalah.com.client.app.page.max;
	var CustomerPage = function(id){
		var id = id;
		this.render = function(){
			var customer	 = new Model.User({'id':id});
			var customerView = new View.CustomerView({model:customer});
			var $view = customerView.render();
			customer.fetch({
				success:function(item,resp,opt){
					customerView.model = item;
					var products = new Model.Products();
					products.url = talalah.com.client.app.entity.product.product.get+"?rate=1&first=0&max="+max;
					products.fetch({
						success : function(items,resp,opt){
							var productViews = new PrdView.ProductViews({collection:items});
							$view.find('#cart-products').append(productViews.render());
						}
					});
				}
			});
			
			return $view;
		}
	}
	
	var endPoing = {
			showCustomerPage : function(id){
				var customerPage = new CustomerPage(id);
				return customerPage.render();
			}
	}
	
	return endPoing;
});