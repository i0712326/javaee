/**
 * 
 */
define(function(require,exports,module){
	var $ 				= require('jquery');
	var _ 				= require('underscore');
	var Backbone 		= require('backbone');
	var Handlebars 		= require('handlebars');
	var datetimepicker  = require('bootstrapdatepicker');
	var Backgrid		= require('backgrid');
	var Model			= require('model');
	var init 			= require('init');
	var event			= require('product.event');
	var View			= require('comment.view');
	var theProductTempl		  = require('text!theProductTemp');
	var productComponentTempl = require('text!productComponentTempl');
	
	var $productTempl		= $(productComponentTempl).find('#relatedPrd').html();
	var $productImgTempl	= $(productComponentTempl).find('#relatedImg').html();
	var $productSearchTempl = $(productComponentTempl).find('#productSearch').html();
	
	var talalah = init.init();
	
	var ProductView = Backbone.View.extend({
		className : 'col-xs-3 col-sm-3 col-lg-3',
		template : Handlebars.compile($productTempl),
		render : function(){
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
			var mcc = data.merchant.merchantCode.mcc;
			var mcId = data.merchant.mcId;
			var id	= data.id;
			var img = data.img
			var path = '/Talalah/content/'+mcc+'/'+mcId+'/'+id+'/'+img;
			this.$el.find('img').attr('src',path);
			return this.$el;
		}
	});
	
	var ProductViews = Backbone.View.extend({
		render:function(){
			_.each(this.collection.models, function(item){
				var productView = new ProductView({model:item});
				this.$el.append(productView.render());
			}, this);
			return this.$el;
		}
	});
	
	var ProductImgView = Backbone.View.extend({
		className : 'col-xs-2 col-sm-2 col-lg-2',
		template : Handlebars.compile($productImgTempl),
		render : function(){
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
			if(data.product!==undefined){
				var mcc = data.product.merchant.merchantCode.mcc;
				var mcId = data.product.merchant.mcId;
				var id	= data.product.id;
				var img = data.picName;
				var path = '/Talalah/content/'+mcc+'/'+mcId+'/'+id+'/'+img;
				this.$el.find('img').attr('src',path);
			}
			return this.$el;
		}
	});
	
	var ProductImgViews = Backbone.View.extend({
		render : function(){
			_.each(this.collection.models,function(item){
				var productImgView = new ProductImgView({model:item});
				this.$el.append(productImgView.render());
			},this);
			return this.$el;
		}
	});
	
	
	// product page
	
	var $theProductTemp = $(theProductTempl).html();
	var $productItemDetailTemp		= $(productComponentTempl).find('#item-detail').html();
	var $productTravelDetailTemp	= $(productComponentTempl).find('#travel-detail').html();
	var $productRelatedTemp			= $(productComponentTempl).find('#relatedPrd').html();
	var $shippingProviderTemp		= $(productComponentTempl).find('#shippingProvider').html();
	
	var TheProductView = Backbone.View.extend({
		initialize : function(){
			this.countItem = 0;
			this.countComment = 0;
			_.bindAll(this, "render");
		    this.model.bind('change', this.render);
		},
		className : 'container',
		template : Handlebars.compile($theProductTemp),
		render : function(){
			var data	= this.model.toJSON();
			if(data.merchant!==undefined){
				var mcc 	= data.merchant.merchantCode.mcc;
				var mcId 	= data.merchant.mcId;
				var pId 	= data.id;
				var img 	= data.img;
				this.$el.html(this.template(data));
				this.$el.find('#mainImg').attr('src','/Talalah/content/'+mcc+"/"+mcId+"/"+pId+"/"+img);
				var that = this;
			    this.$el.find('#questionBox').on('shown.bs.modal', function () {
			    	that.$el.find('#questionText').focus();
				});
			}
			return this.$el;
		},
		events : {
			'click #moreItem' 		: 'doLoadMoreItem',
			'click #post' 			: 'doPostComment',
			'click #moreComment' 	: 'doLoadComment',
			'click #postQuestion'	: 'doPostQuestion'
		},
		doPostQuestion : function(e){
			event.doPostQuestion(this);
		},
		doLoadMoreItem : function(e){
			e.preventDefault();
			event.doLoadMore(++this.countItem, this, ProductRelatedViews);
		},
		doPostComment : function(e){
			e.preventDefault();
			event.doPostComment(this,CommentViews);
		},
		doLoadComment : function(e){
			e.preventDefault();
			event.doLoadComment(++this.countComment,this,View.CommentViews);
		}
	});
	
	// product detail
	var ProductItemDetailView = Backbone.View.extend({
		initialize : function(){
			this.itemShippingProvider = undefined;
		},
		template : Handlebars.compile($productItemDetailTemp),
		render : function(){
			return this.$el.html(this.template(this.model.toJSON()));
		},
		events : {
			'click #addCart' : 'doAddCart',
			'click #buyNow'	 : 'doBuyNow',
			'change [name=spvd]:radio':'getTotal'
		},
		doAddCart : function(e){
			e.preventDefault();
			event.itemProduct.addToCart(this);
		},
		doBuyNow : function(e){
			e.preventDefault();
			event.itemProduct.buyNow(this);
		},
		getTotal : function(e){
			e.preventDefault();
			event.itemProduct.getTotal(this);
		}
	});
	
	var ProductTravelDetailView = Backbone.View.extend({
		initialize : function(){
			this.itemShippingProvider = undefined;
		},
		template : Handlebars.compile($productTravelDetailTemp),
		render:function(){
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
			this.$el.find('#start').datetimepicker({
				defaultDate : new Date(data.start),
				useCurrent:false,
				format: 'YYYY-MM-DD',
				minDate : new Date(data.start),
				maxDate : new Date(data.end)
			});
			
			this.$el.find('#end').datetimepicker({
				defaultDate : new Date(data.end),
	            useCurrent: false,
	            format:'YYYY-MM-DD',
	            minDate : new Date(data.start),
	            maxDate : new Date(data.end)
	        });
			var that = this;
			this.$el.find("#start").on("dp.change", function (e) {
				that.$el.find('#end').data("DateTimePicker").minDate(e.date);
	        });
			this.$el.find("#end").on("dp.change", function (e) {
				that.$el.find('#start').data("DateTimePicker").maxDate(e.date);
	        });
			return this.$el;
		},
		events : {
			'blur #endVal':'countDays',
			'blur #startVal' :'countDays',
			'click #check':'doCheck',
			'click #addCart' : 'doAddCart',
			'click #buyNow' : 'doBuyNow'
		},
		countDays : function(e){
			e.preventDefault();
			event.travelProduct.countDays(this);
		},
		doCheck : function(e){
			e.preventDefault();
			event.travelProduct.doCheck(this);
		},
		doAddCart : function(e){
			e.preventDefault();
			event.travelProduct.doAddCart(this);
		},
		doBuyNow : function(e){
			e.preventDefault();
			event.travelProduct.doBuyNow(this);
		}
	});
	
	var ActivitiesGrid = function(id){
		var columnNames = [{name:"id", label:"ID", editable:false, cell:"string"},
		                   {name:"name", label:"Name", editable:false, cell:"string"},
		                   {name:"activityCategory.name", label:"Category", editable:false, cell:"string"}];
		var activities = new Model.Activities();
		activities.url = talalah.com.client.app.entity.product.travel.activity.get+"/product?prdId="+id+"&first=0&max=100";
		var dataGrid = new Backgrid.Grid({
			columns : columnNames,
			collection : activities
		});
		
		activities.fetch({reset:true});
		
		return {render : dataGrid.render().$el};
		
	}
	
	var DestinationGrid = function(id){
		var columnNames = [{name:"id", label:"ID", editable:false, cell:"string"},
		                   {name:"name", label:"Name", editable:false, cell:"string"}];
		var destinations = new Model.Destinations();
		destinations.url = talalah.com.client.app.entity.product.travel.destination.get+"/product?prdId="+id+"&first=0&max=10";
		var dataGrid = new Backgrid.Grid({
			columns : columnNames,
			collection : destinations
		});
		destinations.fetch({reset:true});
		return {render:dataGrid.render().$el};
	}
	
	// shipping profivder data table
	
	var ShippingProviderView = Backbone.View.extend({
		template : Handlebars.compile($shippingProviderTemp),
		render : function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this.$el;
		}
	});
	
	var ShippingProviderViews = Backbone.View.extend({
		render : function(){
			var count = 0;
			_.each(this.collection.models, function(item){
				var shippingProviderView = new ShippingProviderView({model:item});
				var $ele = shippingProviderView.render();
				if(count===0)
					$ele.find('input[type=radio]').attr('checked','checked');
				count++;
				this.$el.append($ele);
			},this);
			return this.$el;
		}
	});
	
	// related product views
	
	var ProductRelatedView = Backbone.View.extend({
		className:'col-xs-2 col-sm-2 col-lg-2',
		template : Handlebars.compile($productRelatedTemp),
		render:function(){
			var data	= this.model.toJSON();
			var mcc 	= data.merchant.merchantCode.mcc;
			var mcId 	= data.merchant.mcId;
			var pId 	= data.id;
			var img 	= data.img;
			this.$el.html(this.template(data));
			this.$el.find('img').attr('src','/Talalah/content/'+mcc+"/"+mcId+"/"+pId+"/"+img);
			return this.$el;
		}
	});
	
	var ProductRelatedViews = Backbone.View.extend({
		render:function(){
			_.each(this.collection.models, function(item){
				var productRelatedView = new ProductRelatedView({model:item});
				this.$el.append(productRelatedView.render());
			}, this);
			return this.$el;
		}
	});
	
	// product merchant
	var $productMechantTempl = $(productComponentTempl).find('#merchantProducts').html();
	var $productMechantCodeTempl = $(productComponentTempl).find('#merchantCodeProducts').html();
	
	var ProductMerchantView = Backbone.View.extend({
		initialize : function(){
			this.page = 1;
			_.bindAll(this,"render");
			this.model.bind('change',this.render);
		},
		className : 'container',
		template : Handlebars.compile($productMechantTempl),
		render : function(){
			var data = this.model.toJSON();
			return this.$el.html(this.template(data));
		},
		events : {
			'click #loadmore' : 'doLoadMore'
		},
		doLoadMore : function(e){
			e.preventDefault();
			event.productMerchant.doLoadMore(this.page,this,ProductViews);
			this.page++;
		}
	});
	
	// product merchant code
	
	var ProductMerchantCodeView = Backbone.View.extend({
		initialize : function(){
			this.page = 1;
			_.bindAll(this,"render");
			this.model.bind('change',this.render);
		},
		className : 'container',
		template : Handlebars.compile($productMechantCodeTempl),
		render : function(){
			var data = this.model.toJSON();
			return this.$el.html(this.template(data));
		},
		events : {
			'click #loadmore' : 'doLoadMore'
		},
		doLoadMore : function(e){
			e.preventDefault();
			event.productMerchantCode.doLoadMore(this.page,this,ProductViews);
			this.page++;
		}
	});
	
	var ProductSearchView	= Backbone.View.extend({
		initialize : function(){
			this.page = 1;
		},
		className : 'container',
		template : Handlebars.compile($productSearchTempl),
		render : function(){
			var data = this.model.toJSON();
			return this.$el.html(this.template(data));
		},
		events : {
			'click #loadmore' : 'doLoadMore'
		},
		doLoadMore : function(e){
			e.preventDefault();
			event.doSearchMore(this.page,this,ProductViews);
			this.page++;
		}
	});
	
	return {
		ProductView 			: ProductView,
		ProductViews 			: ProductViews,
		ProductImgView 			: ProductImgView,
		ProductImgViews 		: ProductImgViews,
		ProductRelatedViews		: ProductRelatedViews,
		TheProductView 			: TheProductView,
		ProductItemDetailView  	: ProductItemDetailView,
		ProductTravelDetailView : ProductTravelDetailView,
		ActivitiesGrid  		: ActivitiesGrid,
		DestinationGrid 		: DestinationGrid,
		ShippingProviderView 	: ShippingProviderView,
		ShippingProviderViews 	: ShippingProviderViews,
		ProductMerchantView		: ProductMerchantView,
		ProductMerchantCodeView : ProductMerchantCodeView,
		ProductSearchView		: ProductSearchView
	}
	
});