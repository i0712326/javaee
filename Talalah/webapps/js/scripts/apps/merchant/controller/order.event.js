/**
 * 
 */
define(function(require,exports,module){
	var Model = require('model');
	var init  = require('init');
	var talalah = init.init();
	var max = talalah.com.client.app.page.max;
	var OrderEvent = function(){
		this.doSearch = function(that,OrderProductViews){
			that.$el.find('#orders').empty();
			that.$el.find('#loading').show();
			var key = that.$el.find('#search-text').val().trim();
			if(key!==''){
				var data = that.model.toJSON();
				var mcId = data.mcId;
				var orderProducts = new Model.OrderProducts();
				orderProducts.url = talalah.com.client.app.entity.order.orderProduct.get+"/merchant/product?mcId="+mcId+"&status=N&name="+key+"%25&first=0&max="+max;
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
			orderProducts.url = talalah.com.client.app.entity.order.orderProduct.get+"/merchant/"+mcId+"?first="+first+"&status=N&max="+max;
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
				orderProducts.url = talalah.com.client.app.entity.order.orderProduct.get+"/merchant/product?mcId="+mcId+"&status=N&name="+key+"%25&first="+first+"&max="+max;
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
			orderProducts.url = talalah.com.client.app.entity.order.orderProduct.get+"/merchant/"+mcId+"?first=0&status=N&max="+max;
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
		
		this.doConfirmTravel = function(that){
			var data = that.model.toJSON();
			var orderJson = data.order;
			var order = new Model.Order();
			order.urlRoot = talalah.com.client.app.entity.order.order.update;
			orderJson.status= "Y";
			order.save(orderJson,{
				success : function(item,resp,opt){
					that.$el.find('#confirm').attr('disabled');
					$('.alert-success').show();
				},
				error : function(item,resp,opt){
					$('.alert-error').show();
				}
			});
		}
		
		this.doConfirmItem = function(that){
			var filename	= that.$el.find('#filename').val();
			var file 		= that.$el.find('input[type=file]')[0].files[0];
			var tacking 	= that.$el.find('#tracking').val();
			var data 		= that.model.toJSON();
			var shippingId 	= data.shipping.id;
			var mcc 		= data.product.merchant.merchantCode.mcc;
			var mcId		= data.product.merchant.mcId;
			var id			= data.product.id;
			
			var orderJson	= data.order;
			orderJson.status = "Y";
			
			var shippingJson = data.shipping;
			shippingJson.status = "Y";
			shippingJson.fileName = filename;
			shippingJson.itemShippingProvider.itemShippingProviderId.item.type="com.emc.app.entity.product.item.Item";
			
			delete shippingJson.itemShippingProvider['item'];
			delete shippingJson.itemShippingProvider['shippingProvider'];
			
			var formData = new FormData();
			formData.append('fileName',	filename);
			formData.append('file',		file);
			formData.append('mcc',	mcc);
			formData.append('mcId',	mcId);
			formData.append('id',	id);
			var uri = "/Talalah/merchant/order/item/update";
			var postData = {
					url : uri,
					data : formData,
					type : 'POST',
		            contentType: false,
		            processData: false,
		            success: function () {
		               var order = new Model.Order();
			   		   order.urlRoot = talalah.com.client.app.entity.order.order.update;
			   		   order.save(orderJson,{
			   				success : function(item,resp,opt){
			   					var shipping = new Model.Shipping();
					               shipping.urlRoot = talalah.com.client.app.entity.shipping.shipping.update;
					               shipping.save(shippingJson,{
					            	   success : function(item,resp,opt){
					            		   that.$el.find('#confirm').attr('disabled');
					            		   $('.alert-success').show();
					            	   },
					            	   error : function(item,resp,opt){
					            		   $('.alert-danger').show();
					            	   }
					               });
			   				},
			   				error : function(item,resp,opt){
			   					$('.alert-danger').show();
			   				}
			   			});
		            },
		            error: function(){
		                alert("error in ajax form submission");
		            }
			};
			$.ajax(postData);
		}
		
		this.doUpload	= function(that){
			that.$el.find('#lefile').click();
			that.$el.find('#lefile').change(function(){
				var file = this.files[0];
				that.$el.find('#filename').val(file.name);
			});
		}
	}
	
	return new OrderEvent;
});
