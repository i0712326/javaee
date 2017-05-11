/**
 * 
 */
define(function(require,exports,module){
	
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	
	var init = require('init');
	var event = require('product.event');
	var talalah = init.init();
	
	var CartTempl	=	require('text!cartTempl');
	
	var $cartTempl 			= $(CartTempl).find('#cart-panel').html();
	var $cartTravelTempl	= $(CartTempl).find('#cartTravel').html();
	var $cartItemTempl		= $(CartTempl).find('#cartItem').html();
	
	var content = talalah.com.client.app.page.content.merchant;
	
	var CartView= Backbone.View.extend({
		className : 'container',
		template : Handlebars.compile($cartTempl),
		render : function(){
			var data = this.model.toJSON();
			return this.$el.html(this.template(data));
		}
	});
	
	var CartTravelView = Backbone.View.extend({
		className : 'col-xs-12 col-sm-12 col-lg-12 space cartproduct',
		template : Handlebars.compile($cartTravelTempl),
		render : function(){
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
			var mcc = data.product.merchant.merchantCode.mcc;
			var mcId = data.product.merchant.mcId;
			var id   = data.product.id;
			var img	= data.product.img;
			this.$el.find('img').attr('src',content+'/'+mcc+"/"+mcId+"/"+id+"/"+img); 
			return this.$el;
		},
		events : {
			'click #delete' : 'doDelete',
			'click #checkout' : 'doCheckOut'
		},
		doDelete : function(e){
			e.preventDefault();
			event.travelProduct.deleteTravel(this);
		},
		doCheckOut : function(e){
			e.preventDefault();
			alert('Check Out travel');
		}
	});
	
	var CartItemView = Backbone.View.extend({
		className:'col-xs-12 col-sm-12 col-lg-12 space cartproduct',
		template : Handlebars.compile($cartItemTempl),
		render : function(){
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
			var mcc = data.product.merchant.merchantCode.mcc;
			var mcId = data.product.merchant.mcId;
			var id   = data.product.id;
			var img	= data.product.img;
			this.$el.find('img').attr('src',content+'/'+mcc+"/"+mcId+"/"+id+"/"+img);
			return this.$el;
		},
		events : {
			'click #delete' : 'doDelete',
			'click #checkout' : 'doCheckOut'
		},
		doDelete : function(e){
			e.preventDefault();
			event.itemProduct.deleteItem(this);
		},
		doCheckOut : function(e){
			e.preventDefault();
			// TODO redirect to paypal
		}
	});
	
	var CartProductViews = Backbone.View.extend({
		render : function(){
			_.each(this.collection.models,function(item){
				var data = item.toJSON();
				var mcc = data.product.merchant.merchantCode.mcc;
				if(mcc==='4722'){
					var cartTravelView = new CartTravelView({model:item});
					this.$el.append(cartTravelView.render());
				}
				else{
					var cartItemView = new CartItemView({model:item});
					this.$el.append(cartItemView.render());
				}
				
			},this);
			
			return this.$el;
		}
	});
	
	return {
		CartView 		: CartView,
		CartTravelView 	: CartTravelView,
		CartItemView	: CartItemView,
		CartProductViews : CartProductViews
	};
	
});
