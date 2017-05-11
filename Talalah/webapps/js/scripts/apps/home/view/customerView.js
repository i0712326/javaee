/**
 * 
 */
define(function(require,exports,module){
	var $ 			= require('jquery');
	var _ 			= require('underscore');
	var Backbone 	= require('backbone');
	var Backgrid	= require('backgrid');
	var backGridPaginator 	= require('backgridPaginator');
	var backgridFilter 		= require('backgridFilter');
	var backgridSelectAll 	= require('backgridSelectAll');
	var Handlebars 	= require('handlebars');
	var Model		= require('model');
	var init 		= require('init');
	var customerProfileEvents = require('customerController');
	var talalah		= init.init();
	var content		= talalah.com.client.app.page.content.user;
	
	var cartView	= require('cartView');
	var historyView = require('historyView');
	var PrdView		= require('productView');
	
	var customerTemp = require('text!customerTemp');
	 
	var $customerTemp = $(customerTemp).find('#main-panel').html();
	var $addressTemp = $(customerTemp).find('#address-panel').html();
	
	var AddressView = Backbone.View.extend({
		template : Handlebars.compile($addressTemp),
		render : function(){
			return this.$el.html(this.template(this.model.toJSON()));
		}
	});
	
	var CustomerView = Backbone.View.extend({
		initialize : function(){
			this.page = 1;
			_.bindAll(this, "render");
		    this.model.bind('change', this.render);
		},
		className:'container',
		template : Handlebars.compile($customerTemp),
		render:function(){
			var data = this.model.toJSON();
			var id = data.id;
			var img = data.img;
			this.$el.html(this.template(data));
			this.$el.find('#profileImg').attr('src',content+'/'+id+'/'+img);
			return this.$el;
		},
		events : {
			'click #upload' 	: 'upload',
			'click #ok'			: 'doUpload',
			'click #edit_pro' 	: 'doEditPro',
			'click #ok1' 		: 'doUpdatePro',
			'click #edit_addr' 	: 'doEditAddr',
			'click #ok2'  		: 'doUpdateAddr',
			'click #loadmore'	: 'doLoadMore'
		},
		upload : function(e){
			e.preventDefault();
			customerProfileEvents.selectImgFile(this);
		},
		doUpload : function(e){
			e.preventDefault();
			customerProfileEvents.uploadImgFile(this);
		},
		doEditPro : function(e){
			e.preventDefault();
			customerProfileEvents.editUpdateProfile(this);
		},
		doUpdatePro : function(e){
			e.preventDefault();
			customerProfileEvents.doUpdateProfile(this);
		},
		doEditAddr:function(e){
			e.preventDefault();
			customerProfileEvents.doEditAddr(AddressView,this);
		},
		doUpdateAddr : function(e){
			e.preventDefault();
			customerProfileEvents.doUpdateAddr(this);
		},
		doLoadMore : function(e){
			e.preventDefault();
			customerProfileEvents.doLoadMore(this,PrdView.ProductViews);
			this.page++;
		}
	});
	
	
	return { 
		CustomerView	: CustomerView
	};
	
});