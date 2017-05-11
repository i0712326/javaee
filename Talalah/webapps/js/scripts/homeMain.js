requirejs.config({
    baseUrl: '../js',
    paths: {
        jquery				:	'lib/jquery-2.1.3.min',
        bootstrap			:	'lib/bootstrap.min',
        underscore			:	'lib/underscore-min',
        handlebars			:	'lib/handlebars-v3.0.1',
        backbone			:	'lib/backbone-min',
        backboneRelational	:	'lib/backbone-relational',
        verify				:	'lib/verify.notify.min',
        simpleZoom			:	'lib/simpleZoom',
        dateformat			:	'lib/dateformat',
        text				:	'lib/text',
        'deep-model'		:	'lib/deep-model.min',
        backgrid			:	'lib/backgrid',
        'backbone.paginator':	'lib/backbone.paginator',
        backgridPaginator	:	'lib/backgrid-paginator.min',
        backgridSelectAll	:	'lib/backgrid-select-all.min',
        backgridFilter		:	'lib/backgrid-filter.min',
        lunr				:	'lib/lunr.min',
        bootstrapdatepicker	:	'lib/bootstrap-datetimepicker.min',
        moment				:	'lib/moment.min',
        init				:	'scripts/lib/init',
        model				:	'scripts/apps/home/model/homeModel',
        
        // application event handler
        controller			: 	'scripts/apps/home/controller/homeController',
        merchantController	:	'scripts/apps/home/controller/merchant.controller',
        customerController	:	'scripts/apps/home/controller/customerController',
        'customer.cart.controller' 		: 'scripts/apps/home/controller/customer.cart.controller',
        'customer.history.controller'	: 'scripts/apps/home/controller/customer.history.controller',
        'product.controller'			: 'scripts/apps/home/controller/product.controller',
        'customer.inbox.controller' 	: 'scripts/apps/home/controller/customer.inbox.controller',
        'customer.sent.controller'		: 'scripts/apps/home/controller/customer.sent.controller',
        'customer.history.controller'	: 'scripts/apps/home/controller/customer.history.controller',
        
        // view component
        homeView			:	'scripts/apps/home/view/homeView',
        productView			:	'scripts/apps/home/view/productView',
        merchantView		:	'scripts/apps/home/view/merchantView',
        customerView		:	'scripts/apps/home/view/customerView',
        'customer.inbox.view'	:	'scripts/apps/home/view/customer.inbox.view',
        'customer.sent.view'	:	'scripts/apps/home/view/customer.sent.view',
        cartView			:	'scripts/apps/home/view/customer.cart.view',
        historyView			:	'scripts/apps/home/view/customer.history.view',
        // application end point
        homeCoreApp			:	'scripts/apps/home/homeCoreApp',
        cartApp				:	'scripts/apps/home/cartApp',
        // page
        'home.page'			:	'scripts/apps/home/page/home.page',
        'product.page'		:	'scripts/apps/home/page/product.page',
        'merchant.page'		:	'scripts/apps/home/page/merchant.page',
        'customer.page'		:	'scripts/apps/home/page/customer.page',
        'customer.inbox.page' 	: 'scripts/apps/home/page/customer.inbox.page',
        'customer.sent.page'  	: 'scripts/apps/home/page/customer.sent.page',
        'customer.cart.page'  	: 'scripts/apps/home/page/customer.cart.page',
        'customer.history.page'	: 'scripts/apps/home/page/customer.history.page',
        'product.search.page'	:	'scripts/apps/home/page/product.search.page',
        //template import
        homeTemp			:	'/Talalah/template/home/home.html',
        homeComponentTemp	:	'/Talalah/template/home/home_component.html',
        productTemp			:	'/Talalah/template/home/product/product.html',
        theProductTemp		:	'/Talalah/template/home/product/the_product.html',
        productComponentTemp:	'/Talalah/template/home/product/product_component.html',
        merchantTemp		:	'/Talalah/template/home/merchant/merchant.html',
        customerTemp		:	'/Talalah/template/home/profile/customer.html',
        messageTemp			:	'/Talalah/template/home/message/customer.message.html',
        cartTemp			:	'/Talalah/template/home/cart/customer.cart.html',
        cartProductTemp		:	'/Talalah/template/home/cart/customer.cart.product.html',
        historyTemp			:	'/Talalah/template/home/history/customer.history.html',
        historyProductTemp	:	'/Talalah/template/home/history/customer.history.product.html'
    },
    shim: {
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        backbone_relational:{
        	deps:['jquery','underscore','backbone'],
        	exports:'BackboneRealtional'
        },
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$'
        },
        bootstrap:{
        	deps:['jquery'],
        	exports:'Bootstrap'
        },
        backgrid:{
        	deps:['jquery','underscore','backbone'],
        	exports:'Backgrid'
        },
        'backbone.paginator':{
        	deps:['backbone'],
        	exports:'BackbonePaginator'
        },
        backgridPaginator:{
        	deps:['backbone','backbone.paginator'],
        	exports:'backgridPaginator'
        },
        backgridSelectAll:{
        	deps:['backgrid'],
        	exports:'backgridSelectAll'
        },
        backgridFilter:{
        	exports:'backgridFilter'
        },
        verify:{
        	deps:['jquery'],
        	exports:'Verify'
        },
        simpleZoom:{
        	deps:['jquery'],
        	exports:'simpleZoom'
        },
        'deep-model':{
        	exports:'deepModel'
        },
        moment : {
        	exports : 'moment'
        },
        bootstrapdatepicker : {
        	deps : ['jquery','moment'],
        	exports : 'bootstrapdatepicker'
        },
        init:{
        	exports:'init'
        },
        model:{
        	deps:['jquery','underscore','backbone'],
        	exports:'Model'
        },
        controller:{
        	deps:['init','model'],
        	exports:'Controller'
        },
        customerController:{
        	deps:['init','model'],
        	exports:'customerController'
        },
        'customer.message.controller':{
        	exports : 'customerMessageController'
        },
        'customer.cart.controller' : {
        	exports:'customerCartController'
        },
        'customer.history.controller':{
        	exports : 'customerHistoryController'
        },
        homeCoreApp:{
        	deps:['jquery','underscore','backbone'],
        	exports:'homeCoreApp'
        },
        homeView :{
        	exports:'homeView'
        },
        productView : {
        	exports:'productView'
        },
        'product.controller' : {
        	exports : 'productController'
        },
        merchantView:{
        	exports:'merchantView'
        },
        customerView:{ exports:'cusotmerView'},
        messageView : { exports:'messageView'},
        cartView : { exports : 'cartView'},
        historyView :{ exports : 'historyView'}
    }
});

require(['scripts/apps/home/homeApp' ], function(app) {
	app.start();
});
