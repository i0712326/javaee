/**
 * 
 */
define(function(require,exports,module){
	var Backbone 	= require('backbone');
	var Bootstrap 	= require('bootstrap');
	var Backgrid  	= require('backgrid');
	var MerchantCoreApp = require('merchantCoreApp');
	
	var ApplicationRouter = Backbone.Router.extend({
		initialize : function(){
			$('#logout').click(function(e){
				e.preventDefault();
				$('#logoutForm').submit();
			});
		},
		routes : {
			''								:	'showHome',
			'Home/Customer/:id'				:	'showHome',
			'Messages/Customer/:id/Inbox'	:	'showInbox',
			'Messages/Customer/:id/Inbox/:mId'	:	'showInboxMessage',
			'Messages/Customer/:id/Sent'	:	'showSentMessage',
			'Messages/Customer/:id/Sent/:mId'	:	'showSentDetail',
			'Products/Customer/:id'			:	'showProducts',
			'Products/Customer/:id/Add'		:	'showAddProduct',
			'Products/Customer/:id/:pId'	:	'showProduct',
			'Order/Customer/:id'			:	'showOrder',
			'Order/Customer/:id/:oId'		:	'showOrderDetail',
			'History/Customer/:id'			:	'showHistory',
			'History/Customer/:id/:oId'		:	'showHistoryDetail'
		},
		showHome	:	function(id){
			$('.nav li').removeClass('active');
			$('#home').addClass('active');
			$('#page-content').empty();
			if(id===null){
				id = $('input[name=mcId]').val().trim();
			}
			$('#page-content').append(MerchantCoreApp.showHome(id));
		},
		showProducts : function(id){
			$('.nav li').removeClass('active');
			$('#product').addClass('active');
			$('#page-content').empty();
			$('#page-content').append(MerchantCoreApp.showProducts(id));
		},
		showProduct : function(id,pId){
			$('.nav li').removeClass('active');
			$('#product').addClass('active');
			$('#page-content').empty();
			$('#page-content').append(MerchantCoreApp.showProduct(id,pId));
		},
		showAddProduct : function(id){
			$('.nav li').removeClass('active');
			$('#product').addClass('active');
			$('#page-content').empty();
			$('#page-content').append(MerchantCoreApp.showAddProduct(id));
		},
		showInbox	: function(id){
			$('.nav li').removeClass('active');
			$('#messages').addClass('active');
			$('#page-content').empty();
			$('#page-content').append(MerchantCoreApp.showMessageInbox(id));
		},
		showInboxMessage : function(id,mId){
			$('.nav li').removeClass('active');
			$('#messages').addClass('active');
			$('#page-content').empty();
			$('#page-content').append(MerchantCoreApp.showInboxMsg(mId));
		},
		showSentMessage : function(mcId){
			$('.nav li').removeClass('active');
			$('#messages').addClass('active');
			$('#page-content').empty();
			$('#page-content').append(MerchantCoreApp.showSentMessage(mcId));
		},
		showSentDetail : function(id,mId){
			$('.nav li').removeClass('active');
			$('#messages').addClass('active');
			$('#page-content').empty();
			$('#page-content').append(MerchantCoreApp.showSentDetail(mId));
		},
		showOrder	: function(id){
			$('.nav li').removeClass('active');
			$('#orders').addClass('active');
			$('#page-content').empty();
			$('#page-content').append(MerchantCoreApp.showOrder(id));
		},
		showOrderDetail : function(mcId,oId){
			$('.nav li').removeClass('active');
			$('#orders').addClass('active');
			$('#page-content').empty();
			$('#page-content').append(MerchantCoreApp.showOrderDetail(mcId,oId));
		},
		showHistory : function(mcId){
			$('.nav li').removeClass('active');
			$('#history').addClass('active');
			$('#page-content').empty();
			$('#page-content').append(MerchantCoreApp.showHistory(mcId));
		},
		showHistoryDetail : function(mcId,oId){
			$('.nav li').removeClass('active');
			$('#history').addClass('active');
			$('#page-content').empty();
			$('#page-content').append(MerchantCoreApp.showHistoryDetail(mcId,oId));
		}
	});
	
	return {
		start:function(){
			var applicationRouter = new ApplicationRouter();
			Backbone.history.start();
		}
	}
});