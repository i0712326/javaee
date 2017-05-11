/**
 * 
 */
define(function(require, exports, module){
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var backgrid = require('backgrid');
	var Handlebars = require('handlebars');
	var text	= require('text');
	var Model	= require('model');
	var init = require('init');
	var customerCartController = require('customer.cart.controller');
	
	var talalah = init.init();
	var content = talalah.com.client.app.page.content.merchant;
	
	var cartComponentTemp = require('text!cartTemp');
	var cartProductTemp = require('text!cartProductTemp');
	
	var $cartPanelTemp	= $(cartComponentTemp).find('#cart-panel').html();
	var $cartItemTemp = $(cartComponentTemp).find('#cartItem').html();
	var $cartTravelTemp = $(cartComponentTemp).find('#cartTravel').html();
	var $cartProductTemp = $(cartProductTemp).find('#cartProduct').html();
	
	var $productTravelTemp = $(cartProductTemp).find('#travel-detail').html();
	var $productItemTemp = $(cartProductTemp).find('#item-detail').html();
	
	
	var $itemShippingProviderTemp = $(cartProductTemp).find('#itemshippingprovider').html();
	
	var $addressViewTemp = $(cartComponentTemp).find('#addressPanel1').html();
	var $addressEditTemp = $(cartComponentTemp).find('#addressPanel2').html();
	
	
	var AddressView = Backbone.View.extend({
		template : Handlebars.compile($addressViewTemp),
		render : function(){
			return this.$el.html(this.template(this.model.toJSON()));
		}
	});
	
	var AddressEditView = Backbone.View.extend({
		template : Handlebars.compile($addressEditTemp),
		render : function(){
			return this.$el.html(this.template(this.model.toJSON()));
		},
		events : {
			'click #ok' : 'doUpdate'
		},
		doUpdate : function(e){
			e.preventDefault();
			customerCartController.doUpdateAddr(this);
		}
	});
	
	var CartPanelView = Backbone.View.extend({
		initialize:function(){
			this.page = 0;
			_.bindAll(this, "render");
		    this.model.bind('change', this.render);
		},
		className :'container',
		template : Handlebars.compile($cartPanelTemp),
		render : function(){
			this.$el.html(this.template(this.model.toJSON()));
			var addressView = new AddressView({model:this.model});
			this.$el.find('#address').append(addressView.render());
			this.$el.find('#backward').attr('disabled','disabled');
			return this.$el;
		},
		events : {
			'click #search' 	: 'doSearch',
			'click #editAddr' 	: 'doEditAddr',
			'click #ok' 		: 'doUpdateAddr',
			'click #checkOut'	: 'doCheckOut',
			'click #backward'	: 'doBackward',
			'click #forward'	: 'doForward'
			
		},
		doSearch : function(e){
			e.preventDefault();
			var data = this.model.toJSON();
			var cId = data.cart.id;
			customerCartController.doSearch(cId, this,CartProductViews);
		},
		doEditAddr:function(e){
			e.preventDefault();
			customerCartController.doEditAddr(this, AddressEditView);
		},
		doUpdateAddr : function(e){
			e.preventDefault();
			customerCartController.doUpdateAddr(this);
		},
		doCheckOut : function(e){
			e.preventDefault();
		},
		doBackward : function(e){
			e.preventDefault();
			var data = this.model.toJSON();
			var cId = data.cart.id;
			var id = data.id;
			if(this.page>0){
				customerCartController.doChangePage(--this.page, id, cId, this, CartProductViews);
				this.$el.find('#forward').removeAttr('disabled');
			}
			if(this.page===0) this.$el.find('#backward').attr('disabled','disabled');
		},
		doForward : function(e){
			e.preventDefault();
			var data = this.model.toJSON();
			var cId = data.cart.id;
			var id = data.id;
			customerCartController.doChangePage(++this.page, id, cId, this, CartProductViews)
		}
	});
	
	var CartItemView = Backbone.View.extend({
		initialize : function(){
			this.custId = 0;
		},
		className:'col-xs-12 col-sm-12 col-lg-12 space cartproduct',
		template:Handlebars.compile($cartItemTemp),
		render:function(id){
			this.custId = id;
			var customer = {id:id};
			var data = this.model.toJSON();
			data.cart.customer = customer;
			this.$el.html(this.template(data));
			var mcc = data.product.merchant.merchantCode.mcc;
			var mcId = data.product.merchant.mcId;
			var id   = data.product.id;
			var img	= data.product.img;
			this.$el.find('img').attr('src',content+'/'+mcc+"/"+mcId+"/"+id+"/"+img);
			return this.$el;
		},
		events : {
			'click #checkout':'doCheckOut',
			'click #delete' : 'doDelete'
		},
		doCheckOut : function(e){
			e.preventDefault();
			customerCartController.doCheckOut(this);
		},
		doDelete : function(e){
			e.preventDefault();
			customerCartController.doDelete(this,CartProductViews);
		}
	});
	
	var CartTravelView = Backbone.View.extend({
		initialize : function(){
			this.custId = 0;
		},
		className:'col-xs-12 col-sm-12 col-lg-12 space cartproduct',
		template:Handlebars.compile($cartTravelTemp),
		render:function(id){
			this.custId = id;
			var customer = {id:id};
			var data = this.model.toJSON();
			data.cart.customer = customer;
			this.$el.html(this.template(data));
			var mcc = data.product.merchant.merchantCode.mcc;
			var mcId = data.product.merchant.mcId;
			var id   = data.product.id;
			var img	= data.product.img;
			this.$el.find('img').attr('src',content+'/'+mcc+"/"+mcId+"/"+id+"/"+img);
			return this.$el;
		},
		events : {
			'click #checkout':'doCheckOut',
			'click #delete' : 'doDelete'
		},
		doCheckOut : function(e){
			e.preventDefault();
			customerCartController.doCheckOut(this);
		},
		doDelete : function(e){
			e.preventDefault();
			customerCartController.doDelete(this,CartProductViews);
		}
	});
	
	var CartProductViews = Backbone.View.extend({
		render : function(id){
			_.each(this.collection.models, function(item){
				var data = item.toJSON();
				var type = data.product.productCategory.id;
				if(type==='I'){
					var cartItemView = new CartItemView({model:item});
					this.$el.append(cartItemView.render(id));
				}
				else{
					var cartTravelView = new CartTravelView({model:item});
					this.$el.append(cartTravelView.render(id));
				}
					
			},this);
			return this.$el;
		}
	});
	
	var CartProductView = Backbone.View.extend({
		initialize : function(){
			this.page = 1;
			_.bindAll(this, "render");
		    this.model.bind('change', this.render);
		},
		className:'container',
		template : Handlebars.compile($cartProductTemp),
		render : function(){
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
			return this.$el;
		},
		events:{
			'click #loadmore'	: 'doLoadMore'
		},
		doLoadMore : function(e){
			e.preventDefault();
			customerCartController.doLoadMoreComments(this);
			this.page++;
		}
	});
	
	var ItemShippingProviderView = Backbone.View.extend({
		className : 'col-xs-12 col-sm-12 col-lg-12',
		template : Handlebars.compile($itemShippingProviderTemp),
		render:function(pvdId){
			var data = this.model.toJSON();
			var id = data.shippingProvider.id;
			this.$el.html(this.template(this.model.toJSON()));
			if(id===pvdId){
				this.$el.find('input[type=radio]').attr('checked', 'checked');
			}
			return this.$el;
		}
	}) ;
	
	var ItemShippingProviderViews = Backbone.View.extend({
		tagName:'form',
		render : function(pvdId){
			_.each(this.collection.models, function(item){
				var itemShippingProviderView = new ItemShippingProviderView({model:item});
				this.$el.append(itemShippingProviderView.render(pvdId));
			},this);
			return this.$el;
		}
	});
	
	var ProductItemDetailView = Backbone.View.extend({
		className : 'col-lg-12 col-xs-12 col-sm-12',
		template : Handlebars.compile($productItemTemp),
		render : function(){
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
			return this.$el;
		}
	});
	
	var ProductTravelDetailView = Backbone.View.extend({
		className : 'col-lg-12 col-xs-12 col-sm-12',
		template : Handlebars.compile($productTravelTemp),
		render : function(){
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
			return this.$el;
		}
	});
	
	return {
		AddressView				  : AddressView,
		AddressEditView			  : AddressEditView,
		CartPanelView			  : CartPanelView,
		CartItemView			  : CartItemView,
		CartTravelView			  : CartTravelView,
		CartProductViews		  : CartProductViews,
		CartProductView			  : CartProductView,
		ItemShippingProviderView  : ItemShippingProviderView,
		ItemShippingProviderViews : ItemShippingProviderViews,
		ProductItemDetailView	  : ProductItemDetailView
	};
	
});