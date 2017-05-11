/**
 * 
 */
define(function(require,exports,module){
	
	var $ 		=	require('jquery');
	var _		=	require('underscore');
	var Backbone	=	require('backbone');
	var Handlebars	=	require('handlebars');
	
	var event		=	require('order.event');
	var orderTempl	=	require('text!orderTemp');
	
	var $orderMainTempl		= $(orderTempl).find('#orderMainTemp').html();
	var $orderItemTempl	  	= $(orderTempl).find('#orderItemTemp').html();
	var $orderTravelTempl	= $(orderTempl).find('#orderTravelTemp').html();
	
	var $orderDetailTempl 	= $(orderTempl).find('#orderDetailTemp').html();
	
	var $orderItemProductTemp		= $(orderTempl).find('#itemDetailTemp').html();;
	var $orderItemDetailTemp		= $(orderTempl).find('#orderItemDetailTemp').html();
	var $ItemShippingProviderTemp	= $(orderTempl).find('#shippingProviderTemp').html();
	
	var $orderTravelProductTemp		= $(orderTempl).find('#travelDetailTemp').html();
	var $orderTravelDetailTempl		= $(orderTempl).find('#orderTravelDetailTemp').html();
	var $destinationTemp			= $(orderTempl).find('#destinationTemp').html();
	var $activityTemp				= $(orderTempl).find('#activityTemp').html();
	
	var OrderMainView = Backbone.View.extend({
		initialize : function(){
			_.bindAll(this, "render");
		    this.model.bind('change', this.render);
		    this.page = 1;
		    this.searchpage = 1;
		},
		className 	: 'container',
		template	: Handlebars.compile($orderMainTempl),
		render		: function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this.$el;
		},
		events : {
			'click #search'		: 'doSearch',
			'click #loadmore' 	: 'doLoadMore',
			'click #searchmore'	: 'doSearchMore',
			'click #reset'		: 'doReset'
		},
		doSearch : function(e){
			e.preventDefault();
			event.doSearch(this,OrderProductViews);
		},
		doLoadMore : function(e){
			e.preventDefault();
			event.doLoadMore(this.page,this,OrderProductViews);
		},
		doSearchMore : function(e){
			e.preventDefault();
			event.doLoadMore(this.searchpage,this,OrderProductViews);
		},
		doReset	: function(e){
			e.preventDefault();
			event.doReset(this,OrderProductViews);
		}
	});
	
	var OrderItemView	= Backbone.View.extend({
		className : 'col-xs-12 col-sm-12 col-lg-12 space orderProductItem',
		template : Handlebars.compile($orderItemTempl),
		render : function(){
			var data 	= this.model.toJSON();
			var mcc 	= data.product.merchant.merchantCode.mcc;
			var mcId	= data.product.merchant.mcId;
			var img		= data.product.img;
			this.$el.html(this.template(data));
			this.$el.find('img').attr('src',"/TalalahMerchant/content/"+mcc+"/"+mcId+"/"+img);
			return this.$el;
		}
	});
	
	var OrderTravelView = Backbone.View.extend({
		className : 'col-xs-12 col-sm-12 col-lg-12 space orderProductItem',
		template : Handlebars.compile($orderTravelTempl),
		render : function(){
			var data 	= this.model.toJSON();
			var mcc 	= data.product.merchant.merchantCode.mcc;
			var mcId	= data.product.merchant.mcId;
			var pId		= data.product.id;
			var img		= data.product.img;
			this.$el.html(this.template(data));
			this.$el.find('img').attr('src',"/TalalahMerchant/content/"+mcc+"/"+mcId+"/"+pId+"/"+img);
			return this.$el;
		}
	});
	
	var OrderProductViews = Backbone.View.extend({
		render : function(){
			_.each(this.collection.models,function(item){
				var data = item.toJSON();
				var product = data.product;
				var mcc = product.merchant.merchantCode.mcc;
				if(mcc==='4722'){
					var orderView = new OrderTravelView({model:item});
					this.$el.append(orderView.render());
				}
				else{
					var orderView = new OrderItemView({model:item});
					this.$el.append(orderView.render());
				}
			},this);
			
			return this.$el;
		}
	});
	
	var OrderDetailView = Backbone.View.extend({
		initialize	:	function(){
			_.bindAll(this, "render");
		    this.model.bind('change', this.render);
		},
		className	: 	'containter',
		template	:	Handlebars.compile($orderDetailTempl),
		render		:	function(){
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
			if($.isEmptyObject(data.product)===false){
				var mcc = data.product.merchant.merchantCode.mcc;
				var mcId = data.product.merchant.mcId;
				var pId	= data.product.id;
				var img	= data.product.img;
				this.$el.find('img').attr('src','/TalalahMerchant/content/'+mcc+"/"+mcId+"/"+pId+"/"+img);
			}
			return this.$el;
		}
	});
	
	var OrderItemProductView = Backbone.View.extend({
		template : Handlebars.compile($orderItemProductTemp),
		render : function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this.$el;
		}
	});
	
	var OrderItemDetailView = Backbone.View.extend({
		template : Handlebars.compile($orderItemDetailTemp),
		render : function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this.$el;
		},
		events : {
			'click #confirm' : 'doConfirm',
			'click #upload'	  : 'doUpload'
		},
		doConfirm : function(e){
			e.preventDefault();
			event.doConfirmItem(this);
		},
		doUpload : function(e){
			e.preventDefault();
			event.doUpload(this);
		}
	});
	
	var OrderTravelProductView = Backbone.View.extend({
		template : Handlebars.compile($orderTravelProductTemp),
		render : function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this.$el;
		}
	});
	
	var OrderTravelDetailView = Backbone.View.extend({
		template : Handlebars.compile($orderTravelDetailTempl),
		render : function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this.$el;
		},
		events : {
			'click #confirm' : 'doConfirm'
		},
		doConfirm : function(e){
			e.preventDefault();
			event.doConfirmTravel(this);
		}
	});
	
	var DestinationView = Backbone.View.extend({
		template : Handlebars.compile($destinationTemp),
		render : function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this.$el;
		}
	});
	
	var DestinationViews = Backbone.View.extend({
		render : function(){
			_.each(this.collection.models, function(item){
				var destinationView = new DestinationView({model:item});
				this.$el.append(destinationView.render());
			},this);
			
			return this.$el;
		}
	});
	
	var ActivityView = Backbone.View.extend({
		className : 'col-xs-12 col-sm-12 col-lg-12',
		template : Handlebars.compile($activityTemp),
		render : function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this.$el;
		}
	});
	
	var ActivityViews = Backbone.View.extend({
		render : function(){
			_.each(this.collection.models,function(item){
				var activityView = new ActivityView({model:item});
				this.$el.append(activityView.render());
			},this);
			return this.$el;
		}
	});
	
	return {
		OrderMainView 			: OrderMainView,
		OrderItemView			: OrderItemView,
		OrderTravelView			: OrderTravelView,
		OrderProductViews		: OrderProductViews,
		OrderDetailView			: OrderDetailView,
		OrderItemProductView	: OrderItemProductView,
		OrderItemDetailView		: OrderItemDetailView,
		OrderTravelProductView	: OrderTravelProductView,
		OrderTravelDetailView	: OrderTravelDetailView,
		DestinationView			: DestinationView,
		DestinationViews		: DestinationViews,
		ActivityView			: ActivityView,
		ActivityViews			: ActivityViews
	};
});