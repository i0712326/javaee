/**
 * 
 */
define(function(require, exports, module){
	
	var Model 	= require('model');
	var init  	= require('init');
	var View	= require('productView');
	
	var talalah = init.init();
	var max	= talalah.com.client.app.page.max;
	var HistoryPanelEvents = function(){
		this.doLoadMore = function(e, page, that, OrderProductViews){
			e.preventDefault();
			var data = that.model.toJSON();
			var id = data.id;
			var first = max*page;
			that.$el.find('#loader').show();
			that.$el.find('#loadmore').hide();
			var orderProducts = new Model.OrderProducts();
			orderProducts.url = talalah.com.client.app.entity.order.orderProduct.get+"/customer/"+id+"?first="+first+"&max="+max;
			orderProducts.fetch({
				success : function(items, response, options){
					setTimeout(function(){
						if(items.length>0){
							var orderProductViews = new OrderProductViews({collection:items});
							that.$el.find('#historyDataGrid').append(orderProductViews.render());
						}
						that.$el.find('#loader').hide();
						that.$el.find('#loadmore').show();
					},3000);
					
				}
			});
		}
		
		this.doSearch = function(e,that, OrderProductViews){
			e.preventDefault();
			var keyWord = that.$el.find('#search-text').val().trim();
			if(keyWord != ''){
				that.$el.find('#historyDataGrid').empty();
				that.$el.find('#loader0').show();
				that.keyWord = keyWord;
				var cId = that.model.toJSON().id;
				var orderProducts = new Model.OrderProducts();
				orderProducts.url = talalah.com.client.app.entity.order.orderProduct.get+"/product?cId="+cId+"&name="+keyWord+"%25&first=0&max="+max;
				orderProducts.fetch({
					success : function(items, response, options){
						setTimeout(function(){
							if(items.length>0){
								var orderProductViews = new OrderProductViews({collection:items});
								that.$el.find('#historyDataGrid').empty();
								that.$el.find('#historyDataGrid').append(orderProductViews.render());
							}
							that.$el.find('#loader0').hide();
							that.$el.find('#loadmore').hide();
							that.$el.find('#searchmore').show();
						},3000);
						
					}
				});
			}
		}
		
		this.doSearchMore = function(e,page,that,OrderProductViews){
			e.preventDefault();
			var keyWord = that.keyWord;
			if(keyWord != ''){
				that.$el.find('#loader').show();
				that.$el.find('#searchmore').hide();
				that.keyWord = keyWord;
				var max = 5;
				var first = max*page;
				var cId = that.model.toJSON().id;
				var orderProducts = new Model.OrderProducts();
				orderProducts.url = talalah.com.client.app.entity.order.orderProduct.get+"/product?cId="+cId+"&name="+keyWord+"%25&first="+first+"&max="+max;
				orderProducts.fetch({
					success : function(items, response, options){
						setTimeout(function(){
							if(items.length>0){
								var orderProductViews = new OrderProductViews({collection:items});
								that.$el.find('#historyDataGrid').append(orderProductViews.render());
							}
							that.$el.find('#loader').hide();
							that.$el.find('#searchmore').show();
						},3000);
					}
				});
			}
		}
		
		this.orderItemEvent = {
				doDelete : function(e, that){
					e.preventDefault();
					var data = that.model.toJSON();
					var id = data.id;
					var newModel = that.model;
					newModel.url = talalah.com.client.app.entity.order.orderProduct.remove+"/"+id;
					newModel.destroy({
						success : function(item,resp,opt){
							that.remove();
							$('.alert-success').show();
						},
						error : function(item,resp,opt){
							$('.alert-error').show();
						}
					});
				}
		}
		
		this.orderTravelEvent = {
				doDelete :  function(e, that){
					e.preventDefault();
					var data = that.model.toJSON();
					var id = data.id;
					var newModel = that.model;
					newModel.url = talalah.com.client.app.entity.order.orderProduct.remove+"/"+id;
					newModel.destroy({
						success : function(item,resp,opt){
							that.remove();
							$('.alert-success').show();
						},
						error : function(item,resp,opt){
							$('.alert-error').show();
						}
					});
				}
		}
		
		this.orderProductEvent = {
				doLoadMore : function(page, that){
					that.$el.find('#loadmore').hide();
					that.$el.find('#loader').show();
					
					var max =5;
					var first = page*max;
					var data = that.model.toJSON();
					var pId = data.product.id;
					var comments = new Model.Comments();
					comments.url = talalah.com.client.app.entity.customer.comment.get+"?pId="+pId+"&first="+first+"&max="+max;
					comments.fetch({
						success : function(items, resp, opts){
							setTimeout(function(){
								that.$el.find('#loadmore').show();
								that.$el.find('#loader').hide();
								if(items.length>0){
									var commentViews = new View.CommentViews({collection:items});
									that.$el.find('#comments').append(commentViews.render());
								}
							},3000);
						}
					});
					
				},
				doEvaluate : function(that){
					var data = that.model.toJSON();
					var product = data.product;
					var merchant = data.product.merchant;
					
					var pRate = product.rate;
					var pStar = that.$el.find('input[name=pStar]:checked').val().trim();
					updateRate(pRate,pStar,that);
					
					var mRate = merchant.rate;
					var mStar = that.$el.find('input[name=mStar]:checked').val().trim();
					
					updateRate(mRate,mStar,that);
					
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
					data.updateStatus = 'Y';
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
		
	};
	
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
	
	return new HistoryPanelEvents();
	
});