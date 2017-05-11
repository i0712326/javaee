/**
 * 
 */
define(function(require,exports,module){
	
	var Model 	= require('model');
	var View 	= require('product.view');
	var init	= require('init');
	var talalah = init.init();
	
	var ProductViewPage = function(mcId,pId){
		var mcId = mcId;
		var pId = pId;
		
		this.render = function(){
			
			var product = new Model.Product({id:pId});
			var productPageView = new View.ProductPageView({model:product});
			var $ele			= productPageView.render();
			
			product.fetch({
				success : function(item,resp,opt){
					var productLocationView = new View.ProductLocationView({model:item});
					
					var productImgView = new View.ProductImgView({model:item});
					
					$ele.find('#location').append(productLocationView.render());
					
					$ele.find('#product-img').append(productImgView.render());
					
					$ele.find('#upload').show();
					
					var productInfoView = new View.ProductInfoView({model:item});
					$ele.find('#product-info').append(productInfoView.render());
					
					var data = item.toJSON().merchant.merchantCode.mcc;
					
					var $formEle = null;
					
					if(data!=='4722'){
						var itemFormView = new View.ItemFormView({model:item});
						$formEle = itemFormView.render();
						var itemShippingProviders = new Model.ItemShippingProviders();
						itemShippingProviders.url = talalah.com.client.app.entity.product.item.itemShippingProvider.get+"/product?id="+pId;
						itemShippingProviders.fetch({
							success : function(collection,resp,opt){
								var shippingProviderViews = new View.ShippingProviderViews({collection:collection});
								itemFormView.$el.find('#shippingProviders').append(shippingProviderViews.render());
							}
						});
					}
					else{
						var travelFormView = new View.TravelFormView({model:item});
						$formEle = travelFormView.render();
						var destinationPanelView = new View.DestinationPanelView({model:item});
						travelFormView.$el.find('#destination-panel').append(destinationPanelView.render());
						var destinations = new Model.Destinations();
						destinations.url = talalah.com.client.app.entity.product.travel.destination.get+"/product?prdId="+pId+"&first=0&max=20";
						destinations.fetch({
							success : function(items,resp,opt){
								var destinationViews = new View.DestinationViews({collection:items});
								travelFormView.$el.find("#destinations").append(destinationViews.render());
							}
						});
						var activityPanelView = new View.ActivityPanelView({model:item});
						travelFormView.$el.find('#activity-panel').append(activityPanelView.render());
						var activities = new Model.Activities();
						activities.url = talalah.com.client.app.entity.product.travel.activity.get+"/product?prdId="+pId+"&first=0&max=20";
						activities.fetch({
							success : function(items,resp,opt){
								var activityViews = new View.ActivityViews({collection:items});
								travelFormView.$el.find("#activities").append(activityViews.render());
							}
						});
					}
					
					$ele.find('#product-detail').append($formEle);
					
					/* product related images */
					
					var productImgs = new Model.ProductImgs();
					productImgs.url = talalah.com.client.app.entity.product.productImg.get+"?prdId="+pId;
					productImgs.fetch({
						success : function(items, resp, opts){
							if(items.length>0){
								var productRelatedImgs = new View.ProductRelatedImgs({collection:items});
								$ele.find('#related-imgs').append(productRelatedImgs.render());
							}
							else{
								var len = 6;
								for(var i=0;i<len;i++){
									var picName = 'pic000'+i;
									var data = {product:item.toJSON(), picName:picName, tag:null};
									var prdImg = new Model.ProductImg(data);
									items.push(prdImg);
								}
								var productRelatedImgs = new View.ProductRelatedImgs({collection:items});
								$ele.find('#related-imgs').append(productRelatedImgs.render());
								
							}
						}
					});
					var productShortDetailView = new View.ProductShortDetailView({model:item});
					$ele.find('#short-detail').append(productShortDetailView.render());
					var productLongDetailView	= new View.ProductLongDetailView({model:item});
					$ele.find('#full-detail').append(productLongDetailView.render());
				}
			});
			
			return $ele;
		}
	}
	
	var endPoint = {
		showProduct : function(mcId,pId){
			var productViewPage = new ProductViewPage(mcId,pId);
			return productViewPage.render();
		}
	}
	
	return endPoint;
	
});