/**
 * 
 */
requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery				: 'lib/jquery-2.1.3.min',
        bootstrap			: 'lib/bootstrap.min',
        underscore			: 'lib/underscore-min',
        handlebars			: 'lib/handlebars-v3.0.1',
        backbone			: 'lib/backbone-min',
        backboneRelational	: 'lib/backbone-relational',
        text				: 'lib/text',
        css					: 'lib/css.min',
        simpleZoom			: 'lib/simpleZoom',
        dateformat			:	'lib/dateformat',
        bootstrapdatepicker	: 'lib/bootstrap-datetimepicker.min',
        moment				: 'lib/moment.min',
        'deep-model'		: 'lib/deep-model.min',
        backgrid			: 'lib/backgrid',
        init				: 'scripts/lib/init',
        // web application
        model				: 'scripts/apps/index/model/indexModel',
        indexCoreApp		: 'scripts/apps/index/indexCoreApp',
        //view
        'home.view'			: 'scripts/apps/index/view/home.view',
        'product.view'		: 'scripts/apps/index/view/product.view',
        'travel.view'		: 'scripts/apps/index/view/travel.view',
        'item.view'			: 'scripts/apps/index/view/item.view',
        'comment.view'		: 'scripts/apps/index/view/comment.view',
        'cart.view'			: 'scripts/apps/index/view/cart.view',
        // events
        'home.event'		: 'scripts/apps/index/event/home.event',
        'product.event'		: 'scripts/apps/index/event/product.event',
        // page
        'home.page'			: 'scripts/apps/index/page/home.page',
        'travel.page'		: 'scripts/apps/index/page/travel.page',
        'travel.destination.page' : 'scripts/apps/index/page/travel.destination.page',
        'item.page'			: 'scripts/apps/index/page/item.page',
        'product.page'		: 'scripts/apps/index/page/product.page',
        'product.search.page'	:	'scripts/apps/index/page/product.search.page',
        'cart.page'				:	'scripts/apps/index/page/cart.page',
        // template HTML
        homeTemp			: '/Talalah/template/index/home.html',
        homeComponentTemp	: '/Talalah/template/index/home_component.html',
        productTempl		: '/Talalah/template/index/product/product.html',
        productComponentTempl : '/Talalah/template/index/product/product_component.html',
        theProductTemp		  : '/Talalah/template/index/product/the_product.html',
        cartTempl			  : '/Talalah/template/index/cart/index.cart.html'
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
        'deep-model':{
        	deps:['jquery','underscore','backbone'],
        	exports :'DeepModel'
        },
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$'
        },
        handlebars:{
        	exports : 'handlebars'
        },
        bootstrap:{
        	deps:['jquery'],
        	exports:'Bootstrap'
        },
        simpleZoom:{
        	deps:['jquery'],
        	exports:'SimpleZoom'
        },
        init:{
        	exports:'init'
        }
    }
});

require(['scripts/apps/index/indexApp'], function(app) {
	app.start();
});
