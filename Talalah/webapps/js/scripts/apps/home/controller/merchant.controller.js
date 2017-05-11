/**
 * 
 */
define(function(require,exports,module){
	var Model 	= require('model');
	var init	= require('init');
	
	var talalah = init.init();
	var max	= talalah.com.client.app.page.max;
	
	var MerchantController = function(){
		
		this.doSearch = function(that,ProductViews){
			that.$el.find('#loadmore').hide();
			that.$el.find('#loader').show();
			that.$el.find('#product-list').empty();
			var data 	= that.model.toJSON();
			var mcId	= data.mcId;
			var q 		= that.$el.find('#btn-search').val().trim();
			var products = new Model.Products();
			products.url = talalah.com.client.app.entity.product.product.get+"/mc/"+mcId+"/prd?first=0&max="+max+"&name="+q+"%25";
			products.fetch({
				success : function(items,resp,opt){
					setTimeout(function(){
						that.$el.find('#loader').hide();
						that.$el.find('#searchmore').show();
						var productViews = new ProductViews({collection:items});
						that.$el.find('#product-list').append(productViews.render());
					},3000);
					
				}
			});
		}
		
		this.doSearchMore = function(that, ProductViews){
			that.$el.find('#searchmore').hide();
			that.$el.find('#loader1').show();
			var data 	= that.model.toJSON();
			var mcId	= data.mcId;
			var q = that.$el.find('#btn-search').val().trim();
			var first = that.searchPage * max;
			var products = new Model.Products();
			products.url = talalah.com.client.app.entity.product.product.get+"/mc/"+mcId+"/prd?first="+first+"&max="+max+"&name="+q+"%25";
			products.fetch({
				success : function(items,resp,opt){
					setTimeout(function(){
						that.$el.find('#loader1').hide();
						that.$el.find('#searchmore').show();
						var productViews = new ProductViews({collection:items});
						that.$el.find('#product-list').append(productViews.render());
					},3000);
					
				}
			});
		}
		
		this.doLoadMore	= function(that,ProductViews){
			that.$el.find('#loadmore').hide();
			that.$el.find('#loader1').show();
			var data 	= that.model.toJSON();
			var mcId	= data.mcId;
			var first 	= that.page * max;
			var products = new Model.Products();
			products.url = talalah.com.client.app.entity.product.product.get+"/mc/"+mcId+"?first="+first+"&max="+max;
			products.fetch({
				success : function(items,resp,opt){
					setTimeout(function(){
						that.$el.find('#loadmore').show();
						that.$el.find('#loader1').hide();
						var productViews = new ProductViews({collection:items});
						that.$el.find('#product-list').append(productViews.render());
						
					},3000);
				}
			});
		}
	}
	
	return new MerchantController();
	
});
