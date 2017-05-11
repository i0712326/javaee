/**
 * 
 */
define(function(require, exports,module){
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	var text	= require('text');
	var Model   = require('model');
	var init	= require('init');
	var talalah = init.init();
	var customerHistoryController = require('customer.history.controller');
	var customerComponentTemp = require('text!historyTemp');
	
	var $historyPanelTemp = $(customerComponentTemp).find('#history-panel').html();
	var $historyItemTemp = $(customerComponentTemp).find('#historyItem').html();
	var $historyTravelTemp = $(customerComponentTemp).find('#historyTravel').html();

	/* History module */
	
	var HistoryPanelView = Backbone.View.extend({
		initialize : function(){
			this.count = 0;
			this.keyWord = '';
			this.searchCount = 0;
			_.bindAll(this,"render");
			this.model.bind('change',this.render);
		},
		className :'container',
		template:Handlebars.compile($historyPanelTemp),
		render :function(){
			return this.$el.html(this.template(this.model.toJSON()));
		},
		events :{
			'click #loadmore':'doLoadMore',
			'click #search' : 'doSearch',
			'click #searchmore' : 'doSearchMore'
		},
		doLoadMore : function(e){
			e.preventDefault();
			var page = ++this.count;
			customerHistoryController.doLoadMore(e,page,this,OrderProductViews);
		},
		doSearch : function(e){
			e.preventDefault();
			customerHistoryController.doSearch(e,this,OrderProductViews);
		},
		doSearchMore : function(e){
			e.preventDefault();
			var page = ++this.searchCount;
			customerHistoryController.doSearchMore(e,page,this,OrderProductViews)
		}
	});
	
	var OrderItemView = Backbone.View.extend({
		className:'col-xs-12 col-sm-12 col-lg-12 space cartproduct',
		template : Handlebars.compile($historyItemTemp),
		render : function(){
			var data = this.model.toJSON();
			var mcc  = data.product.merchant.merchantCode.mcc;
			var mcId = data.product.merchant.mcId;
			var id	= data.product.id;
			var img = data.product.img;
			this.$el.html(this.template(data));
			this.$el.find('img').attr('src','/Talalah/content/'+mcc+'/'+mcId+'/'+id+'/'+img);
			return this.$el;
		},
		events : {
			'click #delete' : 'doDelete'
		},
		doDelete : function(e){
			e.preventDefault();
			customerHistoryController.orderItemEvent.doDelete(e,this);
		}
	});
	
	var OrderTravelView = Backbone.View.extend({
		className:'col-xs-12 col-sm-12 col-lg-12 space cartproduct',
		template : Handlebars.compile($historyTravelTemp),
		render : function(){
			var data = this.model.toJSON();
			var mcc = data.product.merchant.merchantCode.mcc;
			var mcId = data.product.merchant.mcId;
			var id	= data.product.id;
			var img = data.product.img;
			this.$el.html(this.template(data));
			this.$el.find('img').attr('src','/Talalah/content/'+mcc+'/'+mcId+'/'+id+'/'+img);
			return this.$el;
		},
		events : {
			'click #delete' : 'doDelete'
		},
		doDelete : function(e){
			e.preventDefault();
			customerHistoryController.orderTravelEvent.doDelete(e,this);
		}
	});
	
	var OrderProductViews = Backbone.View.extend({
		render:function(){
			_.each(this.collection.models, function(item){
				var data = item.toJSON();
				var type = data.product.productCategory.id;
				if(type==='I'){
					var orderItemView = new OrderItemView({model:item});
					this.$el.append(orderItemView.render());
				}
				else{
					var orderTravelView = new OrderTravelView({model:item});
					this.$el.append(orderTravelView.render());
				}
			}, this);
			
			return this.$el;
		}
	});
	
	// detail for history product
	var orderProductTemp		= require('text!historyProductTemp');
	var $orderProductTemp		= $(orderProductTemp).find('#historyProduct').html();
	var $itemOrderTemp			= $(orderProductTemp).find('#item-detail').html();
	var $shippingTemp			= $(orderProductTemp).find('#itemshippingprovider').html();
	var $travelOrderTemp		= $(orderProductTemp).find('#travel-detail').html();
	var $relatedImgTemp			= $(orderProductTemp).find('#relatedImg').html();
	var $relatedProductTemp		= $(orderProductTemp).find('#relatedPrd').html();
	var $commentTemp			= $(orderProductTemp).find('#comment').html();
	
	var OrderProductView = Backbone.View.extend({
		initialize : function(){
			this.count=0;
		},
		className : 'container',
		template : Handlebars.compile($orderProductTemp),
		render : function(){
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
			if(data.product.merchant!==undefined){
				var mcc = data.product.merchant.merchantCode.mcc;
				var mcId = data.product.merchant.mcId;
				var id	= data.product.id;
				var img = data.product.img;
				var updateStatus = data.updateStatus;
				if(updateStatus==='Y')
					this.$el.find('#eval').hide();
				this.$el.find('#img').attr('src','/Talalah/content/'+mcc+'/'+mcId+'/'+id+'/'+img);
				this.$el.find('#productImg').attr('src','/Talalah/content/'+mcc+'/'+mcId+'/'+id+'/'+img);
				this.$el.find('#merchantImg').attr('src','/Talalah/content/'+mcc+'/'+mcId+'/default.png');
				var mc = data.product.merchant;
			}
			return this.$el;
		},
		events : {
			'click #loadmore':'doLoadMore',
			'click #postEval':'doEval'
		},
		doLoadMore : function(e){
			e.preventDefault();
			var page = ++this.count;
			customerHistoryController.orderProductEvent.doLoadMore(page,this);
		},
		doEval : function(e){
			e.preventDefault();
			customerHistoryController.orderProductEvent.doEvaluate(this);
		}
	});
	
	var ItemOrderView = Backbone.View.extend({
		template : Handlebars.compile($itemOrderTemp),
		render : function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this.$el;
		}
	});
	
	var ShippingView = Backbone.View.extend({
		template : Handlebars.compile($shippingTemp),
		render : function(){
			return this.$el.html(this.template(this.model.toJSON()));
		}
	});
	
	var TravelOrderView = Backbone.View.extend({
		template : Handlebars.compile($travelOrderTemp),
		render : function(){
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
			return this.$el;
		}
	});
	
	return {
		HistoryPanelView	: HistoryPanelView,
		OrderItemView		: OrderItemView,
		OrderTravelView		: OrderTravelView,
		OrderProductViews 	: OrderProductViews,
		OrderProductView	: OrderProductView,
		ItemOrderView		: ItemOrderView,
		ShippingView		: ShippingView,
		TravelOrderView		: TravelOrderView
	}
});