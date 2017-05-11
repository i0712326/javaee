/**
 * 
 */
define(function(require,exports,module){
	var $		 = require('jquery');
	var Backbone = require('backbone');
	var Handlebars		=	require('handlebars');
	var event			= 	require('product.event');
	var datetimepicker 	=	require('datetimepicker');
	
	var	productTemp					= require('text!productTemp');
	var $productMainTempl			= $(productTemp).find('#product-main-page').html();
	var $pageLocationTemp			= $(productTemp).find('#product-breadcrumb').html();
	var $pageLocationAddTempl		= $(productTemp).find('#product-add-breadcrumb').html();
	var $productPageTemp			= $(productTemp).find('#productPage').html();
	var $productTempl				= $(productTemp).find('#productTemp').html();
	var $productImgTemp	 			= $(productTemp).find('#product-main-img').html();
	var $productRelatedTemp			= $(productTemp).find("#productRelatedImg").html();
	var $productRelatedsTemp		= $(productTemp).find("#productRelatedImgs").html();
	var $productInfoTemp 			= $(productTemp).find('#product-info').html();
	var $itemFormTemp	 			= $(productTemp).find('#product-item').html();
	var $shippingProviderListTempl 	= $(productTemp).find('#shippingProviderList').html();
	var	$itemShippingProviderTempl	= $(productTemp).find('#itemShippingProviderList').html();
	var $travelFormTemp	 			= $(productTemp).find('#product-travel').html();
	var $activitiesTemp	 			= $(productTemp).find('#activities').html();
	var $destinationTemp 			= $(productTemp).find('#destinations').html();
	
	var $destinationEditTemp	= $(productTemp).find('#destinationEditTemp').html();
	var $activityEditTemp		= $(productTemp).find('#activityEditTemp').html();
	var $destinationPanelTemp 	= $(productTemp).find('#destination-panel-temp').html();
	var $activityPanelTemp		= $(productTemp).find('#activity-panel-temp').html();
	
	var $shippingProviderTempl	= $(productTemp).find('#shippingProviders').html();
	var $productShortDetailTemp	= $(productTemp).find('#short-describe').html();
	var $productLongDetailTemp 	= $(productTemp).find('#long-describe').html();
	
	var ProductMainView	= Backbone.View.extend({
		initialize : function(){
			this.page = 1;
		},
		className : 'container',
		template : Handlebars.compile($productMainTempl),
		render : function(){
			if($.isEmptyObject(this.model)===false){
				this.$el.html(this.template(this.model.toJSON()));
			}
			else{
				this.$el.html($productMainTempl);
			}
			return this.$el;
		},
		events : {
			'click #search'		: 'doSearchProduct',
			'click #add'		: 'doAddProduct',
			'click #loadmore' 	: 'doLoadMore'
		},
		doSearchProduct : function(e){
			e.preventDefault();
			event.doSearchProduct(this,ProductViews);
		},
		doAddProduct : function(e){
			e.preventDefault();
			this.$el.find('#addPage').click();
		},
		doLoadMore : function(e){
			e.preventDefault();
			event.doLoadMore(this.page,8,this,ProductViews);
			this.page++;
		}
	});
	
	var ProductLocationView = Backbone.View.extend({
		template : Handlebars.compile($pageLocationTemp),
		render : function(){
			return this.$el.html(this.template(this.model.toJSON()));
		}
	});
	
	var ProductLocationAddView = Backbone.View.extend({
		template : Handlebars.compile($pageLocationAddTempl),
		render : function(){
			return this.$el.html(this.template(this.model.toJSON()));
		}
	});
	
	var ProductPageView = Backbone.View.extend({
		className	:	'container',
		render		:	function(){
			this.$el.html($productPageTemp);
			return this.$el;
		}
	});
	
	var ProductView = Backbone.View.extend({
		className : 'col-xs-3 col-sm-3 col-lg-3',
		template : Handlebars.compile($productTempl),
		render : function(){
			var data = this.model.toJSON();
			var mcc = data.merchant.merchantCode.mcc;
			var mcId = data.merchant.mcId;
			var id	= data.id;
			this.$el.html(this.template(data));
			this.$el.find('img').attr('src','/Talalah/content/'+mcc+"/"+mcId+"/"+id+"/default.png");
			return this.$el;
		},
		events : {
			'click #confirm':'doDelete'
		},
		doDelete : function(e){
			e.preventDefault();
			this.$el.find('#deletePanel').modal('toggle');
			event.doDelete(this);
		}
	});
	
	var ProductViews = Backbone.View.extend({
		render : function(){
			_.each(this.collection.models,function(item){
				var productView = new ProductView({model:item});
				this.$el.append(productView.render());
			},this);
			return this.$el;
		}
	});
	
	
	var ProductImgView = Backbone.View.extend({
		render		:	function(){
			this.$el.html($productImgTemp);
			var data = this.model.toJSON();
			var mcId	= data.merchant.mcId;
			if($.isEmptyObject(data.merchant.merchantCode)===false){
				var mcc 	= data.merchant.merchantCode.mcc;
				var pId		= data.id;
				var img		= "default.png";
				this.$el.find('#productImg').attr('src','/Talalah/content/'+mcc+'/'+mcId+'/'+pId+'/'+img);
			}
			else{
				this.$el.find('#productImg').attr('src','/Talalah/content/util/img/default.png');
			}
			return this.$el;
		},
		events : {
			'click #upload': 'doUpload'
		},
		doUpload : function(e){
			e.preventDefault();
			event.doUploadImg(this);
		}
	});
	
	var ProductInfoView = Backbone.View.extend({
		template : Handlebars.compile($productInfoTemp),
		render : function(){
			if($.isEmptyObject(this.model)===false)
				this.$el.html(this.template(this.model.toJSON()));
			else
				this.$el.html(this.template({}));
			return this.$el;
		},
		events : {
			'click #edit' : 'doEdit',
			'click #ok'	  : 'doUpdateInfo',
			'click #save' : 'doSaveInfo'
		},
		doEdit : function(e){
			e.preventDefault();
			event.doEdit(this);
		},
		doUpdateInfo : function(e){
			e.preventDefault();
			event.doUpdateInfo(this);
		},
		doSaveInfo : function(e){
			e.preventDefault();
			event.doSaveProduct(this);
		}
	});
	
	var ItemFormView	= Backbone.View.extend({
		template 	: 	Handlebars.compile($itemFormTemp),
		render		:	function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this.$el;
		},
		events : {
			'click #edit1'  : 'doEdit',
			'click #ok1'	: 'doUpdateDetail'
		},
		doEdit	:	function(e){
			e.preventDefault();
			event.doEditItem(this);
		},
		doUpdateDetail : function(e){
			e.preventDefault();
			event.doUpdateItem(this);
		}
	});
	
	var ShippingProviderView = Backbone.View.extend({
		className 	: 'col-xs-12 col-sm-12 col-lg-12',
		template	: Handlebars.compile($shippingProviderTempl),
		render		:	function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this.$el;
		}
	});
	
	var ShippingProviderViews = Backbone.View.extend({
		render : function(){
			this.$el.html($shippingProviderListTempl);
			if($.isEmptyObject(this.collection)===false){
				_.each(this.collection.models,function(item){
					var shippingProviderView = new ShippingProviderView({model:item});
					this.$el.find('#shippingProvider-list').append(shippingProviderView.render());
				},this);
			}
			return this.$el;
		},
		events : {
			'click #edit' : 'doEdit',
			'click #ok'	  : 'doUpdateShipper'
		},
		doEdit : function(e){
			e.preventDefault();
			event.doEditShipper(this, ShippingProviderEditViews);
		},
		doUpdateShipper : function(e){
			e.preventDefault();
			event.doUpdateShipper(this);
		}
	});
	
	var ShippingProviderEditView = Backbone.View.extend({
		className : 'col-xs-12 col-sm-12 col-lg-12 space ele',
		template : Handlebars.compile($itemShippingProviderTempl),
		render : function(list){
			var shippingProviders = _.pluck(list,'shippingProvider');
			var ids = _.pluck(shippingProviders,'id');
			var data = this.model.toJSON();
			
			var id = data.id;
			var check = _.contains(ids,id);
			if(check===true){
				var ite = _.find(list, function(obj){ return obj.shippingProvider.id === id; });
				var price = ite.price;
				var pId	  = ite.item.id;
				var min = ite.min;
				var max = ite.max;
				var name = data.name;
				this.$el.html(this.template({pId:pId, id:id,name:name,price:price,max:max,min:min}));
				this.$el.find('input[type=checkbox]').attr('checked','checked');
			}
			else{
				this.$el.html(this.template(data));
			}
			return this.$el;
		}
	});
	
	var ShippingProviderEditViews = Backbone.View.extend({
		render : function(arrays){
			_.each(this.collection.models,function(model){
				var shippingProviderEditView = new ShippingProviderEditView({model:model});
				this.$el.append(shippingProviderEditView.render(arrays));
			},this);
			return this.$el;
		}
	});
	
	var TravelFormView = Backbone.View.extend({
		template	:	Handlebars.compile($travelFormTemp),
		render		:	function(){
			if($.isEmptyObject(this.model)===false){
				var data = this.model.toJSON();
				this.$el.html(this.template(data));
				this.$el.find('#start').datetimepicker({
					format: 'YYYY-MM-DD'
				});
				
				this.$el.find('#end').datetimepicker({
		            format:'YYYY-MM-DD'
		        });
				
				var that = this;
				this.$el.find("#start").on("dp.change", function (e) {
					that.$el.find('#end').data("DateTimePicker").minDate(e.date);
		        });
				this.$el.find("#end").on("dp.change", function (e) {
					that.$el.find('#start').data("DateTimePicker").maxDate(e.date);
		        });
			}
			else{
				this.$el.html(this.template({}));
			}
			return this.$el;
		},
		events : {
			'blur input[name=start]':'countDays',
			'blur input[name=end]' :'countDays',
			'click #edit1' : 'doEdit',
			'click #ok1'	  :	'doUpdateDetail'
		},
		doEdit : function(e){
			e.preventDefault();
			event.doEditDetail(this);
		},
		doUpdateDetail : function(e){
			e.preventDefault();
			event.doUpdateDetail(this);
		},
		countDays : function(e){
			e.preventDefault();
			var start 	= this.$el.find('input[name=start]').val().trim();
			var end		= this.$el.find('input[name=end]').val().trim();
			if(start!=''&end!=''){
				var date1 = new Date(start), date2 = new Date(end);
				var time1 = date1.getTime(), time2 = date2.getTime();
				var diff = 1;
				if(time2 >= time1){
					diff = diff + Math.ceil(Math.abs(time2-time1)/(1000*3600*24));
				}
				this.$el.find('input[name=days]').val(diff);
			}
		},
	});
	
	var DestinationPanelView = Backbone.View.extend({
		render : function(){
			this.$el.html($destinationPanelTemp);
			return this.$el;
		},
		events : {
			'click #edit': 'doEditDest',
			'click #ok' : 'doUpdateDest'
		},
		doEditDest : function(e){
			e.preventDefault();
			event.doEditDest(this, DestinationEditViews);
		},
		doUpdateDest : function(e){
			e.preventDefault();
			event.doUpdateDest(this);
		}
	});
	
	var DestinationEditView = Backbone.View.extend({
		className : 'col-xs-12 col-sm-12 col-lg-12',
		template : Handlebars.compile($destinationEditTemp),
		render : function(arrays){
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
			var id = data.id;
			var check = _.contains(arrays,id);
			if(check===true)
				this.$el.find('input[type=checkbox]').attr('checked','checked');
			return this.$el;
		}
	});
	
	var DestinationEditViews = Backbone.View.extend({
		render : function(arrays){
			_.each(this.collection.models, function(item){
				var destinationEditView = new DestinationEditView({model:item});
				this.$el.append(destinationEditView.render(arrays));
			},this);
			return this.$el;
		}
	});
	
	var ActivityPanelView = Backbone.View.extend({
		render : function(){
			this.$el.html($activityPanelTemp);
			return this.$el;
		},
		events : {
			'click #edit': 'doEditAct',
			'click #ok' : 'doUpdateAct'
		},
		doEditAct : function(e){
			e.preventDefault();
			event.doEditActivities(this, ActivityEditViews);
		},
		doUpdateAct : function(e){
			e.preventDefault();
			event.doUpdateActivities(this);
		}
	});
	
	var ActivityEditView = Backbone.View.extend({
		className : 'col-xs-12 col-sm-12 col-lg-12',
		template : Handlebars.compile($activityEditTemp),
		render : function(arrays){
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
			var id = data.id;
			var check = _.contains(arrays,id);
			if(check===true)
				this.$el.find('input[type=checkbox]').attr('checked','checked');
			return this.$el;
		}
	});
	
	var ActivityEditViews = Backbone.View.extend({
		render : function(arrays){
			_.each(this.collection.models,function(item){
				var activityEditView = new ActivityEditView({model:item});
				this.$el.append(activityEditView.render(arrays));
			},this);
			return this.$el;
		}
	}); 
	
	var ProductRelatedImg	= Backbone.View.extend({
		className	:	'col-xs-2 col-sm-2 col-lg-2',
		render		:	function(){
			this.$el.html($productRelatedTemp);
			if($.isEmptyObject(this.model)===false){
				var data = this.model.toJSON();
				if($.isEmptyObject(data)===false){
				var mcc 	= data.product.merchant.merchantCode.mcc;
				var mcId	= data.product.merchant.mcId;
				var pId		= data.product.id;
				var name	= data.picName;
				this.$el.find('#img').attr('src','/Talalah/content/'+mcc+'/'+mcId+'/'+pId+'/'+name);
				}
			}
			else{
				this.$el.find('#img').attr('src','/Talalah/content/util/img/default.png');
			}
			return this.$el;
		},
		events : {
			'click button' : 'doUpload'
		},
		doUpload : function(e){
			e.preventDefault();
			event.uploadRelateImg(this);
		}
	});
	
	var ProductRelatedImgs	= Backbone.View.extend({
		className	: 'col-xs-12 col-sm-12 col-lg-12',
		render		:	function(){
			this.$el.html($productRelatedsTemp);
			if($.isEmptyObject(this.collection)===false){
				_.each(this.collection.models, function(item){
					var productRelatedImg = new ProductRelatedImg({model:item});
					this.$el.find('#imgs').append(productRelatedImg.render());
				},this);
			}
			return this.$el;
		},
		events : {
			'click #edit':'doEdit'
		},
		doEdit : function(e){
			e.preventDefault();
			this.$el.find('button').removeAttr('disabled');
		}
	});
	
	var ProductShortDetailView	= Backbone.View.extend({
		className	: 'col-xs-12 col-sm-12 col-lg-12',
		template	: Handlebars.compile($productShortDetailTemp),
		render		: function(){
			if($.isEmptyObject(this.model)===false){
				var data = this.model.toJSON();
				this.$el.html(this.template(data));
			}
			else{
				this.$el.html($productShortDetailTemp);
			}
			return this.$el;
		},
		events : {
			'click #edit' : 'doEdit',
			'click #ok' : 'doUpdateShDes'
		},
		doEdit : function(e){
			e.preventDefault();
			event.doEditShDes(this);
		},
		doUpdateShDes : function(e){
			e.preventDefault();
			event.doUpdateShDes(this);
		}
	});
	
	var ProductLongDetailView	= Backbone.View.extend({
		className	: 'col-xs-12 col-sm-12 col-lg-12',
		template	: Handlebars.compile($productLongDetailTemp),
		render		: function(){
			if($.isEmptyObject(this.model)===false){
				var data = this.model.toJSON();
				this.$el.html(this.template(data));
			}
			else{
				this.$el.html($productShortDetailTemp);
			}
			return this.$el;
		},
		events : {
			'click #edit':'doEdit',
			'click #ok'	 :'doUpdate'
		},
		doEdit : function(e){
			e.preventDefault();
			this.$el.find('textarea').removeAttr('disabled');
			this.$el.find('#edit').hide();
			this.$el.find('#ok').show();
		},
		doUpdate : function(e){
			e.preventDefault();
			event.doUpdateLongDes(this);
		}
	});
	
	var DestinationView = Backbone.View.extend({
		initialize	: function(){
			_.bindAll(this, "render");
		    this.model.bind('change', this.render);
		},
		className : 'col-xs-12 col-sm-12 col-lg-12',
		template  : Handlebars.compile($destinationTemp),
		render : function(){
			if($.isEmptyObject(this.model)===false)
				this.$el.html(this.template(this.model.toJSON()));
			else
				this.$el.html($destinationTemp);
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
		initialize	: function(){
			_.bindAll(this, "render");
		    this.model.bind('change', this.render);
		},
		className : 'col-xs-12 col-sm-12 col-lg-12',
		template  : Handlebars.compile($activitiesTemp),
		render : function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this.$el;
		}
	});
	
	var ActivityViews = Backbone.View.extend({
		render : function(){
			_.each(this.collection.models, function(item){
				var activityView = new ActivityView({model:item});
				this.$el.append(activityView.render());
			},this);
			
			return this.$el;
		}
	});
	
	var endPoint = {
			ProductMainView			: ProductMainView,
			ProductLocationView		: ProductLocationView,
			ProductLocationAddView	: ProductLocationAddView,
			ProductPageView 		: ProductPageView,
			ProductView				: ProductView,
			ProductViews			: ProductViews,
			ProductImgView			: ProductImgView,
			ProductInfoView			: ProductInfoView,
			ItemFormView			: ItemFormView,
			ShippingProviderView	: ShippingProviderView,
			ShippingProviderViews	: ShippingProviderViews,
			ShippingProviderEditView	: ShippingProviderEditView,
			ShippingProviderEditViews 	: ShippingProviderEditViews,
			TravelFormView			: TravelFormView,
			DestinationPanelView	: DestinationPanelView,
			ActivityPanelView		: ActivityPanelView,
			ProductRelatedImg		: ProductRelatedImg,
			ProductRelatedImgs		: ProductRelatedImgs,
			ProductShortDetailView	: ProductShortDetailView,
			ProductLongDetailView	: ProductLongDetailView,
			DestinationView			: DestinationView,
			DestinationViews		: DestinationViews,
			ActivityView			: ActivityView,
			ActivityViews			: ActivityViews,
			DestinationEditView		: DestinationEditView,
			DestinationEditViews	: DestinationEditViews,
			ActivityEditView		: ActivityEditView,
			ActivityEditViews		: ActivityEditViews
	};
	
	return endPoint;
});