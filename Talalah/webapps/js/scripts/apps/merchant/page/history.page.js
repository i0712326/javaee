/**
 * 
 */
define(function(require,exports,module){
	var Model 	= require('model');
	var OrderView  	= require('order.view');
	var HistoryView	= require('history.view');
	var init	= require('init');
	
	var talalah = init.init();
	var max = talalah.com.client.app.page.max;
	var HistoryPage	= function(mcId){
		var mcId = mcId;
		
		this.render = function(){
			
			var merchant 		= new Model.Merchant({id:mcId});
			var historyMainView = new HistoryView.HistoryMainView({model:merchant});
			var $historyMainEle	= historyMainView.render();
			merchant.fetch({
				success : function(item,resp,opt){
					historyMainView.model = item;
					var id = resp.id;
					var orderProducts = new Model.OrderProducts();
					orderProducts.url = talalah.com.client.app.entity.order.orderProduct.get+"/merchant/"+mcId+"?status=Y&first=0&max="+max;
					orderProducts.fetch({
						success:function(items,resp,opt){
							$historyMainEle.find('#loading').hide();
							if(items.length>0){
								var orderProductViews = new HistoryView.HistoryProductViews({collection:items});
								$historyMainEle.find('#orders').append(orderProductViews.render());
							}
							else{
								$historyMainEle.find('#info').show();
							}
						}
					});
				}
			});
			
			return $historyMainEle;
		}
	}
	
	var HistoryDetailPage	= function(mcId, oId){
		var mcId = mcId;
		var oId = oId;
		this.render = function(){
			var $historyDetailEle	= $('<div></div>');
			var merchant = new Model.Merchant({id:mcId});
			merchant.fetch({
				success : function(item,resp,opt){
					var mcc = resp.merchantCode.mcc;
					if(mcc==='4722'){
						var orderProduct = new Model.OrderTravel({id:oId});
						var orderDetailView	= new HistoryView.HistoryDetailView({model:orderProduct});
						$historyDetailEle.html(orderDetailView.render());
						orderProduct.fetch({
							success : function(ite,resp,opt){
								$historyDetailEle.model = ite;
								var pId = resp.product.id;
								
								var orderTravelProductView 	= new OrderView.OrderTravelProductView({model:ite});
								var $orderTravelProductEle 	= orderTravelProductView.render();
								
								var orderTravelDetailView 	= new OrderView.OrderTravelDetailView({model:ite});
								$orderTravelDetailEle		= orderTravelDetailView.render();
								$orderTravelDetailEle.find('#confirm').hide();
								// fetch destinations for product
								var destinations = new Model.Destinations();
								destinations.url = talalah.com.client.app.entity.product.travel.destination.get+"?prdId="+pId+"&first=0&max=100";
								destinations.fetch({
									success : function(items,resp,opt){
										var destinationViews = new OrderView.DestinationViews({collection:items});
										$orderTravelProductEle.find('#destinations').append(destinationViews.render());
									}
								});
								// fetch activities
								var activities = new Model.Activities();
								activities.url = talalah.com.client.app.entity.product.travel.activity.get+"?prdId="+pId+"&first=0&max=100";
								activities.fetch({
									success:function(items,resp,opt){
										var activityViews	= new OrderView.ActivityViews({collection:items});
										$orderTravelProductEle.find('#activities').append(activityViews.render());
									}
								});
								
								$historyDetailEle.find('#orderDetail').append($orderTravelDetailEle);
								$historyDetailEle.find('#detail').append($orderTravelProductEle);
							}
						});
					}
					else{
						var orderProduct = new Model.OrderItem({id:oId});
						var orderDetailView	= new OrderView.OrderDetailView({model:orderProduct});
						$historyDetailEle.html(orderDetailView.render());
						orderProduct.fetch({
							success : function(ite,resp,opt){
								$historyDetailEle.model = ite;
								var orderItemProductView 	= new OrderView.OrderItemProductView({model:ite});
								var $orderItemProductEle	= orderItemProductView.render();
								var orderItemDetailView		= new OrderView.OrderItemDetailView({model:ite});
								var $orderItemDetailEle		= orderItemDetailView.render();
								$orderItemDetailEle.find('#confirm').hide();
								$orderItemDetailEle.find('.input-group').hide();
								$orderItemDetailEle.find('#shipping').show();
								$historyDetailEle.find('#orderDetail').append($orderItemDetailEle);
								$historyDetailEle.find('#detail').append($orderItemProductEle);
							}
						});
						
					}
				}
			});
			return $historyDetailEle;
			
		}
	}
	
	var endPoint = {
			showHistoryPage : function(mcId){
				var historyPage = new HistoryPage(mcId);
				return historyPage.render();
			},
			showHistoryDetailPage : function(mcId,oId){
				var historyDetailPage = new HistoryDetailPage(mcId,oId);
				return historyDetailPage.render();
			}
	}
	
	return endPoint;
});