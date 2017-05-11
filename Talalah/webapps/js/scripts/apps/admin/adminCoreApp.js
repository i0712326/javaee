/**
*
* Core Application for Administrator Page
*
****/

define(['jquery','underscore','backbone', 'handlebars','bootstrap','init',
        '../../apps/admin/merchantView.js',
        'text!/Talalah/template/admin/merchant/merchant.html',
        'text!/Talalah/template/admin/merchant/merchant-detail.html',
        'text!/Talalah/template/admin/merchant/merchant-add.html',
        'text!/Talalah/template/admin/merchant/merchant-box.html',
        'text!/Talalah/template/admin/merchant/productView.html',
        'text!/Talalah/template/admin/merchant/productView-detail.html',
        'text!/Talalah/template/admin/merchant/productView-item.html',
        'text!/Talalah/template/admin/merchant/productView-travel.html',
        'text!/Talalah/template/admin/merchant/productView-img.html',
       ],function($, _, Backbone, Handlebars, Bootstrap, init, merchantView, 
    		   merchantTemp, merchantDetail, merchantAdd, merchantBox, productViewTemp, 
    		   productViewDetail, productViewItem, productViewTravel, productViewImg){
	
	var talalah = init.init();
	var User = Backbone.Model.extend({
		defaults: {
			name : 'Administrator'
		}
	});
	
	var Merchant = Backbone.Model.extend({
		urlRoot:talalah.com.client.app.entity.merchant.merchant.get
	});
	var Product	= Backbone.Model.extend({
		urlRoot:talalah.com.client.app.entity.product.product.get
	});
	var ProductImg = Backbone.Model.extend({
		urlRoot : talalah.com.client.app.entity.product.productImg.get
	});
	var Activity = Backbone.Model.extend({
		
	});
	
	var Merchants = Backbone.Collection.extend({
		model:Merchant
	});
	var Products = Backbone.Collection.extend({
		model:Product
	});
	var Activities = Backbone.Collection.extend({
		model:Activity
	});
	var ProductImgs = Backbone.Collection.extend({
		model:ProductImg
	});
	
	var MerchantMainView = Backbone.View.extend({
		template : Handlebars.compile($(merchantTemp).html()),
		render : function(){
			return this.$el.html(this.template(this.model.toJSON()));
		},
		events:{
			'click #search':'doSearch',
			'keyup #search-val':'doChange',
			'click #add':'doAdd'
		},
		doSearch:function(){
			var q = $('#search-val').val().trim();
			var merchants = new Merchants();
			merchants.url = talalah.com.client.app.entity.merchant.merchant.get+"?name=%25"+q+"%25&mcId=%25&first=0&max=100";
			$('#merchant-list').empty();
			merchants.fetch({
				success:function(items, response, status){
					var merchantBoxViews = new MerchantBoxViews({collection:items});
					$('#merchant-list').append(merchantBoxViews.render());
				}
			});
		},
		doChange:function(){
			var mcId = this.model.toJSON().mcId;
			var q = $('#search-val').val().trim();
			var merchants = new Merchants();
			merchants.url = talalah.com.client.app.entity.merchant.merchant.get+"/?name=%25"+q+"%25&mcId=%25&first=0&max=100";
			merchants.fetch({
				success:function(items, response, status){
					var merchantBoxViews = new MerchantBoxViews({collection:items});
					$('#merchant-list').empty();
					$('#merchant-list').append(merchantBoxViews.render());
				}
			});
		},
		doAdd:function(){
			window.location.href='#Merchant/Add'
		}
	});
	
	var MerchantAddView = Backbone.View.extend({
		template : Handlebars.compile($(merchantAdd).html()),
		render : function(){
			return this.$el.html(this.template(this.model.toJSON()));
		},
		events : {
			'click #mccWindow'   : 'showMccWindow',
			'click #cityWindow'  : 'showCityWindow',
			'click #merchantImg' : 'showImgFile',
			'click #submit'      : 'doSubmit'
		},
		showMccWindow : function(e){
			e.preventDefault();
			this.$el.find('#mccBox').modal('show');
		},
		showCityWindow : function(e){
			e.preventDefault();
			this.$el.find('#cityBox').modal('show');
		},
		showImgFile : function(e){
			e.preventDefault();
			$('#merchantImg').click(function(){
				$('#lefile').click();
			});
								  	  
			$('#lefile').change(function() {
				$('#photoCover').val($(this).val());
				if (this.files && this.files[0]) {
					var reader = new FileReader();

					reader.onload = function (e) {
						$('#logoImg').attr('src', e.target.result);
					}

					reader.readAsDataURL(this.files[0]);
				}
			});
		},
		doSubmit:function(e){
			e.preventDefault();
			var action = '/Talalah/merchant/save';
			var method = 'POST';
			var $form = this.$el.find('#merchant-add-form');
			merchantView.submitActionForm(action, method, $form);
		}
	});
	
	var MerchantDetailView = Backbone.View.extend({
		template : Handlebars.compile($(merchantDetail).html()),
		render:function(){
			return this.$el.html(this.template(this.model.toJSON()));
		},
		events : {
			'click #mccWindow'   : 'showMccWindow',
			'click #cityWindow'  : 'showCityWindow',
			'click #merchantImg' : 'showImgFile',
			'click #updatet'     : 'doSubmit',
			'click #search'		 : 'doSearch',
			'keyup #search-val'	 : 'doSearch'
		},
		showMccWindow : function(e){
			e.preventDefault();
			this.$el.find('#mccBox').modal('show');
		},
		showCityWindow : function(e){
			e.preventDefault();
			this.$el.find('#cityBox').modal('show');
		},
		showImgFile : function(e){
			e.preventDefault();
			$('#merchantImg').click(function(){
				$('#lefile').click();
			});
								  	  
			$('#lefile').change(function() {
				$('#photoCover').val($(this).val());
				if (this.files && this.files[0]) {
					var reader = new FileReader();

					reader.onload = function (e) {
						$('#logoImg').attr('src', e.target.result);
					}

					reader.readAsDataURL(this.files[0]);
				}
			});
		},
		doSearch : function(){
			var mcId = this.model.toJSON().mcId;
			var q = $('#search-val').val().trim();
			if(q!=''){
				var products = new Products();
				products.url = talalah.com.client.app.entity.product.product.get+"/mc/"+mcId+"/prd?name=%25"+q+"%25&first=0&max=100";
				$('#products-list').empty();
				products.fetch({
					success:function(items, response, options){
						var productViews = new ProductViews({collection:items});
						$('#products-list').append(productViews.render());
					}
				});
			}
		},
		doSubmit:function(){
			e.preventDefault();
			var action = '/Talalah/merchant/update';
			var method = 'POST';
			var $form = this.$el.find('#merchant-update-form');
			merchantView.submitActionForm(action,method,$form);
		}
	});
	
	var MerchantBoxView = Backbone.View.extend({
		
		className :'col-xs-3 col-sm-3 col-md-3',
		template:Handlebars.compile($(merchantBox).html()),
		render:function(){
			return this.$el.html(this.template(this.model.toJSON()));
		},
		events:{
			'dblclick':'showDetail',
			'click #delete':'showDelete'
		},
		showDetail : function(){
			var data = this.model.toJSON();
			window.location.href="#Merchant/View/"+data.mcId;
		},
		showDelete : function(){
			var that = this;
			var data = this.model.toJSON();
			$('#DeleteModal').modal('show');
			$('#confirm-content').html('<div class="alert alert-warning"><h3><span class="glyphicon glyphicon-question-sign"></span></span> Are you sure to delete merchant ('+data.mcId+') ? </h3></div>');
			$('#confirm').click(function(){
				var merchant = new Merchant({id:data.mcId});
				merchant.urlRoot = talalah.com.client.app.entity.merchant.merchant.remove;
				$('#DeleteModal').modal('hide');
				merchant.destroy({
					success:function(model, response, options){
						$('#result-content').html('<div class="alert alert-success"><h3><span class="glyphicon glyphicon-ok"></span></span> Successfully Delete Merchant ('+data.mcId+')</h3></div>');
						that.remove();
					},
					error:function(model, response, options){
						$('#result-content').html('<div class="alert alert-error"><h3><span class="glyphicon glyphicon-remove"></span></span> Failed to Delete Merchant ('+data.mcId+')</h3></div>');
					}
				});
			});
		}
	});
	
	var MerchantBoxViews = Backbone.View.extend({
		render : function(){
			_.each(this.collection.models,function(item){
				var merchantBoxView = new MerchantBoxView({model:item});
				this.$el.append(merchantBoxView.render());
			}, this);
			return this.$el;
		}
	});
	
	var ProductView = Backbone.View.extend({
		className:'col-xs-2 col-sm-2 col-lg-2',
		template : Handlebars.compile($(productViewTemp).html()),
		render:function(){
			return this.$el.html(this.template(this.model.toJSON()));
		},
		events:{
			'dblclick':'fetchProductDetail'
		},
		fetchProductDetail:function(){
			var data = this.model.toJSON();
			var id = data.id;
			var mcId = data.merchant.mcId;
			window.location.href='#Merchant/View/'+mcId+'/'+id;
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
	
	var ProductDetailView = Backbone.View.extend({
		template : Handlebars.compile($(productViewDetail).html()),
		render : function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this.$el;
		}
	});
	
	var TravelProductView = Backbone.View.extend({
		template : Handlebars.compile($(productViewTravel).html()),
		render : function(){
			return this.$el.html(this.template(this.model.toJSON()));
		}
	});
	var ItemProductView = Backbone.View.extend({
		template : Handlebars.compile($(productViewItem).html()),
		render : function(){
			return this.$el.html(this.template(this.model.toJSON()));
		}
	});
	
	var ProductImgView = Backbone.View.extend({
		className:'col-sm-2 col-xs-2 col-lg-2',
		template : Handlebars.compile($(productViewImg).html()),
		render : function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this.$el;
		},
		events : {
			'click': 'loadImg'
		},
		loadImg : function(){
			var data = this.model.toJSON();
			var mcc = data.product.merchant.merchantCode.mcc;
			var mcId = data.product.merchant.mcId;
			var id = data.product.id;
			var name = data.name;
			//$('#prdImg').attr('src','/Talalah/content/'+mcc+'/'+mcId+'/'+id+'/'+name);
			alert(data);
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
	
	return {
		showMerchantMain : function(){
			var user = new User();
			var merchantMainView = new MerchantMainView({model:user});
			var $view = merchantMainView.render();
			var merchants = new Merchants();
			merchants.url = talalah.com.client.app.entity.merchant.merchant.get+"/list?first=0&max=100";
			merchants.fetch({
				success:function(items, response, status){
					var merchantBoxViews = new MerchantBoxViews({collection:items});
					$view.find('#merchant-list').append(merchantBoxViews.render());
				}
			});
			
			return $view;
		},
		showMerchantAddView:function(){
			var merchant = new Merchant();
			var merchantAddView = new MerchantAddView({model:merchant});
			var $view = merchantAddView.render();
			$view.find('#mccBoxData').append(merchantView.getMccGrid());
			$view.find('#cityBoxData').append(merchantView.getCityGrid());
			return $view;
			
		},
		showMerchantDetail : function(mcId){
			/* render merchant data*/
			var $view = $('<div></div>');
			var merchant = new Merchant({id:mcId});
			merchant.fetch({
				success:function(item, response, option){
					var merchantDetailView = new MerchantDetailView({model:item});
					$view.append(merchantDetailView.render());
					var data = item.toJSON();
					var mcc = data.merchantCode.mcc;
					var mcId = data.mcId;
					$view.find('#logoImg').attr('src','/Talalah/content/'+mcc+'/'+mcId+'/default.png');
					$view.find('#mccBoxData').append(merchantView.getMccGrid());
					$view.find('#cityBoxData').append(merchantView.getCityGrid());
					/* render product list */
					var products = new Products();
					products.url =talalah.com.client.app.entity.product.product.get+"/mc/"+mcId+"?first=0&max=100";
					products.fetch({
						success:function(items, response,status){
							var productViews = new ProductViews({collection:items});
							$view.find('#products-list').append(productViews.render());
						}
					});
				}
			});
			
			return $view;
		},
		viewProductDetail : function(prdId){
			var $view = $('<div></div>');
			var product = new Product({id:prdId});
			product.fetch({
				success : function(item, response, options){
					var data = item.toJSON();
					var productDetailView = new ProductDetailView({model:item});
					$view.html(productDetailView.render());
					// insert product related images
					var productImgs = new ProductImgs();
					productImgs.url = talalah.com.client.app.entity.product.productImg.get+"?prdId="+prdId;
					productImgs.fetch({
						success:function(items, response, options){
							var productImgViews = new ProductImgViews({collection:items});
							$view.find('#productImgs').append(productImgViews.render());
						}
					});
					
					// insert product detail
					if(data.merchant.merchantCode.mcc==='4722'){
						var travelProductView = new TravelProductView({model:item});
						$view.find('#prdDetail').append(travelProductView.render());
						$view.find('#activitiesList').append(merchantView.getActivitiesGrid(data.id));
					}
					else{
						var itemProductView = new ItemProductView({model:item});
						$view.find('#prdDetail').append(itemProductView.render());
						$view.find('#shppvdlist').append(merchantView.getShippingProdersGrid(data.id));
					}
					
				}
			});
			
			return $view;
		}
	}
});