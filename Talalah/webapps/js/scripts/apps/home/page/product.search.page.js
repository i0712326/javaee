/**
 * 
 */
define(function(require,exports,module){
	
	var Model 	= 	require('model');
	var View  	= 	require('productView');
	var init	=	require('init');
	
	var talalah = 	init.init();
	var max		= talalah.com.client.app.page.max;
	var ProductSearchPage = function(key){
		this.key = key;
		this.render = function(){
			
			var keyWord = new Model.KeyWord({key:key});
			var productSearchView = new View.ProductSearchView({model:keyWord});
			
			var $ele = productSearchView.render();
			
			var products = new Model.Products();
			products.url = talalah.com.client.app.entity.product.product.get+"/key?key="+key+"%25&first=0&max="+max;
			products.fetch({
				success : function(items, resp, opt){
					if(items.length>0){
						var productViews = new View.ProductViews({collection:items});
						$ele.find('#products').append(productViews.render());
					}
					else{
						$ele.find('.alert').show();
						$ele.find('#loadmore').hide();
					}
				}
			});
			
			return $ele;
			
		}
	}
	
	var endPoint = {
		showSearchProduct : function(key){
			var productSearchPage = new ProductSearchPage(key);
			return productSearchPage.render();
		}
	}
	
	return endPoint;
	
});