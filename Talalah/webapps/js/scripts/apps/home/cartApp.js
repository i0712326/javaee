/**
 * 
 */
define(function(require,exports,module){
	
	var $ 			= require('jquery');
	var _ 			= require('underscore');
	var Backbone 	= require('backbone');
	var Model		= require('model');
	var init		= require('init');
	
	var talalah = init.init();
	
	var PersistCartProduct = function(){
			
		this.persistItem = function(id, cartProduct){
			var cartItem = new Model.CartItem();
			cartItem.urlRoot = talalah.com.client.app.entity.customer.cartItem.save;
			cartItem.save(cartProduct,{
				success:function(item, resp, opt){
					var customer = new Model.Customer({id:id});
					customer.fetch({
						success:function(item, resp, opt){
							var data = item.toJSON();
							var total = data.cart.total;
							var sum = data.cart.sum;
							$('#shopCartItems').text(total);
							$('#cart-total').text(total);
							$('#cart-sum').text(sum);
						}
					});
				}
			});
			
		}
		
		this.persistTravel = function(id, cartProduct){
			var cartTravel = new Model.CartTravel();
			cartTravel.urlRoot = talalah.com.client.app.entity.customer.cartTravel.save;
			cartTravel.save(cartProduct,{
				success : function(item, resp, opt){
					var customer = new Model.Customer({id:id});
					customer.fetch({
						success:function(item, resp, opt){
							var data = item.toJSON();
							var total = data.cart.total;
							var sum = data.cart.sum;
							
							$('#shopCartItems').text(total);
							$('#cart-total').text(total);
							$('#cart-sum').text(sum);
						}
					});
				}
			});
		}
	}
	
	var InitCart = function(custId, cart, cartProducts){
		var id = custId;
		this.persistCart = function(){
			var customer = new Model.Customer({id:id}); 
			customer.fetch({
				success:function(item,resp,opt){
					var custCart = item.toJSON().cart;
					var address = item.toJSON().address;
					var total = cart.total;
					var persistCartProduct = new PersistCartProduct();
					if(total>0){
						for(var i=0;i<total;i++){
							var cartProduct = cartProducts[i];
							cartProduct.cart = custCart;
							
							delete cartProduct.id;
							var product = cartProduct.product;
							var merchant = product.merchant;
							var merchantCode = merchant.merchantCode;
							var mcc = merchantCode.mcc;
							if(mcc==='4722'){
								persistCartProduct.persistTravel(id, cartProduct);
							}
							else{
								cartProduct.shipping.address = address;
								persistCartProduct.persistItem(id, cartProduct);
							}
						}
					}
					else{
						var customer = new Model.Customer({id:id});
						customer.fetch({
							success:function(item, resp, opt){
								var data = item.toJSON();
								var total = data.cart.total;
								$('#shopCartItems').text(total);
							}
						});
					}
				}
			});
		}
		
	}
	
	return {
		addCart:function(custId,cart,cartProducts){
			var initCart = new InitCart(custId,cart,cartProducts);
			initCart.persistCart();
		}
	};
	
	
});