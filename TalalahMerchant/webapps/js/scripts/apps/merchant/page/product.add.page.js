/**
 * 
 */
define(function(require, exports, module){
	var Model 	= require('model');
	var View	= require('product.view');
	var init	= require('init');
	var talalah = init.init();
	
	var ProductAddPage = function(mcId){
		var mcId = mcId;
		this.render = function(){
			var productPageView = new View.ProductPageView();
			var $ele			= productPageView.render();
			var product	= new Model.Product({merchant:{mcId:mcId}});
			
			var productLocationAddView	= new View.ProductLocationAddView({model:product});
			var productImgView 	= new View.ProductImgView({model:product});
			
			var productInfoView	= new View.ProductInfoView({model:product});
			
			var productShortDetailView 	= new View.ProductShortDetailView({model:product});
			var productLongDetailView	= new View.ProductLongDetailView({model:product});
			var productRelatedImgs 		= new View.ProductRelatedImgs({collection:{}});
			
			var merchant = new Model.Merchant({id:mcId});
			merchant.urlRoot = talalah.com.client.app.entity.merchant.merchant.get;
			merchant.fetch({
				success : function(model,resp,opt){
					var data = model.toJSON();
					product.set({merchant:data});
					productInfoView.model = product;
					var mcc = data.merchantCode.mcc;
					if(mcc!=='4722'){
						var itemFormView 	= new View.ItemFormView({model:product});
						var $itemFormEle	= itemFormView.render();
						
						var shippingProviders = new Model.ShippingProviders();
						shippingProviders.url = talalah.com.client.app.entity.product.item.shippingProvider.get+"?first=0&max=100";
						shippingProviders.fetch({
							success : function(collection,resp,opt){
								var shippingProviderViews = new View.ShippingProviderViews({collection:{}});
								var shippingProviderEditViews 	= new View.ShippingProviderEditViews({collection:collection});
								
								var shippingProviderEles		= shippingProviderViews.render();
								var shippingProviderEditEles	= shippingProviderEditViews.render();
								
								shippingProviderEles.find('a').hide();
								
								$itemFormEle.find('#shippingProviders').append(shippingProviderEles);
								$itemFormEle.find('#shippingProvider-list').append(shippingProviderEditEles);
							}
						});
						$itemFormEle.find('a').hide();
						$ele.find('#product-detail').append($itemFormEle);
					}
					else{
						var travelFormView 			= new View.TravelFormView({model:product});
						
						var activityPanelView		= new View.ActivityPanelView();
						var destinationPanelView	= new View.DestinationPanelView();
						
						var $activityPanelEle		= activityPanelView.render();
						var $destinationPanelEle		= destinationPanelView.render();
						
						var activities				= new Model.Activities();
						activities.url = talalah.com.client.app.entity.product.travel.activity.get+"?first=0&max=100";
						activities.fetch({
							success : function(items,resp,opt){
								var activityViews		= new View.ActivityViews({collection:items});
								$activityPanelEle.find('#activities').append(activityViews.render());
							}
						});
						
						var destinations	= new Model.Destinations();
						destinations.url	= talalah.com.client.app.entity.product.travel.destination.get+"?first=0&max=100";
						destinations.fetch({
							success : function(items,resp,opt){
								var destinationViews = new View.DestinationViews({collection:items});
								$destinationPanelEle.find('#destinations').html(destinationViews.render());
							}
						});
						
						var $travelFormEle		= travelFormView.render();
						
						$travelFormEle.find('#destination-panel').append($destinationPanelEle);
						$travelFormEle.find('#activity-panel').append($activityPanelEle);
						$travelFormEle.find('a').hide();
						$ele.find('#product-detail').append($travelFormEle);
					}
				}
			});
			
			var productImgEles = productRelatedImgs.render();
			for(var i=0;i<6;i++){
				var productRelatedImg = new View.ProductRelatedImg({model:{}});
				var productRelatedImgEle = productRelatedImg.render();
				productRelatedImgEle.find('a').hide();
				productImgEles.find('#imgs').append(productRelatedImgEle);
			}
				
			var productInfoEle = productInfoView.render();
			productInfoEle.find('input').removeAttr('disabled');
			productInfoEle.find('a').hide();
			productInfoEle.find('#save').show();
			
			var productShortDetailEle = productShortDetailView.render();
			productShortDetailEle.find('a').hide();
			
			var productLongDetailEle = productLongDetailView.render();
			productLongDetailEle.find('a').hide();
			
			productImgEles.find('a').hide();
			
			$ele.find('#location').append(productLocationAddView.render());
			$ele.find('#product-img').append(productImgView.render());
			$ele.find('#product-info').append(productInfoEle);
			$ele.find('#short-detail').append(productShortDetailEle);
			$ele.find('#related-imgs').append(productImgEles);
			$ele.find('#full-detail').append(productLongDetailEle);
			
			return $ele;
		}
		
	}
	
	var endPoint = {
			showAddProduct : function(mcId){
				var productAddPage = new ProductAddPage(mcId);
				return productAddPage.render();
			}
	}
	
	return endPoint;
});