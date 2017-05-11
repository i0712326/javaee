/**
 * 
 */
define(function(require,exports,module){

	var $ 		=	require('jquery');
	var _		=	require('underscore');
	var Backbone	=	require('backbone');
	var Handlebars	=	require('handlebars');
	
	var event		=	require('history.event');
	var historyTempl	=	require('text!historyTemp');
	
	var $historyMainTempl		= $(historyTempl).find('#historyMainTemp').html();
	var $historyItemTempl	  	= $(historyTempl).find('#historyItemTemp').html();
	var $historyTravelTempl		= $(historyTempl).find('#historyTravelTemp').html();
	
	var $historyDetailTemp		= $(historyTempl).find('#historyDetailTemp').html();
	
	var HistoryMainView = Backbone.View.extend({
		initialize : function(){
			_.bindAll(this, "render");
		    this.model.bind('change', this.render);
		    this.page = 1;
		    this.searchpage = 1;
		},
		className 	: 'container',
		template	: Handlebars.compile($historyMainTempl),
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
			event.doSearch(this,HistoryProductViews);
		},
		doLoadMore : function(e){
			e.preventDefault();
			event.doLoadMore(this.page,this,HistoryProductViews);
		},
		doSearchMore : function(e){
			e.preventDefault();
			event.doLoadMore(this.searchpage,this,HistoryProductViews);
		},
		doReset	: function(e){
			e.preventDefault();
			event.doReset(this,HistoryProductViews);
		}
	});
	
	var HistoryItemView	= Backbone.View.extend({
		className : 'col-xs-12 col-sm-12 col-lg-12 space orderProductItem',
		template : Handlebars.compile($historyItemTempl),
		render : function(){
			var data 	= this.model.toJSON();
			var mcc 	= data.product.merchant.merchantCode.mcc;
			var mcId	= data.product.merchant.mcId;
			var img		= data.product.img;
			this.$el.html(this.template(data));
			this.$el.find('img').attr('src',"/Talalah/content/"+mcc+"/"+mcId+"/"+img);
			return this.$el;
		}
	});
	
	var HistoryTravelView = Backbone.View.extend({
		className : 'col-xs-12 col-sm-12 col-lg-12 space orderProductItem',
		template : Handlebars.compile($historyTravelTempl),
		render : function(){
			var data 	= this.model.toJSON();
			var mcc 	= data.product.merchant.merchantCode.mcc;
			var mcId	= data.product.merchant.mcId;
			var pId		= data.product.id;
			var img		= data.product.img;
			this.$el.html(this.template(data));
			this.$el.find('img').attr('src',"/Talalah/content/"+mcc+"/"+mcId+"/"+pId+"/"+img);
			return this.$el;
		}
	});
	
	var HistoryProductViews = Backbone.View.extend({
		render : function(){
			_.each(this.collection.models,function(item){
				var data = item.toJSON();
				var product = data.product;
				var mcc = product.merchant.merchantCode.mcc;
				if(mcc==='4722'){
					var historyView = new HistoryTravelView({model:item});
					this.$el.append(historyView.render());
				}
				else{
					var historyView = new HistoryItemView({model:item});
					this.$el.append(historyView.render());
				}
			},this);
			
			return this.$el;
		}
	});
	
	var HistoryDetailView = Backbone.View.extend({
		initialize	:	function(){
			_.bindAll(this, "render");
		    this.model.bind('change', this.render);
		},
		className	: 	'containter',
		template	:	Handlebars.compile($historyDetailTemp),
		render		:	function(){
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
			if($.isEmptyObject(data.product)===false){
				var mcc = data.product.merchant.merchantCode.mcc;
				var mcId = data.product.merchant.mcId;
				var pId	= data.product.id;
				var img	= data.product.img;
				
				var customer = data.order.customer;
				var cid		 = customer.id;
				var uImg	 = customer.img;
				
				var evalStatus = data.evalStatus;
				if(evalStatus ==='Y')
					this.$el.find('#eval').hide();
				
				this.$el.find('#prdImg').attr('src','/Talalah/content/'+mcc+"/"+mcId+"/"+pId+"/"+img);
				this.$el.find('#custImg').attr('src','/Talalah/content/user/customer/'+cid+"/"+uImg);
			}
			return this.$el;
		},
		events : {
			'click #postEval':'doEval'
		},
		doEval : function(e){
			e.preventDefault();
			event.doEval(this);
		}
	});
	
	return {
		HistoryMainView 	: HistoryMainView,
		HistoryItemView		: HistoryItemView,
		HistoryTravelView	: HistoryTravelView,
		HistoryProductViews	: HistoryProductViews,
		HistoryDetailView	: HistoryDetailView
	};
});