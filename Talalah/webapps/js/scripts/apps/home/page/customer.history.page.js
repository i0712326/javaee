/**
 * 
 */
define(function(require,exports,module){
	
	var Backgrid = require('backgrid');
	var View 	= require('historyView');
	var PrdView	= require('productView');
	var Model	= require('model');
	var init	= require('init');
	var talalah	= init.init();
	var max	= talalah.com.client.app.page.max;
	var HistoryPage = function(id){
		var id = id;
		this.render = function(){
			var customer		= new Model.Customer({id:id});
			var historyPanelView  = new View.HistoryPanelView({model:customer});
			var $ele = historyPanelView.render();
			customer.fetch({
				success : function(item,resp,opt){
					historyPanelView.model = item;
					var orderProducts = new Model.OrderProducts();
					orderProducts.url = talalah.com.client.app.entity.order.orderProduct.get+"/customer/"+id+"?first=0&max="+max;
					orderProducts.fetch({
						success : function(items, response, options){
							if(items.length>0){
								var orderProductViews = new View.OrderProductViews({collection:items});
								$ele.find('#historyDataGrid').empty();
								$ele.find('#historyDataGrid').append(orderProductViews.render());
							}
						}
					});
				}
			});
			return $ele;
		}
		
	}
	
	var HistoryProductPage = function(id,oId,pId,opId){
		var id = id;
		var oId = oId;
		var pId = pId;
		var opId = opId;
		this.render = function(){
			var product = {id:pId};
			var order = {id:oId};
			var orderProduct = new Model.OrderProduct({id:id,order:order,product:product});
			var orderProductView = new View.OrderProductView({model:orderProduct});
			var $ele = orderProductView.render();
			
			var orderProduct = new Model.OrderProduct();
			orderProduct.url = talalah.com.client.app.entity.order.orderProduct.get+"/"+opId;
			orderProduct.fetch({
				success:function(item,resp,opts){
					orderProductView.model = item;
					$ele = orderProductView.render();
					var data = item.toJSON();
					var mcc = data.product.merchant.merchantCode.mcc;
					if(mcc!='4722'){
						var itemOrderView = new View.ItemOrderView({model:item});
						var shippingView = new View.ShippingView({model:item});
						$ele.find('#product-detail').append(itemOrderView.render());
						$ele.find('#shppvdlist').append(shippingView.render());
					}
					else{
						var travelOrderView = new View.TravelOrderView({model:item});
						$ele.find('#product-detail').append(travelOrderView.render());
						var destCols = [{name:'name',cell:'string',editable:false}];
						var destinations = new Model.Destinations();
						destinations.url = talalah.com.client.app.entity.product.travel.destination.get+"/product?first=0&max=100&prdId="+data.product.id;
						var destGrids = new Backgrid.Grid({
							columns : destCols,
							collection : destinations
						});
						var actCols = [{name:'name',cell:'string',editable:false}];
						var activities = new Model.Activities();
						activities.url = talalah.com.client.app.entity.product.travel.activity.get+"/product?first=0&max=100&prdId="+data.product.id;;
						var actGrids = new Backgrid.Grid({
							columns : actCols,
							collection : activities
						});
						
						$ele.find('#destinationList').append(destGrids.render().$el);
						$ele.find('#activitiesList').append(actGrids.render().$el);
						
						destinations.fetch({reset:true});
						activities.fetch({reset:true});
					}
					// related images
					var productImgs = new Model.ProductImgs();
					productImgs.url = talalah.com.client.app.entity.product.productImg.get+"?prdId="+pId+"&first=0&max="+max;
					productImgs.fetch({
						success : function(items, resp, opts){
							var productImgViews = new PrdView.ProductImgViews({collection:items});
							$ele.find('#related-imgs').append(productImgViews.render());
						}
					});
					// related products
					var products = new Model.Products();
					products.url = talalah.com.client.app.entity.product.product.get+"/mcc?mcc="+mcc+"&review=1&first=0&max=6";
					products.fetch({
						success : function(items, resp, opts){
							var productViews = new PrdView.ProductRelatedViews({collection:items});
							$ele.find('#related-products').append(productViews.render());
						}
					})
					// comments
					var comments = new Model.Comments();
					comments.url = talalah.com.client.app.entity.customer.comment.get+"?pId="+pId+"&first=0&max="+max;
					comments.fetch({
						success : function(items, resp, opts){
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
			showHistoryPage : function(id){
				var historyPage = new HistoryPage(id);
				return historyPage.render();
			},
			showHistoryProductPage : function(id,oId,pId,opId){
				var historyProductPage = new HistoryProductPage(id,oId,pId,opId);
				return historyProductPage.render();
			}
	}
	
	return endPoint;
});