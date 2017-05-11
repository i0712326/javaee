/**
 * 
 */
define(function(require,exports,module){
	var datetimepicker  = require('bootstrapdatepicker');
	var Model 		= require('model');
	var View 		= require('product.view');
	var CommentView = require('comment.view');
	var init		= require('init');
	
	var talalah = init.init();
	var max = talalah.com.client.app.page.max;
	var TheProductPage = function(mcc,mcId,pId){
		var mcc = mcc;
		var mcId = mcId;
		var pId = pId;
		
		this.render = function(){ 
			
			var product = new Model.Product({id:pId});
			var productView = new View.TheProductView({model:product});
			var $ele = productView.render();
			
			product.fetch({
				success : function(item,resp,opt){
					productView.model = item;
					// product detail
					var data = item.toJSON();
					// render detail of product
					if(data.merchant.merchantCode.mcc ==='4722'){
						var travelDetailView = new View.ProductTravelDetailView({model:item});
						$ele.find('#product-detail').append(travelDetailView.render());
						// activities and destination list
						var activitiesView = new View.ActivitiesGrid(pId);
						var destinationsView = new View.DestinationGrid(pId);
						$ele.find('#activitiesList').append(activitiesView.render);
						$ele.find('#destinationList').append(destinationsView.render);
					}
					else{
						var itemDetailView = new View.ProductItemDetailView({model:item});
						$ele.find('#product-detail').append(itemDetailView.render());
						
						// 
						var itemShippingProviders = new Model.ItemShippingProviders();
						itemShippingProviders.url = talalah.com.client.app.entity.product.item.itemShippingProvider.get+"/product?id="+pId;
						itemShippingProviders.fetch({
							success : function(items, resp, opts){
								itemDetailView.collection = items;
								var shippingProviderViews = new View.ShippingProviderViews({collection:items});
								$ele.find('#shppvdlist').append(shippingProviderViews.render());
							}
						});
					}
					
					// related images
					var productImgs = new Model.ProductImgs();
					productImgs.url = talalah.com.client.app.entity.product.productImg.get+"?prdId="+pId;
					productImgs.fetch({
						success:function(items, response, option){
							var productImgViews = new View.ProductImgViews({collection:items});
							$ele.find('#related-img').append(productImgViews.render());
						}
					});
					/* related products */
					var mcc = item.toJSON().merchant.merchantCode.mcc;
					var relatedProducts = new Model.Products();
					relatedProducts.url = talalah.com.client.app.entity.product.product.get+"/mcc?mcc="+mcc+"&review=10&first=0&max=6";
					relatedProducts.fetch({
						success:function(items,response,options){
							var productRelatedViews = new View.ProductRelatedViews({collection:items});
							$ele.find('#related-products').append(productRelatedViews.render());
						}
					});
					// comments
					var comments = new Model.Comments();
					comments.url = talalah.com.client.app.entity.customer.comment.get+'?pId='+pId+"&first=0&max=5";
					comments.fetch({
						success:function(items, response, options){
							var commentViews = new CommentView.CommentViews({collection:items});
							$ele.find('#comments').append(commentViews.render());
						}
					});
				}
			});
			return $ele;
		}
		
	}
	
	var ProductMerchanPage = function(mcc,mcId){
		this.mcc = mcc;
		this.mcId = mcId;
		this.render = function(){
			var merchant = new Model.Merchant({id:mcId});
			var productMerchantView = new View.ProductMerchantView({model:merchant});
			var $ele = productMerchantView.render();
			merchant.fetch({
				success : function(item,resp,opt){
					productMerchantView.model = item;
					var mcId = resp.mcId;
					var products = new Model.Products();
					products.url = talalah.com.client.app.entity.product.product.get+"/mc/"+mcId+"?review=1&first=0&max="+max;
					products.fetch({
						success : function(items, resp, opt){
							var prdViews = new View.ProductViews({collection:items});
							$ele.find('#products').append(prdViews.render());
						}
					});
					
				}
			});
			
			return $ele;
		}
	}
	
	var ProductMerchantCodePage = function(mcc){
		this.mcc = mcc;
		this.render = function(){
			var merchantCode = new Model.MerchantCode({id:this.mcc});
			var productMerchantCodeView = new View.ProductMerchantCodeView({model:merchantCode});
			var $ele = productMerchantCodeView.render();
			merchantCode.fetch({
				success :function(item, resp, opts){
					productMerchantCodeView.model = item;
					var products = new Model.Products();
					var mcc = resp.mcc;
					
					if(mcc==='4722'){
						$ele.find('#travelProduct').show();
						
						var destinations = new Model.Destinations();
						destinations.url = talalah.com.client.app.entity.product.travel.destination.get;
						destinations.url = destinations.url+"?first=0&max=30";
						destinations.fetch({
							success : function(ites, resp, opt){
								_.each(ites.models, function(ite){
									var data = ite.toJSON();
									var name = data.name;
									var op = $('<option value="'+name+'">'+name+'</option>');
									$ele.find('#destOptions').append(op);
								}, ites);
								
								$ele.find('#start').datetimepicker({
									useCurrent:false,
									format: 'YYYY-MM-DD'
								});
								
								$ele.find('#end').datetimepicker({
						            useCurrent: false,
						            format:'YYYY-MM-DD'
						        });
							}
						});
						
						var activities = new Model.Activities();
						activities.url = talalah.com.client.app.entity.product.travel.activity.get;
						activities.url = activities.url+'?first=0&max=50';
						activities.fetch({
							success:function(acts, resp, opt){
								_.each(acts.models, function(act){
									var data = act.toJSON();
									var name = data.name;
									var op = $('<option value="'+name+'">'+name+'</option>');
									$ele.find('#actOptions').append(op)
								}, acts);
							}
						});
					}
					else{
						$ele.find('#itemProduct').show();
					}
					
					products.url = talalah.com.client.app.entity.product.product.get+"/mcc?mcc="+mcc+"&review=1&first=0&max="+max;
					products.fetch({
						success : function(items, resp, opt){
							var prdViews = new View.ProductViews({collection:items});
							$ele.find('#products').append(prdViews.render());
						}
					});
				}
			});
			return $ele;
		}
	}
	
	var endPoint = {
			showTheProductPage : function(mcc,mcId,pId){
				var theProductPage = new TheProductPage(mcc,mcId,pId);
				return theProductPage.render();
			},
			showProductMcPage : function(mcc,mcId){
				var productMerchanPage = new ProductMerchanPage(mcc,mcId);
				return productMerchanPage.render();
			},
			showProductMccPage : function(mcc){
				var productMerchantCodePage = new ProductMerchantCodePage(mcc);
				return productMerchantCodePage.render();
			}
	}
	
	return endPoint;
});