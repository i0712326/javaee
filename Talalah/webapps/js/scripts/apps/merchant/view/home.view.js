/**
 * 
 */
define(function(require,exports,module){
	
	var Backbone 	= require('backbone');
	var Handlebars 	= require('handlebars');
	
	var event = require('home.event');
	
	var merchantHomeTemp 	= require('text!merchantHomeTemp');
	var productTemp			= require('text!productTemp');
	
	var $merchantHomeTemp 	= $(merchantHomeTemp).find('#homeTempl').html();
	var $productTemp		= $(productTemp).find('#productTemp').html();
	var $addressTemp		= $(merchantHomeTemp).find('#addr-form').html();
	var $districtTemp		= $(merchantHomeTemp).find('#districtTemp').html();
	
	var MerchantHomeView 	= Backbone.View.extend({
		initialize : function(){
			 this.page = 0;
		},
		template : Handlebars.compile($merchantHomeTemp),
		render : function(){
			var that = this;
			var data = that.model.toJSON();
			this.$el.html(that.template(data));
			if(data.merchantCode!==undefined)
				that.$el.find('#merchant-img').attr('src',"../../content/"+data.merchantCode.mcc+"/"+data.mcId+"/default.png");
			return that.$el;
		},
		events : {
			'click #upload' 	: 'doUpload',
			'click #ok'			: 'doUpdateImg',
			'click #updateInfo'	: 'doUpdateProfile',
			'click #editAddr'	: 'doEditAddress',
			'click #updateAddr' : 'doUpdateAddress',
			'click #search'		: 'doSearch',
			'click #loadmore'	: 'doLoadMore'
		},
		doUpload : function(e){
			e.preventDefault();
			event.doUpload(this);
		},
		doUpdateImg : function(e){
			e.preventDefault();
			event.doUpdateImg(this);
		},
		doUpdateProfile : function(e){
			e.preventDefault();
			event.doUpdateProfile(this);
		},
		doEditAddress : function(e){
			e.preventDefault();
			event.doEditAddress(this,AddressView, DistrictViews);
		},
		doUpdateAddress : function(e){
			e.preventDefault();
			event.doUpdateAddress(this);
		},
		doSearch : function(e){
			e.preventDefault();
			event.doSearch(this,ProductViews);
		},
		doLoadMore : function(e){
			e.preventDefault();
			this.page++;
			event.doLoadMore(this, ProductViews);
		}
	});
	
	var ProductView = Backbone.View.extend({
		className :'col-sm-3 col-xs-3 col-lg-3',
		template : Handlebars.compile($productTemp),
		render : function(){
			var that = this;
			var data = that.model.toJSON();
			var mcId = data.merchant.mcId;
			var mcc  = data.merchant.merchantCode.mcc;
			var id = data.id;
			that.$el.html(this.template(data));
			that.$el.find('#product-img').attr('src','/Talalah/content/'+mcc+'/'+mcId+'/'+id+'/default.png');
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
	
	var AddressView = Backbone.View.extend({
		className : 'col-lg-12 col-sm-12 col-xs-12',
		template : Handlebars.compile($addressTemp),
		render : function(){
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
			return this.$el;
		}
	});
	
	var DistrictView = Backbone.View.extend({
		initialize : function(addressView){
			this.addressView = addressView;
		},
		className : 'col-lg-12 col-sm-12 col-xs-12',
		template : Handlebars.compile($districtTemp),
		render : function(){
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
			return this.$el;
		},
		events : {
			'dblclick':'doSelect'
		},
		doSelect : function(e){
			e.preventDefault();
			event.doSelect(this);
		}
	});
	
	var DistrictViews = Backbone.View.extend({
		initialize : function(addressView){
			this.addressView = addressView;
		},
		render : function(){
			_.each(this.collection.models, function(item){
				var districtView = new DistrictView(this.addressView);
				districtView.model = item;
				this.$el.append(districtView.render());
			},this);
			return this.$el;
		}
	});
	
	return {
		MerchantHomeView 	: MerchantHomeView,
		ProductView 		: ProductView,
		ProductViews 		: ProductViews
	}
	
});