/**
 * 
 */
define(function(require,exports,module){
	
	var $ = require('jquery');
	var Model = require('model');
	var View = require('cart.view');
	
	var CartPage = function(){
		
		this.render = function(){
			var appStorage = window.sessionStorage;
			var cart = JSON.parse(appStorage.getItem('cart'));
			var cartProducts = JSON.parse(appStorage.getItem('cartProducts'));
			
			var total = cart.total;
			var sum = cart.sum;
			
			var products = new Model.Products();
			var cartModel = new Model.Cart(cart);
			var cartView = new View.CartView({model:cartModel});
			var $ele = cartView.render();
			
			if(total>0){
				var sum = 0;
				for(var i=0;i<total;i++){
					var data = cartProducts[i];
					products.add(new Model.Product(data));
					sum += data.price;
				}
				var cartProductViews = new View.CartProductViews({collection:products});
				$ele.find('#cartProductDataGrid').append(cartProductViews.render());
			}
			else{
				$ele.find('#empty-info').show();
			}
			
			$ele.find('.badge').text(total);
			$ele.find('#loader00').hide();
			
			return $ele;
		}
	}
	
	var endPoint = {
			showCart : function(){
				var cartPage = new CartPage();
				return cartPage.render();
			}
	};
	
	return endPoint;
	
	
});