/**
 * 
 */
define(function(require,exports,module){
	
	var Model 	= require('model');
	var View  	= require('order.view');
	var init	= require('init');
	
	var talalah = init.init();
	var max = talalah.com.client.app.page.max;
	var OrderPage	= function(mcId){
		var mcId = mcId;
		
		this.render = function(){
			
			var merchant 		= new Model.Merchant({id:mcId});
			var orderMainView 	= new View.OrderMainView({model:merchant});
			var $orderMainEle	= orderMainView.render();
			merchant.fetch({
				success : function(item,resp,opt){
					orderMainView.model = item;
					var id = resp.id;
					var orderProducts = new Model.OrderProducts();
					orderProducts.url = talalah.com.client.app.entity.order.orderProduct.get+"/merchant/"+mcId+"?status=N&first=0&max="+max;
					orderProducts.fetch({
						success:function(items,resp,opt){
							$orderMainEle.find('#loading').hide();
							if(items.length>0){
								var orderProductViews = new View.OrderProductViews({collection:items});
								$orderMainEle.find('#orders').append(orderProductViews.render());
							}
							else{
								$orderMainEle.find('#info').show();
							}
						}
					});
				}
			});
			
			return $orderMainEle;
		}
	}
	
	var OrderDetailPage	= function(mcId, oId){
		var mcId = mcId;
		var oId = oId;
		this.render = function(){
			var $orderDetailEle	= $('<div></div>');
			var merchant = new Model.Merchant({id:mcId});
			merchant.fetch({
				success : function(item,resp,opt){
					var mcc = resp.merchantCode.mcc;
					if(mcc==='4722'){
						var orderProduct = new Model.OrderTravel({id:oId});
						var orderDetailView	= new View.OrderDetailView({model:orderProduct});
						$orderDetailEle.html(orderDetailView.render());
						orderProduct.fetch({
							success : function(ite,resp,opt){
								$orderDetailEle.model = ite;
								var pId = resp.product.id;
								
								var orderTravelProductView 	= new View.OrderTravelProductView({model:ite});
								var $orderTravelProductEle 	= orderTravelProductView.render();
								
								var orderTravelDetailView 	= new View.OrderTravelDetailView({model:ite});
								$orderTravelDetailEle		= orderTravelDetailView.render();
								
								// fetch destinations for product
								var destinations = new Model.Destinations();
								destinations.url = talalah.com.client.app.entity.product.travel.destination.get+"?prdId="+pId+"&first=0&max=100";
								destinations.fetch({
									success : function(items,resp,opt){
										var destinationViews = new View.DestinationViews({collection:items});
										$orderTravelProductEle.find('#destinations').append(destinationViews.render());
									}
								});
								// fetch activities
								var activities = new Model.Activities();
								activities.url = talalah.com.client.app.entity.product.travel.activity.get+"?prdId="+pId+"&first=0&max=100";
								activities.fetch({
									success:function(items,resp,opt){
										var activityViews	= new View.ActivityViews({collection:items});
										$orderTravelProductEle.find('#activities').append(activityViews.render());
									}
								});
								
								$orderDetailEle.find('#orderDetail').append($orderTravelDetailEle);
								$orderDetailEle.find('#detail').append($orderTravelProductEle);
							}
						});
					}
					else{
						var orderProduct = new Model.OrderItem({id:oId});
						var orderDetailView	= new View.OrderDetailView({model:orderProduct});
						$orderDetailEle.html(orderDetailView.render());
						orderProduct.fetch({
							success : function(ite,resp,opt){
								$orderDetailEle.model = ite;
								var orderItemProductView 	= new View.OrderItemProductView({model:ite});
								var $orderItemProductEle	= orderItemProductView.render();
								var orderItemDetailView		= new View.OrderItemDetailView({model:ite});
								var $orderItemDetailEle		= orderItemDetailView.render();
								$orderDetailEle.find('#orderDetail').append($orderItemDetailEle);
								$orderDetailEle.find('#detail').append($orderItemProductEle);
							}
						});
						
					}
				}
			});
			return $orderDetailEle;
			
		}
	}
	
	var endPoint = {
			showOrderPage : function(mcId){
				var orderPage = new OrderPage(mcId);
				return orderPage.render();
			},
			showOrderDetailPage : function(mcId,oId){
				var orderDetailPage = new OrderDetailPage(mcId,oId);
				return orderDetailPage.render();
			}
	}
	
	return endPoint;
	
});
