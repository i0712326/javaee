/**
 * 
 */
define(function(require,exports,module){
	
	var Model = require('model');
	var View  = require('productView');
	var init  = require('init');
	
	var talalah = init.init();
	var max		= talalah.com.client.app.page.max;
	/* access points */
	
	var accessPoint = {};
	
	accessPoint.product = null||{};
	
	accessPoint.product.main = null||{};
	// travel product main view
	accessPoint.product.main.travel = null || {};
	accessPoint.product.main.travel.render = function(){
				var user		   = new Model.User();
				var products	   = new Model.Products();
				var destinations   = new Model.Destinations();
				
				var travelPageView  = new View.TravelPageView({model:user});
				var $view = travelPageView.render();
				
				destinations.url = talalah.com.client.app.entity.product.travel.destination.get+"?first=0&max=3";
				destinations.fetch({
					success:function(items, response, options){
						 var dests = items.models;
						 var ind = 0;
						 $.each(dests,function(index, dest){
							 var name = dest.toJSON().name;
							 var id = dest.toJSON().id;
							 var travelByDestinations = new Model.Products();
							 travelByDestinations.url = talalah.com.client.app.entity.product.travel.travel.get+"/destination?name="+name+"&first=0&max=1";
							 travelByDestinations.fetch({
								 success:function(items, response, options){
									 var travelMainViews = new View.TravelMainViews({collection:items});
									 $view.find('#product-list').append(travelMainViews.render(id,index));
									
								 }
							 });
						 });
					}
				});
				
				return $view;
	}
	// travel product sub view
	accessPoint.product.sub = null||{};
	accessPoint.product.sub.travel = null || {};
	accessPoint.product.sub.travel.destination = null || {};
	accessPoint.product.sub.travel.destination.render = function(id){
		var user		   = new Model.User();
		var products	   = new Model.Products();
		user.set('id',name);
		user.set('name','Administrator');
		var travelPageView  = new View.TravelPageByDestView({model:user});
		var $view = travelPageView.render(id);
		products.url =  talalah.com.client.app.entity.product.travel.travel.get+"/destination/"+id+"?first=0&max=20";
		products.fetch({
			success : function(items, response, options){
				var prouctSubViews = new View.ProductSubViews({collection:items});
				$view.find("#product-list").append(prouctSubViews.render());
			}
		});
		
		return $view;
	}
	
	// item product main view
	accessPoint.product.main.item = null||{};
	accessPoint.product.main.item.render = function(){
		var user		   = new Model.User();
		var products	   = new Model.Products();
		
		var itemPageView	= new View.ItemPageView({model:user});
		var $view = itemPageView.render();
		
		products.url = talalah.com.client.app.entity.product.item.item.get+"?first=0&max=5";
		products.fetch({
			success:function(items, response, options){
				var itemMainViews = new View.ItemMainViews({collection:items});
				$view.find('#product-list').append(itemMainViews.render());
			}
		});
		return $view;
	}
	
	accessPoint.product.sub.item = null || {};
	accessPoint.product.sub.item.render = function(){
		var user = new Model.User();
		var products = new Model.Products();
		
		var itemPageView	= new View.ItemPageView({model:user});
		var $view = itemPageView.render();
		
		products.url = talalah.com.client.app.entity.product.item.item.get+"?first=0&max=10";
		products.fetch({
			success:function(items, response, options){
				var itemSubViews = new View.ProductSubViews({collection:items});
				$view.find('#product-list').append(itemSubViews.render());
			}
		});
		
		return $view;
	}
	
	// particular product
	var ProductDetailView = function(prdId){
			var $view = $('<div></div>');
			var product = new Model.Product({id:prdId});
			product.fetch({
				success:function(item, response, option){
					var data = item.toJSON();
					var productView = new View.TheProductView({model:item});
					$view.append(productView.render());
					// render detail of product
					if(data.merchant.merchantCode.mcc ==='4722'){
						var travelDetailView = new View.ProductTravelDetailView({model:item});
						$view.find('#product-detail').append(travelDetailView.render());
						// activities and destination list
						var activitiesView = new View.ActivitiesGrid(prdId);
						var destinationsView = new View.DestinationGrid(prdId);
						$view.find('#activitiesList').append(activitiesView.render);
						$view.find('#destinationList').append(destinationsView.render);
					}
					else{
						var itemDetailView = new View.ProductItemDetailView({model:item});
						$view.find('#product-detail').append(itemDetailView.render());
						
						// TODO
						var itemShippingProviders = new Model.ItemShippingProviders();
						itemShippingProviders.url = talalah.com.client.app.entity.product.item.itemShippingProvider.get+"/product?id="+prdId;
						itemShippingProviders.fetch({
							success : function(items, resp, opts){
								itemDetailView.collection = items;
								var shippingProviderViews = new View.ShippingProviderViews({collection:items});
								$view.find('#shppvdlist').append(shippingProviderViews.render());
							}
						});
					}
					
					// related images
					var productImgs = new Model.ProductImgs();
					productImgs.url = talalah.com.client.app.entity.product.productImg.get+"?prdId="+prdId;
					productImgs.fetch({
						success:function(items, response, option){
							var travelImgViews = new View.ProductImgViews({collection:items});
							$view.find('#related-img').append(travelImgViews.render());
						}
					});
					/* related products */
					var mcc = item.toJSON().merchant.merchantCode.mcc;
					var relatedProducts = new Model.Products();
					relatedProducts.url = talalah.com.client.app.entity.product.product.get+"/mcc?mcc="+mcc+"&review=10&first=0&max=6";
					relatedProducts.fetch({
						success:function(items,response,options){
							var travelRelatedViews = new View.ProductRelatedViews({collection:items});
							$view.find('#related-products').append(travelRelatedViews.render());
						}
					});
					// comments
					var comments = new Model.Comments();
					comments.url = talalah.com.client.app.entity.customer.comment.get+'?pId='+prdId+"&first=0&max=5";
					comments.fetch({
						success:function(items, response, options){
							var commentViews = new View.CommentViews({collection:items});
							$view.find('#comments').append(commentViews.render());
						}
					});
				}
			});
		
		return {render : $view}
	}
	
	accessPoint.product.render = function(prdId){ 
		var productDetailView = new ProductDetailView(prdId);
		return productDetailView.render;
	}
	
	accessPoint.merchant = {
			render :function(mcc,mcId){
				
				var merchant = new Model.Merchant({id:mcId});
				merchant.urlRoot = talalah.com.client.app.entity.merchant.merchant.get;
				var productMerchantView = new View.ProductMerchantView({model:merchant});
				var $ele = productMerchantView.render();
				merchant.fetch({
					success :function(item, resp, opts){
						productMerchantView.model = item;
					}
				});
				
				var products = new Model.Products();
				products.url = talalah.com.client.app.entity.product.product.get+"/mc/"+mcId+"?review=1&first=0&max="+max;
				products.fetch({
					success : function(items, resp, opt){
						var prdViews = new View.ProductViews({collection:items});
						$ele.find('#products').append(prdViews.render());
					}
				});
				
				return $ele;
			}
	}
	
	accessPoint.merchantCode = {
			render : function(mcc){
				
				var merchantCode = new Model.MerchantCode({id:mcc});
				var productMerchantCodeView = new View.ProductMerchantCodeView({model:merchantCode});
				var $ele = productMerchantCodeView.render();
				merchantCode.fetch({
					success :function(item, resp, opts){
						productMerchantCodeView.model = item;
					}
				});
				var products = new Model.Products();
				products.url = talalah.com.client.app.entity.product.product.get+"/mcc?mcc="+mcc+"&review=1&first=0&max="+max;
				products.fetch({
					success : function(items, resp, opt){
						var prdViews = new View.ProductViews({collection:items});
						$ele.find('#products').append(prdViews.render());
					}
				});
				
				return $ele;
			}
	}
	
	return accessPoint;
	
});