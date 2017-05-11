/**
 * 
 */
define(function(require,exports,modules){
	
	var homePage 		= require('home.page');
	var productPage		= require('product.page');
	var productViewPage = require('product.view.page');
	var productAddPage	= require('product.add.page');
	var messageInboxPage	= require('message.inbox.page');
	var messageSentPage		= require('message.sent.page');
	var orderPage			= require('order.page');
	var historyPage			= require('history.page');
	var accessPoint = {
			showHome : function(id){
				return homePage.showMerchantHome(id);
			},
			showProducts: function(mcId){
				return productPage.showProducts(mcId);
			},
			showProduct : function(mcId,pId){
				return productViewPage.showProduct(mcId,pId);
			},
			showAddProduct : function(id){
				return productAddPage.showAddProduct(id);
			},
			showMessageInbox : function(id){
				return messageInboxPage.showInboxMessage(id);
			},
			showInboxMsg : function(id){
				return messageInboxPage.showMessageDetail(id);
			},
			showSentMessage : function(mcId){
				return messageSentPage.showSentMessage(mcId);
			},
			showSentDetail : function(id){
				return messageSentPage.showSentDetail(id);
			},
			showOrder : function(mcId){
				return orderPage.showOrderPage(mcId);
			},
			showOrderDetail : function(mcId, oId){
				return orderPage.showOrderDetailPage(mcId, oId);
			},
			showHistory : function(mcId){
				return historyPage.showHistoryPage(mcId);
			},
			showHistoryDetail : function(mcId,oId){
				return historyPage.showHistoryDetailPage(mcId,oId);
			}
	};
	
	return accessPoint;
	
});