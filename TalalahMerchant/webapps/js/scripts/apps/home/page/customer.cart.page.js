/**
 * 
 */
define(function(require,exports,module){
	var Backgrid = require('backgrid');
	var View = require('cartView');
	var PrdView =	require('productView');
	var Model = require('model');
	var init  = require('init');
	
	var talalah = init.init();
	var max = talalah.com.client.app.page.max;
	
	var CartPage = function(id,cId){
		var id = id, cId = cId;
		
		this.render = function(){
			var customer		 = new Model.Customer({id:id});
			var cartPanelView = new View.CartPanelView({model:customer});
			var $ele = cartPanelView.render();
			
			customer.fetch({
				success:function(item,resp,opts){
					cartPanelView.model = item;
					var cartProducts = new Model.CartProducts();
					cartProducts.url = talalah.com.client.app.entity.customer.cartproduct.get+"?cId="+cId+"&first=0&max="+max;
					cartProducts.fetch({
						success:function(items, response, options){
							setTimeout(function(){
								$ele.find('#loader00').hide();
								if(items.length>0){
									var cartProductViews = new View.CartProductViews({collection:items});
									$ele.find('#cartProductDataGrid').empty();
									$ele.find('#cartProductDataGrid').append(cartProductViews.render(id));
								}
								else{
									$ele.find('#empty-info').show();
								}
								
							},3000);
						}
					});
				}
			});
			
			return $ele;
		}
		
	}
	
	var CartProductPage = function(id,cId,pId,cpId){
		var id 		= id;
		var cId 	= cId;
		var pId 	= pId;
		var cpId 	= cpId;
		var that = this;
		that.id = id;
		this.render = function(){
			var cartProduct = new Model.CartProduct({id:cpId});
			var cartProductView = new View.CartProductView({model:cartProduct});
			var $ele = cartProductView.render();
			cartProduct.urlRoot = talalah.com.client.app.entity.customer.cartproduct.get;
			cartProduct.fetch({
				success:function(item,data,opts){
					data.cart.customer = {};
					data.cart.customer.id = that.id;
					cartProductView.model.set(data);
					$ele = cartProductView.render();
					var merchant = data.product.merchant;
					var mcc = merchant.merchantCode.mcc;
					var mcId = merchant.mcId;
					var id = data.product.id;
					var img = data.product.img;
					$ele.find('#prdImg').attr('src',"/Talalah/content/"+mcc+"/"+mcId+"/"+id+"/"+img);
					if(mcc==='4722'){
						var productTravelDetailView = new View.ProductTravelDetailView({model:item});
						$ele.find('#product-detail').append(productTravelDetailView.render());
						var prdId = data.product.id;
						var destinationColumns = [{name: "name",label: "Name", cell: "string", editable:false}];
						var destinations = new Model.Destinations();
						destinations.url = talalah.com.client.app.entity.product.travel.destination.get+"/product?prdId="+prdId+"&first=0&max=100";
						var destinationGrid = new Backgrid.Grid({
							  columns: destinationColumns,
							  collection: destinations
							});
						$ele.find('#destinationList').append(destinationGrid.render().$el);
						destinations.fetch({reset:true});
						var activityColumns = [{name: "name",label: "Name", cell: "string", editable:false}];
						var activities = new Model.Activities();
						activities.url = talalah.com.client.app.entity.product.travel.activity.get+"/product?prdId="+prdId+"&first=0&max=100";
						var activitiesGrid = new Backgrid.Grid({
							columns : activityColumns,
							collection : activities
						});
						this.$el.find('#activitiesList').append(activitiesGrid.render().$el);
						activities.fetch({reset:true});
					}
					else{
						var productItemDetailView = new View.ProductItemDetailView({model:item});
						$ele.find('#product-detail').append(productItemDetailView.render());
						var pId = data.product.id;
						var cpId = data.id;
						var pvdId = data.shipping.itemShippingProvider.itemShippingProviderId.shippingProvider.id;
						var itemShippingProviders = new Model.ItemShippingProviders();
						itemShippingProviders.url = talalah.com.client.app.entity.product.item.itemShippingProvider.get+"/product?id="+pId;
						itemShippingProviders.fetch({
							success: function(items, resp, opts){
								var itemShippingProviderViews = new View.ItemShippingProviderViews({collection:items});
								$ele.find('#shppvdlist').append(itemShippingProviderViews.render(pvdId));
							}
						});
					}
					var products = new Model.Products();
					products.url = talalah.com.client.app.entity.product.product.get+"/mcc?mcc="+mcc+"&review=1&first=0&max=6";
					products.fetch({
						success : function(items, resp, opts){
							var relatedProductViews = new PrdView.ProductRelatedViews({collection:items});
							$ele.find('#related-products').append(relatedProductViews.render());
						}
					});
					// render related images
					
					var productImgs = new Model.ProductImgs();
					productImgs.url = talalah.com.client.app.entity.product.productImg.get+"?prdId="+pId+"&first=0&max="+max;
					productImgs.fetch({
						success:function(items, resp, opts){
							var productImgViews = new PrdView.ProductImgViews({collection:items});
							$ele.find('#related-img').append(productImgViews.render());
						}
					});
					
					// render comments
					
					var comments = new Model.Comments();
					comments.url = talalah.com.client.app.entity.customer.comment.get+"?pId="+pId+"&first=0&max="+max;
					comments.fetch({
						success:function(items,resp,opts){
							var commentViews = new PrdView.CommentViews({collection:items});
							$ele.find('#comments').append(commentViews.render());
						}
					});
				}
			});
			
			
			
			return $ele;
		}
	}
	
	var endPoint = {
			showCartPage : function(id,cId){
				var cartPage = new CartPage(id,cId);
				return cartPage.render();
			},
			showCartProductPage : function(id,cId,pId,cpId){
				var cartProductPage = new CartProductPage(id,cId,pId,cpId);
				return cartProductPage.render();
			}
	}
	
	return endPoint;
});