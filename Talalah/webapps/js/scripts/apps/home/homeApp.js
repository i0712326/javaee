/**
 * 
 */
define(function(require,exports,module){
	
	var $ 			= require('jquery');
	var _ 			= require('underscore');
	var Backbone 	= require('backbone');
	var HomeCoreApp = require('homeCoreApp');
	var Model		= require('model');
	var cartApp		= require('cartApp');
	
	var ApplicationRouter = Backbone.Router.extend({
		initialize: function(){
			var appStorage = window.sessionStorage;
			var cart = JSON.parse(appStorage.getItem('cart'));
			var cartProducts = JSON.parse(appStorage.getItem('cartProducts'));
			var custId = $('#custId').val().trim();
			appStorage.removeItem('cart');
			appStorage.removeItem('cartProducts');
			cartApp.addCart(custId, cart, cartProducts);
			
			$('#searchItem').on('click', function(e){
				var keyVal = $('#itemSearchVal').val().trim();
				if(keyVal.trim()!==""){
					window.location.href='#Search/Product/'+keyVal;
				}
			});
		},
		routes : {
			''								: 'showHome',
			''								: 'showHome',
			'Home' 							: 'showHome',
			'Home/Travel'					: 'showTravel',
			'Home/Travel/:id'				: 'showTravelByDest',
			'Home/Travel/Product/:mcc/:mcId/:id'	: 'showTheProduct',
			'Home/Product'					: 'showProduct',
			'Home/Product/:mcc/:mcId/:id'	: 'showTheProduct',
			'Home/Product/:mcc/:mcId'		: 'showMcProduct',
			'Home/Product/:mcc'				: 'showMccProduct',
			'Home/Merchant/:mcc/:mcId'		: 'showMerchant',	
			'Home/Living'					: 'showLiving',
			'Home/Customer/:id'				: 'showCustomer',
			'Home/Customer/:id/Inbox'		: 'showInbox',
			'Home/Customer/:id/Inbox/:mId'	: 'showInboxMessage',
			'Home/Customer/:id/Sent'		: 'showSent',
			'Home/Customer/:id/Sent/:mId'	: 'showSentMessage',
			'Home/Customer/:id/Cart/:cId'	: 'showCart',
			'Home/Customer/:id/Cart/:cId/:pId/:cpId' : 'showCartProduct',
			'Home/Customer/:id/History'		: 'showHistory',
			'Home/Customer/:id/History/:oId/:pId/:opId'	:	'showHistoryProduct',
			'Search/Product/:keyVal'		: 'searchProduct',
			'Contact' 						: 'showContact'
		},
		showHome : function() {
			$('.nav li').removeClass('active');
			$('#item-home').addClass('active');
			$('#pageContent').empty();
			$('#pageContent').append(HomeCoreApp.showHome());
		},
		showTravel : function() {
			$('.nav li').removeClass('active');
			$('#item-travel').addClass('active');
			$('#pageContent').empty();
			$('#pageContent').append(HomeCoreApp.showTravel());
		},
		showProduct : function() {
			$('.nav li').removeClass('active');
			$('#item-fashion').addClass('active');
			$('#pageContent').empty();
			$('#pageContent').append(HomeCoreApp.showProduct());
		},
		showLiving : function() {
			$('.nav li').removeClass('active');
			$('#item-living').addClass('active');
			$('#pageContent').empty();
			$('#pageContent').append(null);
		},
		showContact : function(){
			$('.nav li').removeClass('active');
			$('#item-living').addClass('active');
			$('#pageContent').empty();
			$('#pageContent').append(null);
		},
		showTheProduct : function(mcc,mcId,id){
			$('#pageContent').empty();
			$('#pageContent').append(HomeCoreApp.showTheProduct(mcc,mcId,id));
		},
		showTravelByDest : function(id){
			$('#pageContent').empty();
			$('#pageContent').append(HomeCoreApp.showTravelByDestId(id));
		},
		showMerchant : function(mcc, mcId){
			$('#pageContent').empty();
			$('#pageContent').append(HomeCoreApp.showMerchant(mcc,mcId));
		},
		showMcProduct : function(mcc, mcId){
			$('#pageContent').empty();
			$('#pageContent').append(HomeCoreApp.showMcProduct(mcc,mcId));
		},
		showMccProduct : function(mcc){
			$('#pageContent').empty();
			$('#pageContent').append(HomeCoreApp.showMccProduct(mcc));
		},
		showCustomer : function(id){
			$('#pageContent').empty();
			$('#pageContent').append(HomeCoreApp.showCustomer(id));
		},
		showInbox : function(id){
			$('#pageContent').empty();
			$('#pageContent').append(HomeCoreApp.showInbox(id));
		},
		showInboxMessage : function(id,mId){
			$('#pageContent').empty();
			$('#pageContent').append(HomeCoreApp.showInboxMessage(id,mId));
		},
		showSent : function(id){
			$('#pageContent').empty();
			$('#pageContent').append(HomeCoreApp.showSent(id));
		},
		showSentMessage : function(id,mId){
			$('#pageContent').empty();
			$('#pageContent').append(HomeCoreApp.showSentMessage(id,mId));
		},
		showCart : function(id,cId){
			$('#pageContent').empty();
			$('#pageContent').append(HomeCoreApp.showCart(id,cId));
		},
		showCartProduct : function(id, cId, pId, cpId){
			$('#pageContent').empty();
			$('#pageContent').append(HomeCoreApp.showCartProduct(id, cId, pId, cpId));
		},
		showHistory : function(id){
			$('#pageContent').empty();
			$('#pageContent').append(HomeCoreApp.showHistory(id));
		},
		showHistoryProduct : function(id,oId,pId,opId){
			$('#pageContent').empty();
			$('#pageContent').append(HomeCoreApp.showHistoryProduct(id,oId,pId,opId));
		},
		searchProduct:function(keyVal){
			$('#pageContent').empty();
			$('#pageContent').html(HomeCoreApp.showSearchProducts(keyVal));
		},
	});
	
	return{
		start:function(){
			var applicationRouter = new ApplicationRouter();
			Backbone.history.start();
		}
	}
	
	
});