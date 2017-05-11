/**
 * 
 */
define(function(require, exports, module){
	
	/* initiate global object */
	
	var user 		= require('/Talalah/js/scripts/lib/userUrl.js');
	var customer 	= require('/Talalah/js/scripts/lib/customerUrl.js');
	var item		= require('/Talalah/js/scripts/lib/itemProductUrl.js');
	var merchant 	= require('/Talalah/js/scripts/lib/merchantUrl.js');
	var order 		= require('/Talalah/js/scripts/lib/orderUrl.js');
	var product 	= require('/Talalah/js/scripts/lib/productUrl.js');
	var shipping 	= require('/Talalah/js/scripts/lib/shippingUrl.js');
	var travel 		= require('/Talalah/js/scripts/lib/travelProductUrl.js');
	
	var talalah = window.talalah||{};
	
	var InitContext = function(){
		
		
		
		this.getInitContext = function(){
			
			/* initiate packages */
			
			talalah.com = null || {};
			talalah.com.client = null || {};
			talalah.com.client.app = null || {};
			talalah.com.client.app.page = null || {};
			talalah.com.client.app.page.max = 8;
			talalah.com.client.app.page.content = null || {};
			talalah.com.client.app.page.content.user = 'http://localhost:8080/TalalahContents/content/user';;
			talalah.com.client.app.page.content.merchant = 'http://localhost:8080/TalalahContents/content/merchant';
			talalah.com.client.app.page.content.util = 'http://localhost:8080/TalalahContents/content/util';
			talalah.com.client.app.entity = null || {};
			
			// assignment data to the object
			// user module
			
			talalah.com.client.app.entity.user						= null || {};
			talalah.com.client.app.entity.user.user					= user.User;
			talalah.com.client.app.entity.user.role					= user.Role;
			talalah.com.client.app.entity.user.rate					= user.Rate;
			talalah.com.client.app.entity.user.message				= user.Message;
			talalah.com.client.app.entity.user.message.received		= user.Message.Received;
			talalah.com.client.app.entity.user.message.sent			= user.Message.Sent;
			
			// customer module
			talalah.com.client.app.entity.customer					= null || {};
			talalah.com.client.app.entity.customer.customer			= customer.Customer;
			talalah.com.client.app.entity.customer.cart				= customer.Cart;
			talalah.com.client.app.entity.customer.cartproduct		= customer.CartProduct;
			talalah.com.client.app.entity.customer.cartItem			= customer.CartProduct.CartItem;
			talalah.com.client.app.entity.customer.cartTravel		= customer.CartProduct.CartTravel;
			talalah.com.client.app.entity.customer.comment			= customer.Comment;
			talalah.com.client.app.entity.customer.role				= customer.Role;
			// merchant module
			talalah.com.client.app.entity.merchant					= null || {};
			talalah.com.client.app.entity.merchant.merchant			= merchant.Merchant;
			talalah.com.client.app.entity.merchant.merchantCode		= merchant.MerchantCode;
			talalah.com.client.app.entity.merchant.merchantCatGrp	= merchant.MerchantCatGrp;
			talalah.com.client.app.entity.merchant.transCodeCat		= merchant.TransCodeCat;
			// order module
			talalah.com.client.app.entity.order						= null || {};
			talalah.com.client.app.entity.order.order				= order.Order;
			talalah.com.client.app.entity.order.payment				= order.Payment;
			talalah.com.client.app.entity.order.orderProduct		= order.OrderProduct;
			talalah.com.client.app.entity.order.orderItem 			= order.OrderProduct.OrderItem;
			talalah.com.client.app.entity.order.orderTravel			= order.OrderProduct.OrderTravel;
			// product module
			talalah.com.client.app.entity.product					= null || {};
			talalah.com.client.app.entity.product.product 			= product.Product;
			talalah.com.client.app.entity.product.productCategory	= product.ProductCategory;
			talalah.com.client.app.entity.product.productImg		= product.ProductImg;
			// item module
			talalah.com.client.app.entity.product.item							= null || {};
			talalah.com.client.app.entity.product.item.item						= item.Item;
			talalah.com.client.app.entity.product.item.itemShippingProvider 	= item.ItemShippingProvider;
			talalah.com.client.app.entity.product.item.shippingProvider			= item.ShippingProvider;
			// travel module
			talalah.com.client.app.entity.product.travel						= null || {};
			talalah.com.client.app.entity.product.travel.travel 				= travel.Travel;
			talalah.com.client.app.entity.product.travel.activity				= travel.Activity;
			talalah.com.client.app.entity.product.travel.activityCategory		= travel.ActivityCategory;
			talalah.com.client.app.entity.product.travel.destination			= travel.Destination;
			// shipping module
			talalah.com.client.app.entity.shipping					= null || {};
			talalah.com.client.app.entity.shipping.address			= shipping.Address;
			talalah.com.client.app.entity.shipping.district			= shipping.District;
			talalah.com.client.app.entity.shipping.shipping			= shipping.Shipping;
			
			return talalah;
		};
	};
	
	return {
		init: function(){
			var initContext = new InitContext();
			return initContext.getInitContext();
		}
	}
});