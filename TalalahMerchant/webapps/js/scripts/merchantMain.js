/**
 * 
 */
requirejs.config({
    baseUrl: '../../js',
    paths: {
    	jquery		 : 'lib/jquery-2.1.3.min',
    	underscore	 : 'lib/underscore-min',
    	backbone	 : 'lib/backbone-min',
    	handlebars	 : 'lib/handlebars-v3.0.1',
    	bootstrap	 : 'lib/bootstrap.min',
    	text		 : 'lib/text',
    	'deep-model' : 'lib/deep-model.min',
    	'backgrid'	 : 'lib/backgrid',
    	datetimepicker 	: 'lib/bootstrap-datetimepicker.min',
    	moment			: 'lib/moment.min',
    	// application dependency
    	init		 : 'scripts/lib/init',
    	model		 : 'scripts/apps/merchant/model/merchantModel',
    	merchantCoreApp	: 'scripts/apps/merchant/merchantCoreApp',
    	'home.view'  	: 'scripts/apps/merchant/view/home.view',
    	'product.view'	: 'scripts/apps/merchant/view/product.view',
    	'message.view'	: 'scripts/apps/merchant/view/message.view',
    	'order.view'	: 'scripts/apps/merchant/view/order.view',
    	'history.view'	: 'scripts/apps/merchant/view/history.view',
    	// page
    	'home.page'	 	: 'scripts/apps/merchant/page/home.page',
    	'product.page'	: 'scripts/apps/merchant/page/product.page',
    	'product.view.page'	: 'scripts/apps/merchant/page/product.view.page',
    	'product.add.page'	: 'scripts/apps/merchant/page/product.add.page',
    	'message.inbox.page': 'scripts/apps/merchant/page/message.inbox.page',
    	'message.sent.page'	: 'scripts/apps/merchant/page/message.sent.page',
    	'order.page'		: 'scripts/apps/merchant/page/order.page',
    	'history.page'		: 'scripts/apps/merchant/page/history.page',
    	// controller bundles
    	'home.event' 		: 'scripts/apps/merchant/controller/home.event',
    	'product.event'		: 'scripts/apps/merchant/controller/product.event',
    	'message.inbox.event'	: 'scripts/apps/merchant/controller/message.inbox.event',
    	'message.sent.event'	: 'scripts/apps/merchant/controller/message.sent.event',
    	'order.event'			: 'scripts/apps/merchant/controller/order.event',
    	'history.event'			: 'scripts/apps/merchant/controller/history.event',
    	// template bundles
    	merchantHomeTemp 	: '/TalalahMerchant/template/merchant/home/home.html',
    	productTemp			: '/TalalahMerchant/template/merchant/products/product.html',
    	messageInboxTemp	: '/TalalahMerchant/template/merchant/messages/message.inbox.html',
    	messageSentTemp		: '/TalalahMerchant/template/merchant/messages/message.sent.html',
    	orderTemp			: '/TalalahMerchant/template/merchant/order/order.temp.html',
    	historyTemp			: '/TalalahMerchant/template/merchant/history/history.temp.html'
    },
    shim : {
    	jquery 		: { exports : '$' },
    	underscore 	: { exports : '_'},
    	bootstrap 	: { deps : ['jquery'], exports :'Bootstrap' },
    	handlebars 	: { exports :'Handlebars'},
    	backbone 	: { deps:['jquery','underscore'], exports : 'Backbone'},
    	'deep-model': { deps:['jquery','underscore'], exports : 'DeepModel'},
    	backgrid	: { deps:['backbone'], exports : 'Backgrid'},
    	datetimepicker : {deps:['backbone','moment'], exports:'datetimepicker'}
    }
});

require(['scripts/apps/merchant/merchantApp'], function(app) {
	app.start();
});