/**
 * 
 */
define(function(require,exports,module){
	var $		 	= require('jquery');
	var _ 			= require('underscore');
	var Backbone 	= require('backbone');
	var init 		= require('init');
	var DeepModel	= require('deep-model');
	var talalah = init.init();
	
	var User = Backbone.Model.extend({
		urlRoot : talalah.com.client.app.entity.user.user.get
	});
	
	var SlideButtonModel = Backbone.Model.extend({
		defaults:function(){
			lbBtn1 = '';
			lbBtn2 = '';
			lbBtn3 = '';
			lbBtn4 = '';
		}
	});

	var SlideShow = Backbone.Model.extend({
		defaults:function(){
			num = 0;
			path='';
			name='';
		}
	});
	
	var SlideShows = Backbone.Collection.extend({
		model:SlideShow
	});
	
	var MerchantCode = Backbone.Model.extend({
		urlRoot : talalah.com.client.app.entity.merchant.merchantCode.get
	});
	// Merchant Model
	var Merchant = Backbone.Model.extend({
		urlRoot : talalah.com.client.app.entity.merchant.merchant.get
	});
	var Merchants = Backbone.Collection.extend({
		model : Merchant
	});
	
	// Model product
	var Product = Backbone.Model.extend({
		urlRoot	:	talalah.com.client.app.entity.product.product.get
	});
	var Products = Backbone.Collection.extend({
		model : Product
	});
	
	// Product image
	var ProductImg = Backbone.Model.extend({
		urlRoot : talalah.com.client.app.entity.product.productImg.get
	});
	var ProductImgs = Backbone.Collection.extend({
		model:ProductImg
	});
	
	// Destination Model
	var Destination = Backbone.Model.extend({
		urlRoot : talalah.com.client.app.entity.product.travel.travel.get
	});
	var Destinations = Backbone.Collection.extend({
		model : Destination
	});
	
	// Comment
	var Comment = Backbone.Model.extend({
		urlRoot : talalah.com.client.app.entity.customer.comment.get
	});
	var Comments = Backbone.Collection.extend({
		model:Comment
	});
	
	// Order (Shopping Cart)
	var Cart = Backbone.Model.extend({});
	var CartTotal = Backbone.Model.extend({});
	var Carts = Backbone.Collection.extend({model:Cart});
	
	var Activity = Backbone.DeepModel.extend({});
	
	var Activities = Backbone.Collection.extend({
		model:Activity
	});
	
	var ItemShippingProvider = Backbone.Model.extend({
	});
	var ItemShippingProviders = Backbone.Collection.extend({
		model : ItemShippingProvider
	});
	
	var KeyWord = Backbone.Model.extend({
		
	});
	return {
		SlideButtonModel 	: SlideButtonModel,
		SlideShow 			: SlideShow,
		SlideShows 			: SlideShows,
		User				: User,
		MerchantCode		: MerchantCode,
		Merchant 			: Merchant,
		Merchants 			: Merchants,
		Product 			: Product,
		Products 			: Products,
		ProductImg 			: ProductImg,
		ProductImgs 		: ProductImgs,
		Destination 		: Destination,
		Destinations 		: Destinations,
		Comment 			: Comment,
		Comments 			: Comments,
		Cart 				: Cart,
		Carts 				: Carts,
		Activities			: Activities,
		ItemShippingProviders 	: ItemShippingProviders,
		KeyWord					: KeyWord
	};
	
});