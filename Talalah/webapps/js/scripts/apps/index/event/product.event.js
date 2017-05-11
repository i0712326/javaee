/**
 * 
 */
define(function(require, exports,module){
	var dateformat = require('dateformat');
	var Model = require('model');
	var init  = require('init');
	var moment = require('moment');
	
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
					
					var product = that.model.toJSON();
					product.type = "com.emc.app.entity.product.item.Item";
					// add quantity to product cart
					
					var appStorage = window.sessionStorage;
					var cart = JSON.parse(appStorage.getItem('cart'));
					var cartProducts = JSON.parse(appStorage.getItem('cartProducts'));
					
					cart.total = cart.total+1;
					cart.sum = cart.sum+product.price;
					var id = cart.id;
					var qty = cart.total;
					var price = product.price;
					var date = new Date();
					var formattedDate = moment(date).format('YYYY-MM-DD');
					var cpid = Math.floor(Math.random()*16777215).toString(16).toUpperCase();
					
					var selectedEl = that.$el.find('input[name=spvd]:checked').parent().parent('.shippingProvider');
					var spvdId = selectedEl.find('.spvdId').text().trim();
					var name = selectedEl.find('.spvdName').text().trim();
					var max	= selectedEl.find('.spvdMax').text().trim();
					var min = selectedEl.find('.spvdMin').text().trim();
					var price = selectedEl.find('.spvdPrice').text().trim();
					var shippingProvider = {id:spvdId, name:name};
					
					max = parseInt(max);
					min = parseInt(min);
					price = parseFloat(price);
					
					var itemShippingProviderId = {item:product, shippingProvider:shippingProvider};
					var itemShippingProvider = {itemShippingProviderId:itemShippingProviderId, price:price, min:min, max:max};
					var shipping = {itemShippingProvider:itemShippingProvider};
					
					var color = that.$el.find('#color').val().trim();
					var size  = that.$el.find('#size').val().trim();
					var width = that.$el.find('#width').val().trim();
					var lenght = that.$el.find('#lenght').val().trim();
					var heigth = that.$el.find('#height').val().trim();
					var type = "com.emc.app.entity.customer.CartItem";
					
					var cartProduct = {
								id:cpid, 
								qty:qty, 
								price : price, 
								cart:cart, 
								product:product, 
								shipping:shipping,
								color:color,
								size :size,
								length:length,
								width : width,
								heigth : heigth,
								type : type
					};
					
					cartProducts.push(cartProduct); 
					
					appStorage.setItem('cartProducts',JSON.stringify(cartProducts));
					appStorage.setItem('cart', JSON.stringify(cart));
					$('#shopCartItems').text(cart.total);
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
				doAddCart : function(that, cartProduct) {
					var product = that.model.toJSON();
					product.type = "com.emc.app.entity.product.travel.Travel";
					
					// add qty to product cart
					
					var appStorage = window.sessionStorage;
					var cart = JSON.parse(appStorage.getItem('cart'));
					var cartProducts = JSON.parse(appStorage.getItem('cartProducts'));
					
					cart.total = cart.total+1;
					cart.sum = cart.sum+product.price;
					var id = cart.id;
					var qty = cart.total;
					var price = product.price;
					var date = new Date();
					var formattedDate = moment(date).format('YYYY-MM-DD');
					var cpid = Math.floor(Math.random()*16777215).toString(16).toUpperCase();
					var type = "com.emc.app.entity.customer.CartTravel";
					var cartProduct = {id:cpid, qty:qty, price : price, cart:cart, product:product, type:type};
					cartProducts.push(cartProduct); 
					
					var strLocalData = JSON.stringify(cartProducts);
					var strCart = JSON.stringify(cart);
					
					appStorage.setItem('cartProducts',strLocalData);
					appStorage.setItem('cart', JSON.stringify(cart));
					$('#shopCartItems').text(cart.total);
				},
				deleteTravel : function(that){
					var data = that.model.toJSON();
					// delete from database storage
					var appStorage = window.sessionStorage;
					var cartProducts = JSON.parse(appStorage.getItem('cartProducts'));
					
					var id = data.id, cPrds = [], total = 0, num = 0;
					for(var i=0;i<cartProducts.length;i++){
						var cartProduct = cartProducts[i];
						var cpid = cartProduct.id;
						if(cpid!==id){
							cPrds.push(cartProduct);
							total = total + cartProduct.product.price;
							num++;
						}
					}
					var strLocalData = JSON.stringify(cPrds);
					appStorage.setItem('cartProducts',strLocalData);
					// update information on the page
					$('.noti_bubble').text(num);
					$('.badge').text(num);
					$('#total').text(num);
					$('#sum').text(total);
					if(num===0){
						$('#empty-info').show();
					}
					// remove view
					that.remove();
				}
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
				},
				doTvlSearch : function(page, that, ProductViews){
					var q = that.$el.find('#travelQuery').val().trim();
					if(q==='') return;
					
					that.$el.find('#loader').show();
					that.$el.find('#products').hide();
					that.$el.find('#loadmore').hide();
					that.$el.find('#nodata').hide();
					
					var products = new Model.Products();
					var url = talalah.com.client.app.entity.product.travel.travel.get;
					var first = (page-1)*max;
					url = url+'/destination/'+q+'/activity/'+q+'?first='+first+'&max='+max;
					products.url = url;
					products.fetch({
						success: function(items, resp, opt){
							setTimeout(function() {
								that.$el.find('#loader').hide();
								if (items.length > 0) {
									var productViews = new ProductViews({collection : items});
									that.$el.find('#products').append(productViews.render());
									that.$el.find('#products').show();
									that.$el.find('#searchmore').show();
								} else {
									that.$el.find('#nodata').show();
								}
							}, 3000);	
						}
					});
				},
				doTvlSearchMore : function(page,that,ProductViews){
					var q = that.$el.find('#travelQuery').val().trim();
					if(q==='') return;
					
					that.$el.find('#loader').show();
					that.$el.find('#products').hide();
					that.$el.find('#loadmore').hide();
					that.$el.find('#nodata').hide();
					
					var products = new Model.Products();
					var url = talalah.com.client.app.entity.product.travel.travel.get;
					var first = (page-1)*max;
					url = url+'/destination/'+q+'/activity/'+q+'?first='+first+'&max='+max;
					products.url = url;
					products.fetch({
						success: function(items, resp, opt){
							setTimeout(function() {
								that.$el.find('#loader').hide();
								if (items.length > 0) {
									var productViews = new ProductViews({collection : items});
									that.$el.find('#products').append(productViews.render());
									that.$el.find('#products').show();
									that.$el.find('#searchmore').show();
								} else {
									that.$el.find('#searchmore').show();
								}
							}, 3000);	
						}
					});
				},
				doAdvTvlSearch : function(page, that, ProductViews){
					that.$el.find('#closeBtn').click();
					that.$el.find('#loader').show();
					that.$el.find('#loadmore').hide();
					that.$el.find('#nodata').hide();
					
					var dest 	= that.$el.find('#destOptions').val();
					var act		= that.$el.find('#actOptions').val();
					var start 	= that.$el.find('#start').val();
					var end 	= that.$el.find('#end').val();
					var adult 	= that.$el.find('#adult').val();
					var child 	= that.$el.find('#child').val();
					
					var check 		= true;
					var checkDest 	= true;
					var checkAct 	= true;
					var checkStart 	= true;
					var checkEnd 	= true;
					var checkAdult 	= true;
					var checkChild 	= true;
					
					if(dest	==='') 	checkDest = false;
					if(act	==='') 	checkAct = false;
					if(start==='') 	checkStart = false;
					if(end	==='') 	check = check && false;
					if(adult==='') 	check = check && false;
					if(child==='') 	check = check && false;
					
					if(check===false) return;
					
					var first = (page - 1)*max;
					
					var products = new Model.Products();
					var url = talalah.com.client.app.entity.product.travel.travel.get+'/details';
					url = url+'?dest='+dest+'&act='+act+'&start='+start+'&end='+end+'&adult='+adult+'&child='+child;
					products.url = url+'&first='+first+'&max='+max;
					products.fetch({
						success:function(items,resp,opt){
							setTimeout(function(){
								that.$el.find('#loader').hide();
								if(items.length>0){
									var prdViews = new ProductViews({collection:items});
									var $ele = prdViews.render();
									that.$el.find('#products').append($ele);
									that.$el.find('#advsearchmore').show();
								}
								else{
									that.$el.find('#nodata').show();
								}
							},3000);
						}
					});
				},
				doAdvTvlSearchMore : function(page, that, ProductViews){
					that.$el.find('#closeBtn').click();
					that.$el.find('#loader').show();
					that.$el.find('#advsearchmore').hide();
					that.$el.find('#nodata').hide();
					
					var dest 	= that.$el.find('#destOptions').val();
					var act		= that.$el.find('#actOptions').val();
					var start 	= that.$el.find('#start').val();
					var end 	= that.$el.find('#end').val();
					var adult 	= that.$el.find('#adult').val();
					var child 	= that.$el.find('#child').val();
					
					var check 		= true;
					var checkDest 	= true;
					var checkAct 	= true;
					var checkStart 	= true;
					var checkEnd 	= true;
					var checkAdult 	= true;
					var checkChild 	= true;
					
					if(dest	==='') 	checkDest	= false;
					if(act	==='') 	checkAct	= false;
					if(start==='') 	checkStart	= false;
					if(end	==='') 	checkEnd 	= false;
					if(adult==='') 	checkAdult	= false;
					if(child==='') 	checkChild	= false;
					
					check = checkDest && checkAct && checkStart && checkEnd && checkAdult && checkChild;
					
					if(check===false) return;
					
					var first = (page-1)*max;
					
					var products = new Model.Products();
					var url = talalah.com.client.app.entity.product.travel.travel.get+'/details';
					url = url+'?dest='+dest+'&act='+act+'&start='+start+'&end='+end+'&adult='+adult+'&child='+child;
					products.url = url+'&first='+first+'&max='+max;
					products.fetch({
						success:function(items,resp,opt){
							setTimeout(function(){
								that.$el.find('#loader').hide();
								if(items.length>0){
									var prdViews = new ProductViews({collection:items});
									var $ele = prdViews.render();
									that.$el.find('#products').append($ele);
									that.$el.find('#advsearchmore').show();
								}
								else{
									that.$el.find('#nodata').show();
								}
							},3000);
						}
					});
				},
				doIteSearch : function(page, that, ProductViews){
					alert('Hello World 3');
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