/**
 * 
 */
define(function(require, exports,module){
	var homePage	 = require('home.page');
	var productPage  = require('product.page');
	var merchantPage = require('merchant.page');
	var customerPage = require('customer.page');
	
	var customerInboxPage	= require('customer.inbox.page');
	var customerSentPage	= require('customer.sent.page');
	var customerCartPage	= require('customer.cart.page');
	var customerHistoryPage	= require('customer.history.page');
	
	var productSearchPage	= require('product.search.page');
	
	var accessPoint = {
			showHome:function(){
				return homePage.showHomePage();
			},
			showTravel:function(){
				return productPage.product.main.travel.render();
			},
			showTravelByDestId : function(id){
				return productPage.product.sub.travel.destination.render(id);
			},
			showProduct:function(){
				return productPage.product.main.item.render();
			},
			showLiving:function(){
				return null;
			},
			showContact:function(){
				return null;
			},
			showTheProduct:function(mcc,mcId,prdId){
				return productPage.product.render(prdId);
			},
			showProduct : function(){
				return productPage.product.main.item.render();
			},
			showMcProduct : function(mcc, mcId){
				return productPage.merchant.render(mcc,mcId);
			},
			showMccProduct : function(mcc){
				return productPage.merchantCode.render(mcc);
			},
			showMerchant:function(mcc,mcId){
				return merchantPage.showMerchantPage(mcId);
			},
			showCustomer:function(id){
				return customerPage.showCustomerPage(id);
			},
			showInbox : function(id){
				return customerInboxPage.showMessageInboxPage(id);
			},
			showInboxMessage : function(id,mId){
				return customerInboxPage.showMessageDetailPage(id,mId);
			},
			showSent : function(id){
				return customerSentPage.showMessageSentPage(id);
			},
			showSentMessage : function(id,mId){
				return customerSentPage.showMessageSentDetailPage(id,mId);
			},
			showCart : function(id,cId){
				return customerCartPage.showCartPage(id,cId);
			},
			showCartProduct :function(id,cId,pId,cpId){
				return customerCartPage.showCartProductPage(id, cId, pId, cpId);
			},
			showHistory : function(id){
				return customerHistoryPage.showHistoryPage(id);
			},
			showHistoryProduct : function(id,oId,pId,opId){
				return customerHistoryPage.showHistoryProductPage(id,oId,pId,opId);
			},
			showSearchProducts : function(keyWord){
				return productSearchPage.showSearchProduct(keyWord);
			}
	};
	
	return accessPoint;

});