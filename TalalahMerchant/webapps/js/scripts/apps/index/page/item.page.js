/**
 * 
 */
define(function(require,exports,module){
	

	var $ 		= require('jquery');
	var Model 	= require('model');
	var init	= require('init');
	var View 	= require('item.view');
	
	var talalah = init.init();
	
	var ItemPage = function(){
		this.render = function(){
			var user		   = new Model.User();
			var products	   = new Model.Products();
			
			var itemPageView	= new View.ItemPageView({model:user});
			var $view = itemPageView.render();
			
			products.url = talalah.com.client.app.entity.product.item.item.get+"?first=0&max=3";
			products.fetch({
				success:function(items, response, options){
					var itemMainViews = new View.ItemMainViews({collection:items});
					$view.find('#product-list').append(itemMainViews.render());
				}
			});
			return $view;
		}
	}
	
	var endPoint = {
			showItemPage : function(){
				var itemPage = new ItemPage();
				return itemPage.render();
			}
	}
	
	return endPoint;
});