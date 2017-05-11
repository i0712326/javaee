/**
 * 
 */
define(['jquery', 'underscore', 'backbone','handlebars'],function($,_, Backbone, Handlebars){
	/**
	 * 
	 * Backbone Model of Product
	 * 
	 */
	
	var Product = Backbone.Model.extend({
		urlRoot :'/EmarketService/WebService/product/get'
	});
	
	/**
	 * 
	 * Backbone Product Collection
	 * 
	 */
	var Products = Backbone.Collection.extend({
		model:Product
	});
	
	
	/**
	 * 
	 * Backbone Product View
	 * 
	 */
	
	var ProductView = Backbone.View.extend({
		className:'col-xs-3 col-sm-3 col-lg-3',
		template:Handlebars.compile($(prdView).html()),
		render:function(){
			return this.$el.html(this.template(this.model.toJSON()));
		}
	});
	
	var RecommendProdView = Backbone.View.extend({
		className:'col-xs-'
	});
	/**
	 *  
	 *  return class instance of product object.
	 * 
	 * */
	
	var ProductIns = function(){
		this.productView = function(){
			
		};
	};
	
	return new ProductIns();
});