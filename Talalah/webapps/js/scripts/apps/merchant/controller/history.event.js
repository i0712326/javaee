/**
 * 
 */
define(function(require,exports,module){
	var Model = require('model');
	var init  = require('init');
	var talalah = init.init();
	var max = talalah.com.client.app.page.max;
	var HistoryEvent = function(){
		this.doSearch = function(that,OrderProductViews){
			that.$el.find('#orders').empty();
			that.$el.find('#loading').show();
			var key = that.$el.find('#search-text').val().trim();
			if(key!==''){
				var data = that.model.toJSON();
				var mcId = data.mcId;
				var orderProducts = new Model.OrderProducts();
				orderProducts.url = talalah.com.client.app.entity.order.orderProduct.get+"/merchant/product?mcId="+mcId+"&status=Y&name="+key+"%25&first=0&max="+max;
				orderProducts.fetch({
					success : function(items,resp,opt){
						setTimeout(function(){
							that.$el.find('#loading').hide();
							that.$el.find('#loadmore').hide();
							that.$el.find('#searchmore').show();
							that.$el.find('#reset').show();
							if(items.length>0){
								var orderProductViews = new OrderProductViews({collection:items});
								that.$el.find('#orders').append(orderProductViews.render());
							}
						},3000);
					}
				});
				
			}
		}
		
		this.doLoadMore = function(page,that,OrderProductViews){
			that.$el.find('#loader').show();
			that.$el.find('#loadmore').hide();
			var data = that.model.toJSON();
			var mcId = data.mcId;
			var orderProducts = new Model.OrderProducts();
			var first = page*max;
			orderProducts.url = talalah.com.client.app.entity.order.orderProduct.get+"/merchant/"+mcId+"?status=Y&first="+first+"&max="+max;
			orderProducts.fetch({
				success : function(items,resp,opt){
					setTimeout(function(){
						that.$el.find('#loader').hide();
						that.$el.find('#loadmore').show();
						if(items.length>0){
							var orderProductViews = new OrderProductViews({collection:items});
							that.$el.find('#orders').append(orderProductViews.render());
						}
					},3000);
				}
			});
		}
		
		this.doSearchMore	= function(page,that,OrderProductViews){
			that.$el.find('#loader').show();
			that.$el.find('#searchmore').hide();
			var key = that.$el.find('#search-text').val().trim();
			if(key!==''){
				var data = that.model.toJSON();
				var mcId = data.mcId;
				var orderProducts = new Model.OrderProducts();
				var first = page*max;
				orderProducts.url = talalah.com.client.app.entity.order.orderProduct.get+"/merchant/product?status=Y&mcId="+mcId+"&name="+key+"%25&first="+first+"&max="+max;
				orderProducts.fetch({
					success : function(items,resp,opt){
						setTimeout(function(){
							that.$el.find('#loader').hide();
							that.$el.find('#searchmore').show();
							if(items.length>0){
								var orderProductViews = new OrderProductViews({collection:items});
								that.$el.find('#orders').append(orderProductViews.render());
							}
						},3000);
					}
				});
			}
		}
		
		this.doReset = function(that,OrderProductViews){
			that.$el.find('#orders').empty();
			that.$el.find('#loading').show();
			that.$el.find('#searchmore').hide();
			that.$el.find('#loadmore').show();
			that.$el.find('#search-text').val('');
			var data = that.model.toJSON();
			var mcId = data.mcId;
			var orderProducts = new Model.OrderProducts();
			orderProducts.url = talalah.com.client.app.entity.order.orderProduct.get+"/merchant/"+mcId+"?status=Y&first=0&max="+max;
			orderProducts.fetch({
				success:function(items,resp,opt){
					setTimeout(function(){
						if(items.length>0){
							that.$el.find('#loading').hide();
							var orderProductViews = new OrderProductViews({collection:items});
							that.$el.find('#orders').append(orderProductViews.render());
						}
					},3000);
					
				}
			});
		}
		
		this.doEval = function(that){
			var data = that.model.toJSON();
			var rate = data.order.customer.rate;
			var cStar = that.$el.find('input[name=cStar]:checked').val().trim();
			updateRate(rate, cStar, that);
			var merchant = data.product.merchant;
			var mcc = merchant.merchantCode.mcc;
			var url = null;
			if(mcc==='4722'){
				data.type ="com.emc.app.entity.order.OrderTravel";
				data.product.type= "com.emc.app.entity.product.travel.Travel";
				url = talalah.com.client.app.entity.order.orderTravel.update;
			}
			else{
				data.type ="com.emc.app.entity.order.OrderItem";
				data.product.type= "com.emc.app.entity.product.item.Item";
				url = talalah.com.client.app.entity.order.orderItem.update;
			}
			var orderProduct = new Model.OrderProduct();
			orderProduct.urlRoot = url;
			data.evalStatus = 'Y';
			orderProduct.save(data,{
				success : function(item,resp,opt){
					that.$el.find('#eval-aler-suc').show();
					that.$el.find('#postEval').attr('disabled','disabled');
				},
				error : function(item,resp,opt){
					that.$el.find('#eval-aler-err').show();
				}
			});
		}
	}
	
	function updateRate(rate, star, that){
		var starNum = parseInt(star);
		switch(starNum){
			case 1 : rate.star1 += 1; break;
			case 2 : rate.star2 += 1; break;
			case 3 : rate.star3 += 1; break;
			case 4 : rate.star4 += 1; break;
			case 5 : rate.star5 += 1; break;
		}
		var total = rate.star1 + rate.star2 + rate.star3 + rate.star4 + rate.star5;
		rate.percent1 = Math.round(rate.star1*100/total).toFixed(2);
		rate.percent2 = Math.round(rate.star2*100/total).toFixed(2);
		rate.percent3 = Math.round(rate.star3*100/total).toFixed(2);
		rate.percent4 = Math.round(rate.star4*100/total).toFixed(2);
		rate.percent5 = Math.round(rate.star5*100/total).toFixed(2);
		
		var rateModel = new Model.Rate();
		rateModel.urlRoot = talalah.com.client.app.entity.user.rate.update;
		rateModel.save(rate,{
			success : function(item,resp,opt){
				that.$el.find('#eval-aler-suc').show();
				that.$el.find('#postEval').attr('disabled','disabled');
			},
			error : function(item,resp,opt){
				that.$el.find('#eval-aler-err').show();
			}
		});
	}
	return new HistoryEvent();
});
