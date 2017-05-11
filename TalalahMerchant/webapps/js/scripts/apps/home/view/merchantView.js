/**
 * 
 */
define(function(require,exports,module){	
	
	var $ 			= require('jquery');
	var _ 			= require('underscore');
	var Backbone 	= require('backbone');
	var Handlebars	= require('handlebars');
	var Model		= require('model');
	var init		= require('init');
	var event		= require('merchantController');
	
	var View		= require('homeView');
	
	var merchantTemp	= require('text!merchantTemp');
	
	var talalah = init.init();
	var $merchantTemp = $(merchantTemp).html();
	
	var MerchantView = Backbone.View.extend({
		initialize : function(){
			this.page = 1;
			this.searchPage = 1;
			_.bindAll(this, "render");
		    this.model.bind('change', this.render);
		},
		className:'container',
		template : Handlebars.compile($merchantTemp),
		render:function(){
			var data = this.model.toJSON();
			var mcc = data.merchantCode.mcc;
			var mcId = data.mcId;
			var img	= data.img;
			this.$el.html(this.template(data));
			this.$el.find('#merchantImg').attr('src','/Talalah/content/'+mcc+"/"+mcId+"/"+img);
			return this.$el;
		},
		events:{
			'click #search'		:	'doSearch',
			'click #loadmore' 	: 	'doLoadMore',
			'click #searchmore' : 	'doSearchMore'
		},
		doSearch:function(e){
			e.preventDefault();
			event.doSearch(this,View.ProductViews);
		},
		doLoadMore : function(e){
			e.preventDefault();
			event.doLoadMore(this,View.ProductViews);
			this.page++;
		},
		doSearchMore : function(e){
			e.preventDefault();
			event.doSearchMore(this,View.ProductViews);
			this.searchPage++;
		}
	});
	
	
	return {
		MerchantView : MerchantView
	}
	
});