/**
 * 
 */
define(function(require, exports, module){
	var $ 		  = require('jquery');
	var _ 		  = require('underscore');
	var Backbone  = require('backbone');
	var DeepModel = require('deep-model');
	var init	  = require('init');
	
	var talalah   = init.init();
	
	var $User     = Backbone.Model.extend({
		urlRoot : talalah.com.client.app.entity.user.user.get,
		defaults: function(){
			this.name = 'Administrator';
			this.id	  = 3;
		}
	});
	
	var $SlideButtonModel = Backbone.Model.extend({
		defaults:function(){
			lbBtn1 = '';
			lbBtn2 = '';
			lbBtn3 = '';
			lbBtn4 = '';
		}
	});
	
	var $Product = Backbone.Model.extend({
		urlRoot:talalah.com.client.app.entity.product.product.get
	});
	var $Products = Backbone.Collection.extend({
		model:$Product
	});
	var $Destination = Backbone.Model.extend({});
	var $Destinations = Backbone.Collection.extend({
		model:$Destination
	});
	
	var $TravelDestinations = Backbone.Model.extend({
		
	});
	var $TravelActivities	= Backbone.Model.extend({
		
	});
	
	var $MessagePanel = Backbone.Model.extend({
		defaults:function(){
			this.title = 'Inbox';
		}
	});
	
	var $Message = Backbone.DeepModel.extend({
		urlRoot : talalah.com.client.app.entity.user.message.get,
		defaults:function(){
			this.id		  = 0;
			this.sender	  = '';
			this.receiver = '';
			this.subject  = '';
			this.body	  = '';
			this.date	  = null;
		}
	});
	
	var $Messages = Backbone.Collection.extend({
		model:$Message
	});
	
	// slide show model
	
	var $SlideShow = Backbone.Model.extend({
		defaults:function(){
			num = 0;
			path='';
			name='';
		}
	});
	
	var $SildeShows = Backbone.Collection.extend({
		model:$SlideShow
	});
	
	var $Activity = Backbone.DeepModel.extend({});
	
	var $Activities = Backbone.Collection.extend({
		model:$Activity
	})
	
	var $ShippingProvider = Backbone.DeepModel.extend({});
	var $ShippingProviders = Backbone.Collection.extend({
		model:$ShippingProvider
	});
	
	var $ProductImg	= Backbone.Model.extend({});
	var $ProductImgs = Backbone.Collection.extend({});
	
	var $Comment	= Backbone.Model.extend({});
	var $Comments	= Backbone.Collection.extend({model:$Comment});
	
	var $MerchantCode = Backbone.Model.extend({
		urlRoot:talalah.com.client.app.entity.merchant.merchantCode.get
	});
	
	var $Merchant = Backbone.Model.extend({
		urlRoot:talalah.com.client.app.entity.merchant.merchant.get
	});
	var $Merchants = Backbone.Collection.extend({model:$Merchant})
	
	var $District = Backbone.Model.extend({
		urlRoot : talalah.com.client.app.entity.shipping.district.get
	});
	
	var $Districts = Backbone.Collection.extend({
		model:$District
	});
	
	var $Order = Backbone.Model.extend({
		urlRoot:talalah.com.client.app.entity.order.order.get
	});
	
	var $Orders = Backbone.Collection.extend({
		model : $Order
	});
	
	var $Shipping	= Backbone.Model.extend({
		urlRoot : talalah.com.client.app.entity.shipping.shipping.get
	});
	
	var $Customer = Backbone.Model.extend({
		urlRoot : talalah.com.client.app.entity.customer.customer.get
	});
	
	
	var $CartProduct = Backbone.Model.extend({
		urlRoot : talalah.com.client.app.entity.customer.cartproduct.get
	});
	
	var $CartProducts = Backbone.Collection.extend({
		model : $CartProduct
	});
	
	var $CartTravel = Backbone.Model.extend({
		urlRoot : talalah.com.client.app.entity.customer.cartTravel.get
	});
	
	var $CartItem	= Backbone.Model.extend({
		urlRoot : talalah.com.client.app.entity.customer.cartItem.get
	});
	
	var $OrderProduct = Backbone.Model.extend({
		urlRoot : talalah.com.client.app.entity.order.orderProduct.get
	});
	
	var $OrderProducts = Backbone.Collection.extend({
		model : $OrderProduct
	});
	
	var $OrderTravel = Backbone.Model.extend({
		urlRoot : talalah.com.client.app.entity.order.orderTravel.get
	});
	
	var $OrderItem = Backbone.Model.extend({
		urlRoot : talalah.com.client.app.entity.order.orderItem.get
	});
	
	var $ItemShippingProvider = Backbone.Model.extend({
		urlRoot : talalah.com.client.app.entity.product.itemShippingProvider
	});
	
	var $ItemShippingProviders = Backbone.Collection.extend({
		model:$ItemShippingProvider
	});
	
	var ItemhasShippingProviders = Backbone.Model.extend({});
	var Rate = Backbone.Model.extend({
		urlRoot : talalah.com.client.app.entity.user.rate.get
	});
	return {
		User 			 : $User,
		SlideButtonModel : $SlideButtonModel,
		SlideShow		 : $SlideShow,
		SlideShows		 : $SildeShows,
		Product 		 : $Product,
		TravelDestinations	: $TravelDestinations,
		TravelActivities	: $TravelActivities,
		Products 		 : $Products,
		Destination		 : $Destination,
		Destinations	 : $Destinations,
		Activity		 : $Activity,
		Activities		 : $Activities,
		ShippingProvider : $ShippingProvider,
		ShippingProviders: $ShippingProviders,
		ProductImg		 : $ProductImg,
		ProductImgs		 : $ProductImgs,
		Comment			 : $Comment,
		Comments		 : $Comments,
		MerchantCode	 : $MerchantCode,
		Merchant		 : $Merchant,
		Merchants		 : $Merchants,
		District		 : $District,
		Districts		 : $Districts,
		MessagePanel	 : $MessagePanel,
		Message			 : $Message,
		Messages		 : $Messages,
		Order			 : $Order,
		Orders			 : $Orders,
		Shipping		 : $Shipping,
		Customer		 : $Customer,
		CartProduct		 : $CartProduct,
		CartProducts	 : $CartProducts,
		CartTravel		 : $CartTravel,
		CartItem		 : $CartItem,
		OrderProduct	 : $OrderProduct,
		OrderProducts	 : $OrderProducts,
		OrderTravel	 	 : $OrderTravel,
		OrderItem	 	 : $OrderItem,
		ItemShippingProvider		: $ItemShippingProvider,
		ItemShippingProviders		: $ItemShippingProviders,
		ItemhasShippingProviders	: ItemhasShippingProviders,
		Rate : Rate
	};
	
})