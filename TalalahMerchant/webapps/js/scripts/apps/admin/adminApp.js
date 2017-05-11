/**
 * 
 */
define(['jquery', 'underscore', 'backbone',
        '../../apps/admin/adminCoreApp.js',
        '../../apps/admin/merchantView.js',
        'text!/Talalah/template/admin/customer/customer.html',
        'text!/Talalah/template/admin/product/product.html',
        'text!/Talalah/template/admin/order/order.html',
        'text!/Talalah/template/admin/shipping/shipping.html'],
        function($, _, Backbone, App, merchantView,
        		// HTML content template
        		customerTemp, productTemp, orderTemp, shippingTemp){
	
	var ApplicationRouter = Backbone.Router.extend({
		initialize: function(){
			var active = $("ul li.active").text().trim();
			if(active==='Home'){
				
			}
			if(active==='Product'){
				$('#page-content').empty();
				$('#page-content').append($(productTemp).html());
			}
			if(active==='Cusotmer'){
				$('#page-content').empty();
				$('#page-content').append($(shippingTemp).html());
			}
			if(active==='Order'){
				$('#page-content').empty();
				$('#page-content').append($(orderTemp).html());
			}
		},
		routes:{
			''							:	'showMerchant',
			'Merchant' 				 	:	'showMerchant',
			'Merchant/Add'			 	:	'addMerchant',
			'Merchant/View/:mcId'		:	'viewMerchant',
			'Merchant/View/:mcId/:prdId':	'viewMerchantProduct',
			'Product' 					: 	'showProduct',
			'Customer' 					: 	'showShipping',
			'Order'					 	: 	'showOrder'
		},
		showMerchant : function(){
			$('.nav li').removeClass('active');
			$('#admin-merchant').addClass('active');
			$('#page-content').empty();
			$('#page-content').append(App.showMerchantMain());
		},
		showProduct : function(){
			$('.nav li').removeClass('active');
			$('#admin-product').addClass('active');
			$('#page-content').empty();
			$('#page-content').append($(productTemp).html());
		},
		showShipping : function(){
			$('.nav li').removeClass('active');
			$('#admin-shipping').addClass('active');
			$('#page-content').empty();
			$('#page-content').append($(shippingTemp).html());
		},
		showCustomer : function(){
			$('.nav li').removeClass('active');
			$('#admin-customer').addClass('active');
			$('#page-content').empty();
			$('#page-content').append($(customerTemp).html());
		},
		showOrder : function(){
			$('.nav li').removeClass('active');
			$('#admin-order').addClass('active');
			$('#page-content').empty();
			$('#page-content').append($(orderTemp).html());
		},
		addMerchant : function(){
			$('#page-content').empty();
			$('#page-content').append(App.showMerchantAddView());
		},
		viewMerchant:function(mcId){
			$('#page-content').empty();
			$('#page-content').append(App.showMerchantDetail(mcId));
		},
		viewMerchantProduct : function(mcId, prdId){
			$('#page-content').empty();
			$('#page-content').append(App.viewProductDetail(prdId));
		}
	});
	
	return {
		start:function(){
			var applicationRouter = new ApplicationRouter();
			Backbone.history.start();
		}
		
	};
});