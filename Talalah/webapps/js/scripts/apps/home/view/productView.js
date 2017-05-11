/**
 * 
 */
define(function(require,exports,module){
	
	var $ 			= require('jquery'),
		_ 			= require('underscore'),
		Backbone 	= require('backbone'),
		Handlebars 	= require('handlebars'),
		Backgrid	= require('backgrid'),
		init		= require('init'),
		Model		= require('model'),
		bootstrap	= require('bootstrap'),
		bootstrapdatepicker	= require('bootstrapdatepicker');
	
	var ProductTemp 			= require('text!productTemp'),
		TheProductTemp			= require('text!theProductTemp'),
		ProductComponentTemp 	= require('text!productComponentTemp');
	
	var productController		= require('product.controller');
		
	// web service URL
	var talalah = init.init();
	var contentUser		= talalah.com.client.app.page.content.user;
	var contentMerchant = talalah.com.client.app.page.content.merchant;
	var contentUtil		= talalah.com.client.app.page.content.util;
	// product main page
	var $travelPageTemp	 		= $(ProductTemp).find('#travelPage').html();
	var $travelPageByDestTemp 	= $(ProductTemp).find('#travelPageByDestTemp').html();
	var $itemPageTemp	 		= $(ProductTemp).find('#itemPage').html();
	
	var $travelMainTemp1 = $(ProductComponentTemp).find('#travelMainTemp1').html();
	var $travelMainTemp2 = $(ProductComponentTemp).find('#travelMainTemp2').html();
	
	var $itemMainTemp1	= $(ProductComponentTemp).find('#itemMainTemp1').html();
	var $itemMainTemp2	= $(ProductComponentTemp).find('#itemMainTemp2').html();
	
	var $productSubTemp  = $(ProductComponentTemp).find('#productSubTemp').html();
	
	// product detail page
	var $productTemp	 			= $(TheProductTemp).html();
	var $productItemDetailTemp		= $(ProductComponentTemp).find('#item-detail').html();
	var $productTravelDetailTemp	= $(ProductComponentTemp).find('#travel-detail').html();
	var $productImgsTemp			= $(ProductComponentTemp).find('#relatedImg').html();
	var $productRelatedTemp			= $(ProductComponentTemp).find('#relatedPrd').html();
	var $productCommentTemp			= $(ProductComponentTemp).find('#comment').html();
	var $shippingProviderTemp		= $(ProductComponentTemp).find('#shippingProvider').html();
	var $merchantProductTemp 		= $(ProductComponentTemp).find('#merchantProducts').html();
	var $merchantCodeProductTemp 	= $(ProductComponentTemp).find('#merchantCodeProducts').html();
	var	$productSearchTempl			= $(ProductComponentTemp).find('#productSearch').html();
	
	var TravelPageView = Backbone.View.extend({
		className : 'container',
		template : Handlebars.compile($travelPageTemp),
		render:function(){
			return this.$el.html(this.template(this.model.toJSON()));
		}
	});
	
	var TravelPageByDestView = Backbone.View.extend({
		className : 'container',
		template : Handlebars.compile($travelPageByDestTemp),
		render:function(id){
			var data = this.model.toJSON();
			data.id = id;
			return this.$el.html(this.template(data));
		}
	});
	
	var ItemPageView = Backbone.View.extend({
		className : 'container',
		template : Handlebars.compile($itemPageTemp),
		render:function(){
			return this.$el.html(this.template(this.model.toJSON()));
		}
	});
	
	var TravelMainView1 = Backbone.View.extend({
		className : 'col-xs-12 col-sm-12 col-lg-12 space',
		template : Handlebars.compile($travelMainTemp1),
		render : function(id){
			var data = this.model.toJSON();
			data.destinationId = id;
			var mcc 	= data.merchant.merchantCode.mcc;
			var mcId 	= data.merchant.mcId;
			var pId 	= data.id;
			var img 	= data.img;
			this.$el.html(this.template(data));
			this.$el.find('img').attr('src',contentUtil+'/img/travel/dest/'+id+'/'+id+'.png');
			var shDes = this.$el.find('.shDes');
			shDes.text(shDes.text().substring(0,800));
			return this.$el;
		}
	});
	
	var TravelMainView2 = Backbone.View.extend({
		className : 'col-xs-12 col-sm-12 col-lg-12 space',
		template : Handlebars.compile($travelMainTemp2),
		render : function(id){
			var data = this.model.toJSON();
			data.destinationId = id;
			var mcc 	= data.merchant.merchantCode.mcc;
			var mcId 	= data.merchant.mcId;
			var pId 	= data.id;
			var img 	= data.img;
			this.$el.html(this.template(data));
			this.$el.find('img').attr('src',contentUtil+'/img/travel/dest/'+id+'/'+id+'.png');
			var shDes = this.$el.find('.shDes');
			shDes.text(shDes.text().substring(0,800));
			return this.$el;
		}
	});
	
	var ItemMainView1	= Backbone.View.extend({
		className : 'col-lg-12 col-sm-12 col-xs-12 space',
		template : Handlebars.compile($itemMainTemp1),
		render : function(){
			var data = this.model.toJSON();
			var mcc 	= data.merchant.merchantCode.mcc;
			var mcId 	= data.merchant.mcId;
			var pId 	= data.id;
			var img 	= data.img;
			this.$el.html(this.template(data));
			this.$el.find('img').attr('src',contentMerchant+'/'+mcc+"/"+mcId+"/"+pId+"/"+img);
			var shDes = this.$el.find('.shDes');
			shDes.text(shDes.text().substring(0,800));
			return this.$el;
		}
	});
	
	var ItemMainView2	= Backbone.View.extend({
		className : 'col-lg-12 col-sm-12 col-xs-12 space',
		template : Handlebars.compile($itemMainTemp2),
		render : function(){
			var data = this.model.toJSON();
			var mcc 	= data.merchant.merchantCode.mcc;
			var mcId 	= data.merchant.mcId;
			var pId 	= data.id;
			var img 	= data.img;
			this.$el.html(this.template(data));
			this.$el.find('img').attr('src',contentMerchant+'/'+mcc+"/"+mcId+"/"+pId+"/"+img);
			var shDes = this.$el.find('.shDes');
			shDes.text(shDes.text().substring(0,800));
			return this.$el;
		}
	});
	
	var TravelMainViews = Backbone.View.extend({
		render:function(id, ind){
			_.each(this.collection.models, function(item){
				if(ind%2===0){
					var productMainView = new TravelMainView1({model:item});
					this.$el.append(productMainView.render(id));
				}
				else{
					var productMainView = new TravelMainView2({model:item});
					this.$el.append(productMainView.render(id));
				}
			}, this);
			return this.$el;
		}
	});
	
	var ItemMainViews = Backbone.View.extend({
		render:function(){
			var ind = 0;
			_.each(this.collection.models, function(item){
				if(ind%2===0){
					var productMainView = new ItemMainView1({model:item});
					this.$el.append(productMainView.render());
				}
				else{
					var productMainView = new ItemMainView2({model:item});
					this.$el.append(productMainView.render());
				}
				ind++;
			}, this);
			return this.$el;
		}
	});
	
	var ProductSubView = Backbone.View.extend({
		className:'col-xs-3 col-sm-3 col-lg-3',
		template:Handlebars.compile($productSubTemp),
		render:function(){
			var data	= this.model.toJSON();
			var mcc 	= data.merchant.merchantCode.mcc;
			var mcId 	= data.merchant.mcId;
			var pId 	= data.id;
			var img 	= data.img;
			this.$el.html(this.template(data));
			this.$el.find('img').attr('src',merchantMerchant+'/'+mcc+"/"+mcId+"/"+pId+"/"+img);
			return this.$el;
		}
	});
	
	var ProductSubViews = Backbone.View.extend({
		render : function(){
			_.each(this.collection.models, function(item){
				var productSubView = new ProductSubView({model:item});
				this.$el.append(productSubView.render());
			}, this);
			return this.$el;
		}
	});
	
	// Product Detail
	
	var TheProductView = Backbone.View.extend({
		initialize : function(){
			this.countItem = 0;
			this.countComment = 0;
			_.bindAll(this, "render");
		    this.model.bind('change', this.render);
		},
		className : 'container',
		template : Handlebars.compile($productTemp),
		render : function(){
			var data	= this.model.toJSON();
			var mcc 	= data.merchant.merchantCode.mcc;
			var mcId 	= data.merchant.mcId;
			var pId 	= data.id;
			var img 	= data.img;
			this.$el.html(this.template(data));
			this.$el.find('#mainImg').attr('src',contentMerchant+'/'+mcc+"/"+mcId+"/"+pId+"/"+img);
			var that = this;
		    this.$el.find('#questionBox').on('shown.bs.modal', function () {
		    	that.$el.find('#questionText').focus();
			});
			return this.$el;
		},
		events : {
			'click #moreItem' 		: 'doLoadMoreItem',
			'click #post' 			: 'doPostComment',
			'click #moreComment' 	: 'doLoadComment',
			'click #postQuestion'	: 'doPostQuestion'
		},
		doPostQuestion : function(e){
			productController.doPostQuestion(this);
		},
		doLoadMoreItem : function(e){
			e.preventDefault();
			productController.doLoadMore(++this.countItem, this, ProductRelatedViews);
		},
		doPostComment : function(e){
			e.preventDefault();
			productController.doPostComment(this,CommentViews);
		},
		doLoadComment : function(e){
			e.preventDefault();
			productController.doLoadComment(++this.countComment,this,CommentViews);
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
			productController.itemProduct.addToCart(this);
		},
		doBuyNow : function(e){
			e.preventDefault();
			productController.itemProduct.buyNow(this);
		},
		getTotal : function(e){
			e.preventDefault();
			productController.itemProduct.getTotal(this);
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
			productController.travelProduct.countDays(this);
		},
		doCheck : function(e){
			e.preventDefault();
			productController.travelProduct.doCheck(this);
		},
		doAddCart : function(e){
			e.preventDefault();
			productController.travelProduct.doAddCart(this);
		},
		doBuyNow : function(e){
			e.preventDefault();
			productController.travelProduct.doBuyNow(this);
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
	
	var ProductImgView = Backbone.View.extend({
		className:'col-xs-2 col-sm-2 col-lg-2',
		template : Handlebars.compile($productImgsTemp),
		render : function(){
			var data	= this.model.toJSON();
			var mcc 	= data.product.merchant.merchantCode.mcc;
			var mcId 	= data.product.merchant.mcId;
			var pId 	= data.product.id;
			var img 	= data.picName;
			this.$el.html(this.template(data));
			this.$el.find('img').attr('src',contentMerchant+'/'+mcc+"/"+mcId+"/"+pId+"/"+pId+"/"+img);
			return this.$el;
		}
	});
	
	var ProductImgViews = Backbone.View.extend({
		render : function(){
			_.each(this.collection.models, function(item){
				var productImgView = new ProductImgView({model:item});
				this.$el.append(productImgView.render());
			}, this);
			return this.$el;
		}
	});
	
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
			this.$el.find('img').attr('src',contentMerchant+'/'+mcc+"/"+mcId+"/"+pId+"/"+img);
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
	
	var CommentView = Backbone.View.extend({
		className:'media comment',
		template:Handlebars.compile($productCommentTemp),
		render:function(){
			var data = this.model.toJSON();
			var id = data.customer.id;
			var img	= data.customer.img;
			this.$el.html(this.template(data));
			this.$el.find('img').attr('src',contentUser+'/'+id+"/"+img);
			return this.$el;
		}
	});
	
	var CommentViews = Backbone.View.extend({
		render:function(){
			_.each(this.collection.models, function(item){
				var commentView = new CommentView({model:item});
				this.$el.append(commentView.render());
			},this);
			return this.$el;
		}
	});
	
	var ProductView = Backbone.View.extend({
		className : 'col-xs-3 col-sm-3 col-lg-3',
		template : Handlebars.compile($productRelatedTemp),
		render : function(){
			var data	= this.model.toJSON();
			var mcc 	= data.merchant.merchantCode.mcc;
			var mcId 	= data.merchant.mcId;
			var pId 	= data.id;
			var img 	= data.img;
			this.$el.html(this.template(data));
			this.$el.find('img').attr('src',contentMerchant+'/'+mcc+"/"+mcId+"/"+pId+"/"+img);
			return this.$el;
		}
	});
	
	var ProductViews = Backbone.View.extend({
		render : function(){
			_.each(this.collection.models, function(item){
				var prdView = new ProductView({model:item});
				this.$el.append(prdView.render());
			},this);
			return this.$el;
		}
	});
	

	var ProductMerchantView = Backbone.View.extend({
		initialize : function(){
			this.page = 0;
			_.bindAll(this, "render");
		    this.model.bind('change', this.render);
		},
		className : 'container',
		template : Handlebars.compile($merchantProductTemp),
		render : function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this.$el;
		},
		events : {
			'click #loadmore' : 'doLoadMore'
		},
		doLoadMore : function(e){
			e.preventDefault();
			productController.productMerchant.doLoadMore(this,ProductViews);
		}
	});
	
	var ProductMerchantCodeView = Backbone.View.extend({
		initialize : function(){
			this.page = 1;
			this.pageTvl = 1;
			_.bindAll(this, "render");
		    this.model.bind('change', this.render);
		},
		className : 'container',
		template : Handlebars.compile($merchantCodeProductTemp),
		render : function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this.$el;
		},
		events : {
			'click #loadmore' 		: 'doLoadMore',
			'click #tvlSearch' 		: 'doTvlSearch',
			'click #searchmore' 	: 'doTvlSearch',
			'click #tvlSearchBtn'	: 'doAdvTvlSearch',
			'click #iteSearch' 		: 'doIteSearch'
		},
		doLoadMore : function(e){
			e.preventDefault();
			productController.productMerchantCode.doLoadMore(this,ProductViews);
			this.page++;
		},
		doTvlSearch : function(e){
			e.preventDefault();
			productController.productMerchantCode.searchTravel(this, ProductViews);
		},
		doAdvTvlSearch : function(e){
			e.preventDefault();
			productController.productMerchantCode.searchAdvTravel(this, ProductViews);
		},
		doIteSearch : function(e){
			e.preventDefault();
			alert('click do item search');
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
			productController.productSearch.doSearchMore(this.page,this,ProductViews);
			this.page++;
		}
	});
	
	return {
		TravelPageView	: TravelPageView,
		TravelPageByDestView : TravelPageByDestView,
		ItemPageView	: ItemPageView,
		TravelMainView1	: TravelMainView1,
		TravelMainView2	: TravelMainView2,
		ItemMainView1	: ItemMainView1,
		ItemMainView2	: ItemMainView2,
		TravelMainViews	: TravelMainViews,
		ItemMainViews	: ItemMainViews,
		ProductSubView	: ProductSubView,
		ProductSubViews	: ProductSubViews,
		TheProductView	: TheProductView,
		ProductItemDetailView	: ProductItemDetailView,
		ProductTravelDetailView	: ProductTravelDetailView,
		ActivitiesGrid			: ActivitiesGrid,
		DestinationGrid			: DestinationGrid,
		ShippingProviderView	: ShippingProviderView,
		ShippingProviderViews	: ShippingProviderViews,
		ProductImgView			: ProductImgView,
		ProductImgViews			: ProductImgViews,
		ProductRelatedView		: ProductRelatedView,
		ProductRelatedViews		: ProductRelatedViews,
		CommentView				: CommentView,
		CommentViews			: CommentViews,
		ProductView				: ProductView,
		ProductViews			: ProductViews,
		ProductMerchantView		: ProductMerchantView,
		ProductMerchantCodeView	: ProductMerchantCodeView,
		ProductSearchView		: ProductSearchView
	}
	
});