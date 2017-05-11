/**
 * 
 */
/**
 * 
 */
define(function(require, exports,module){
	var dateformat = require('dateformat');
	var Model = require('model');
	var init  = require('init');
	
	var talalah = init.init();
	var max = talalah.com.client.app.page.max;
	var ProductEvents = function(){
		this.doLoadMore = function(page, that, ProductRelatedViews){
			that.$el.find('#loadMore').show();
			that.$el.find('#moreItem').hide();
			var products = new Model.Products();
			var first = max*page;
			var mcc = that.model.toJSON().merchant.merchantCode.mcc;
			products.url= talalah.com.client.app.entity.product.product.get+"/mcc?mcc="+mcc+"&review=10&first="+first+"&max="+max;
			products.fetch({
				success : function(items, resp, opts){
					setTimeout(function(){
						that.$el.find('#loadMore').hide();
						that.$el.find('#moreItem').show();
						if(items.length>0){
							var productRelatedViews = new ProductRelatedViews({collection:items});
							that.$el.find('#related-products').append(productRelatedViews.render());
						}
					},3000);
					
				}
			});
		}
		
		this.doPostQuestion = function(that){
			that.$el.find('.modal-alert').hide();
			that.$el.find('#modal-loader').show();
			var custId = $('#custId').val().trim();
			var subject	 = that.$el.find('#subject').val().trim();
			var question = that.$el.find('#questionText').val().trim();
			
			var check = subject.length > 0;
			check = check && question.length > 0;
				
			if(check!==true){
				that.$el.find('#modal-error').show();
				that.$el.find('#modal-loader').hide();
				return false;
			}
			var customer = new Model.Customer({id:custId});
			customer.fetch({
				success : function(item,resp,opts){
					var dateFormat = new DateFormat("yyyy-MM-dd");
					var timeFormat = new DateFormat('HH:mm:ss');
					var data = that.model.toJSON();
					var sender = resp;
					var receiver = data.merchant;
					var date = dateFormat.format(new Date());
					var time = timeFormat.format(new Date());
					var body = question;
					
					var model = {sender:sender, receiver:receiver, subject:subject, body:body, date:date, time:time};
					
					console.log(model);
					
					var newModel = new Model.Message();
					newModel.urlRoot = talalah.com.client.app.entity.user.message.save;
					
					newModel.save(model,{
						success:function(item,resp,opt){
							setTimeout(function(){
								that.$el.find('#modal-success').show();
								that.$el.find('#modal-loader').hide();
								that.$el.find('#postQuestion').attr('disabled','disabled');
							},3000);
							
						},
						error:function(item,resp,opt){
							setTimeout(function(){
								that.$el.find('#modal-error').show();
								that.$el.find('#modal-loader').hide();
							},3000);
							
						}
					});
					
				},
				error : function(item,resp,opts){
					console.log(resp);
				}
			});
			
		}
		
		this.doPostComment = function(that,CommentViews){
			var id = $('#custId').val().trim();
			that.$el.find('#posting').show();
			var customer = new Model.Customer({id:id});
			customer.fetch({
				success : function(item,resp,opts){
					var cust = item.toJSON();
					var product = that.model.toJSON();
					var mcc = that.model.toJSON().merchant.merchantCode.mcc;
					var type = '';
					if(mcc==='4722'){
						type='com.emc.app.entity.product.travel.Travel';
					}
					else{
						type= 'com.emc.app.entity.product.item.Item';
					}
					product.type = type;
					var commentText = that.$el.find('#comment').val().trim();
					var commentData = {customer:cust,product:product,comment:commentText};
					var comment = new Model.Comment();
					comment.urlRoot = talalah.com.client.app.entity.customer.comment.save;
					if(commentText==='') {
						that.$el.find('#posting').hide();
						return;
					}
					comment.save(commentData,{
						success:function(item,resp,opts){
							var comments = new Model.Comments();
							comments.url = talalah.com.client.app.entity.customer.comment.get+"?pId="+product.id+"&first=0&max=5";
							comments.fetch({
								success : function(items, resp, opts){
									setTimeout(function(){
										that.$el.find('#posting').hide();
										var commentViews = new CommentViews({collection:items});
										that.$el.find('#comments').empty();
										that.$el.find('#comment').val('');
										that.$el.find('#comments').append(commentViews.render());
									},3000);
									
								}
							});
						},
						error : function(item,resp,opts){
							that.$el.find('#posting').hide();
						}
					});
				}
			});
		}
		
		this.doLoadComment = function(page, that,CommentViews){
			that.$el.find('#loadComments').show();
			that.$el.find('#moreComment').hide();
			var comments = new Model.Comments();
			var max = 5;
			var first = page*max;
			var prdId = that.model.toJSON().id;
			comments.url = talalah.com.client.app.entity.customer.comment.get+'?pId='+prdId+"&first="+first+"&max="+max;
			comments.fetch({
				success : function(items,reps,opts){
					setTimeout(function(){
						that.$el.find('#loadComments').hide();
						that.$el.find('#moreComment').show();
						if(items.length>0){
							var commentViews = new CommentViews({collection:items});
							that.$el.find('#comments').append(commentViews.render());
						}
					},3000);
				}
			});
		}
		
		this.itemProduct = {
				getTotal : function(that){
					var val = that.$el.find('input[name=spvd]:checked').val().trim();
					var list = [];
					_.each(that.collection.models, function(item){ list.push(item.toJSON()); },that);
					
					var itemShippingProvider = undefined;
					
					_.each(list, function(item){
						var id = item.itemShippingProviderId.shippingProvider.id;
						if(id===val) itemShippingProvider = item;
					},that);
					
					that.itemShippingProvider = itemShippingProvider;
					var index = '#'+val+" > #sPrice";
					var spr = that.$el.find(index).text().trim();
					var sPrice = parseInt(spr);
					var price = that.model.toJSON().price;
					that.$el.find('#total').text(sPrice+price);
				},
				addToCart : function(that){
					var cId = $('#custId').val().trim();;
					var customer = new Model.Customer({id:cId});
					customer.fetch({
						success : function(item, resp, opts){
							var cart = item.toJSON().cart;
							var address = item.toJSON().address;
							var ispvd = that.itemShippingProvider;
							
							var itemShippingProvider = {};
							itemShippingProvider.max = ispvd.max;
							itemShippingProvider.min = ispvd.min;
							itemShippingProvider.price = ispvd.price;
							
							itemShippingProvider.itemShippingProviderId = {};
							
							ispvd.item.type = "com.emc.app.entity.product.item.Item";
							itemShippingProvider.itemShippingProviderId.item = ispvd.item;
							itemShippingProvider.itemShippingProviderId.shippingProvider =  ispvd.shippingProvider;
							
							var product = that.model.toJSON();
							var price = parseInt(that.$el.find('#total').val().trim());
							var color = that.$el.find('#color').val().trim();
							var size  = that.$el.find('#size').val().trim();
							var width = that.$el.find('#width').val().trim();
							var lenght = that.$el.find('#lenght').val().trim();
							var height = that.$el.find('#height').val().trim();
							var qty = 1;
							var shipping = {address : address, itemShippingProvider:itemShippingProvider, address:address}
							var type = "com.emc.app.entity.customer.CartItem";
							product.type = "com.emc.app.entity.product.item.Item";
							var cartItemData = {type:type, cart:cart,product:product,price:price,qty:qty,shipping:shipping,color:color,heigth:height,width:width,size:size};
							var cartItem = new Model.CartItem();
							cartItem.urlRoot = talalah.com.client.app.entity.customer.cartItem.save;
							cartItem.save(cartItemData,{
								success : function(item, resp, opt){
									alert('sucesss');
								}
							});
							
							
						}
					});
					
				},
				buyNow : function(that){
					var cId	= $('#custId').val().trim();
					var customer = new Model.Customer({id:cId});
					customer.fetch({
						success : function(item, resp, opts){
							var data = item.toJSON();
							var address = item.toJSON().address;
							var ispvd = that.itemShippingProvider;
							
							var itemShippingProvider = {};
							itemShippingProvider.max = ispvd.max;
							itemShippingProvider.min = ispvd.min;
							itemShippingProvider.price = ispvd.price;
							
							itemShippingProvider.itemShippingProviderId = {};
							
							ispvd.item.type = "com.emc.app.entity.product.item.Item";
							itemShippingProvider.itemShippingProviderId.item = ispvd.item;
							itemShippingProvider.itemShippingProviderId.shippingProvider =  ispvd.shippingProvider;
							
							var product = that.model.toJSON();
							var price = parseInt(that.$el.find('#total').val().trim());
							var color = that.$el.find('#color').val().trim();
							var size  = that.$el.find('#size').val().trim();
							var width = that.$el.find('#width').val().trim();
							var lenght = that.$el.find('#lenght').val().trim();
							var height = that.$el.find('#height').val().trim();
							var qty = 1;
							var shipping = {address : address, itemShippingProvider:itemShippingProvider, address:address}
							product.type = "com.emc.app.entity.product.item.Item";
							var total	= 1;
							var sum		= that.$el.find('#total').text().trim();
							var order = {customer:data,total:qty,num:price};
							var type = "com.emc.app.entity.order.OrderItem";
							var orderItemData = {type:type, order:order, product:product, shipping:shipping,color:color,heigth:height,width:width,size:size};
							
							var orderItem = new Model.OrderItem();
							orderItem.urlRoot = talalah.com.client.app.entity.order.orderItem.save;
							orderItem.save(orderItemData, {
								success:function(item,resp,opt){
									alert('ok');
								},
								error : function(item,resp,opt){
									alert('error');
								}
							});
						}
					});
					
				}
		}
		
		this.travelProduct	= {
				countDays : function(that){
					var start 	= that.$el.find('#startVal').val().trim();
					var end		= that.$el.find('#endVal').val().trim();
					if(start!=''&end!=''){
						var date1 = new Date(start), date2 = new Date(end);
						var time1 = date1.getTime(), time2 = date2.getTime();
						var diff = 1;
						if(time2 >= time1){
							diff = diff + Math.ceil(Math.abs(time2-time1)/(1000*3600*24));
						}
						that.$el.find('#days').val(diff);
					}
					
				},
				doCheck : function(that){
					that.$el.find('.alert').hide();
					that.$el.find('#action').hide();
					that.$el.find('#checkLoader').show();
					that.$el.find('#check').hide();
					var data =that.model.toJSON();
					
					var start = new Date(data.start);
					var end = new Date(data.end);
					var adult = data.adult;
					var child = data.child;
					var price = data.price;
					
					var oStart = new Date(that.$el.find('#startVal').val().trim());
					var oEnd = new Date(that.$el.find('#endVal').val().trim());
					var oAdult = parseInt(that.$el.find('#adult').val().trim());
					var oChild = parseInt(that.$el.find('#child').val().trim());
					var days   = parseInt(that.$el.find('#days').val().trim());
					
					var checkStart = oStart >= start && oStart <= oEnd;
					var checkEnd = oEnd <= end && oEnd > oStart;
					var checkAdult = oAdult <= adult && oAdult > 0;
					var checkChild = oChild <= child && oChild >= 0;
					
					var check = checkStart && checkEnd && checkAdult && checkChild;
					
					if(check===true){
						var total = (oAdult+oChild)*price*days;
						setTimeout(function(){
							that.$el.find('#total').text(total);
							that.$el.find('#action').show();
							that.$el.find('#checkLoader').hide();
							that.$el.find('#check').show();
						},3000);
					}
					else{
						setTimeout(function(){
							that.$el.find('.alert').show();
							that.$el.find('#checkLoader').hide();
							that.$el.find('#check').show();
						},3000);
					}
					
				},
				doAddCart : function(that) {
					var uId	= $('#custId').val().trim();
					var customer = new Model.Customer({id:uId});
					var product = that.model.toJSON();
					product.type = "com.emc.app.entity.product.travel.Travel";
					customer.fetch({
						success : function(item,resp,opts){
							var data = item.toJSON();
							var cart = data.cart;
							var oStart 	= new Date(that.$el.find('#startVal').val().trim());
							var oEnd 	= new Date(that.$el.find('#endVal').val().trim());
							var oAdult 	= parseInt(that.$el.find('#adult').val().trim());
							var oChild 	= parseInt(that.$el.find('#child').val().trim());
							var days   	= parseInt(that.$el.find('#days').val().trim());
							var total	= 1;
							var sum		= that.$el.find('#total').text().trim();
							var cartTravelData = {type:"com.emc.app.entity.customer.CartTravel", cart:cart, product:product, start:oStart, end : oEnd, adult:oAdult,child :oChild, note:'',qty:total,price:sum};
							
							var cartTravel = new Model.CartTravel();
							cartTravel.urlRoot = talalah.com.client.app.entity.customer.cartTravel.save;
							cartTravel.save(cartTravelData, {
								success:function(item,resp,opt){
									alert('ok');
								},
								error : function(item,resp,opt){
									alert('error');
								}
							})
						}
					});
					
				},
				doBuyNow : function(that){
					var uId = $('#custId').val().trim();
					var customer = new Model.Customer({id:uId});
					var product = that.model.toJSON();
					product.type = "com.emc.app.entity.product.travel.Travel";
					customer.fetch({
						success : function(item,resp,opts){
							var data = item.toJSON();
							var cart = data.cart;
							var oStart 	= new Date(that.$el.find('#startVal').val().trim());
							var oEnd 	= new Date(that.$el.find('#endVal').val().trim());
							var oAdult 	= parseInt(that.$el.find('#adult').val().trim());
							var oChild 	= parseInt(that.$el.find('#child').val().trim());
							var days   	= parseInt(that.$el.find('#days').val().trim());
							var total	= 1;
							var sum		= that.$el.find('#total').text().trim();
							var order = {customer:data,total:sum,num:total};
							var orderTravelData = {type:"com.emc.app.entity.order.OrderTravel", order:order, product:product, start:oStart, end : oEnd, adult:oAdult,child :oChild};
							
							var orderTravel = new Model.OrderTravel();
							orderTravel.urlRoot = talalah.com.client.app.entity.order.orderTravel.save;
							orderTravel.save(orderTravelData, {
								success:function(item,resp,opt){
									alert('ok');
								},
								error : function(item,resp,opt){
									alert('error');
								}
							});
						}
					});
				},
		}
		
		this.productMerchant = {
				doLoadMore : function(page, that,ProductViews){
					var data = that.model.toJSON();
					that.$el.find('#loader').show();
					that.$el.find('#loadmore').hide();
					var products = new Model.Products();
					var mcId = data.mcId;
					var first = page * max;
					products.url = talalah.com.client.app.entity.product.product.get+"/mc/"+mcId+"?review=1&first="+first+"&max="+max;
					products.fetch({
						success : function(items,resp,opts){
							setTimeout(function(){
								that.$el.find('#loader').hide();
								that.$el.find('#loadmore').show();
								if(items.length>0){
									var prdViews = new ProductViews({collection:items});
									that.$el.find('#products').append(prdViews.render());
								}
							},3000);
						}
					});
				}
		}
		
		this.productMerchantCode = {
				doLoadMore : function(page, that,ProductViews){
					var data = that.model.toJSON();
					that.$el.find('#loader').show();
					that.$el.find('#loadmore').hide();
					var products = new Model.Products();
					var mcc =  data.mcc;
					var first = page * max;
					products.url= talalah.com.client.app.entity.product.product.get+"/mcc?mcc="+mcc+"&review=1&first="+first+"&max="+max;
					products.fetch({
						success : function(items,resp,opts){
							setTimeout(function(){
								that.$el.find('#loader').hide();
								that.$el.find('#loadmore').show();
								if(items.length>0){
									var prdViews = new ProductViews({collection:items});
									var $ele = prdViews.render();
									that.$el.find('#products').append($ele);
								}
							},3000);
						}
					});
				}
		}
		
		this.doSearchMore = function(page,that,ProductViews){
			that.$el.find('#loader').show();
			that.$el.find('#loadmore').hide();
			var data = that.model.toJSON();
			var key = data.key;
			var first = page*max;
			var products = new Model.Products();
			products.url = talalah.com.client.app.entity.product.product.get+"/key?key="+key+"%25&first="+first+"&max="+max;
			products.fetch({
				success : function(items, resp, opt){
					setTimeout(function(){
						that.$el.find('#loader').hide();
						that.$el.find('#loadmore').show();
						if(items.length>0){
							var productViews = new ProductViews({collection:items});
							that.$el.find('#products').append(productViews.render());
						}
					},3000);
					
				}
			});
		}
	}
	
	return new ProductEvents();
});