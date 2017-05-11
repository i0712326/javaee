/**
 * 
 */
define(['jquery','underscore','backbone','handlebars','init'],function($,_,Backbone,Handlebars,int){
	
	var talalah = init.init();
	
	var Merchant = Backbone.Model.extend({
		rootUrl:talalah.com.client.app.entity.merchant.merchant.get
	});
	
	var Merchants = Backbone.Collection.extend({
		url : talalah.com.client.app.entity.merchant.merchant.get+"?first=0&max=10",
		model:Merchant
	});
	
	var MerchantView = Backbone.View.extend({
		template : Handlebars.compile($(merchantBox).html()),
		render : function(){
			return this.$el.html(this.template(this.model.toJSON()));
		},
		events:{
			'click' : 'showDetail'
		},
		showDetail : function(){
			 
		}
	});
	
	var MerchantViews = Backbone.View.extend({
		render : function(){
			_.each(this.collection.models, function(item){
				var merchantView = new MerchantView({model:item});
				this.$el.append(merchantView.render());
			},this);
			return this.$el;
		}
	});
	
	
	
	return {
		fetchMerchants : function(){
			var merchants = new Merchants();
			merchants.fetch({
				success : function(items, response, options){
					var merchantViews = new MerchantViews({collection:items});
					$('#merchant-list').append(merchantViews.render());
				}
			});
		},
		searMerchant : function(keyVal){
			var merchants = new Merchants();
			merchants.url = talalah.com.client.app.entity.merchant.merchant.get+'?name='+keyVal;
			merchants.fetch({
				success : function(items, response, status){
					var merchantViews = new MerchantViews({collection:items});
					$('#merchant-list').append(merchantViews.render());
				}
			});
		}
		
	}
	
});