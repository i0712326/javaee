/**
 * 
 */
requirejs.config({
    baseUrl: '../../js',
    paths: {
        jquery					:	'lib/jquery-2.1.3.min',
        bootstrap				:	'lib/bootstrap.min',
        underscore				:	'lib/underscore-min',
        handlebars				:	'lib/handlebars-v3.0.1',
        backbone				:	'lib/backbone-min',
        'deep-model'			:	'lib/deep-model.min',
        backboneRelational		:	'lib/backbone-relational',
        backgrid				:	'lib/backgrid',
        'backbone.paginator'	:	'lib/backbone.paginator',
        backgridPaginator		:	'lib/backgrid-paginator.min',
        backgridSelectAll		:	'lib/backgrid-select-all.min',
        backgridFilter			:	'lib/backgrid-filter.min',
        lunr					:	'lib/lunr.min',
        fileinput				:	'lib/fileinput.min',
        text					:	'lib/text',
        css						:	'lib/css.min',
        init					:	'scripts/lib/init'
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
        'deep-model':{
        	deps:['jquery','underscore','backbone'],
        	exports:'deepModel'
        },
        jquery: {
            exports: '$'
        },
        bootstrap:{
        	deps:['jquery'],
        	exports:'Bootstrap'
        },
        backGrid : {
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
        	exports:'backgridSelectAll'
        },
        backgridFilter:{
        	exports:'backgridFilter'
        },
        init:{
        	exports:'init'
        }
    }
});

require(['/Talalah/js/scripts/apps/admin/adminApp.js'], function(app) {
	app.start();
});