/**
 * 
 */
define(function(require, exports, module){
	
	var PrdView = require('productView');
	var Model 	= require('model');
	var init  	= require('init');
	
	var talalah = init.init();
	var max		= talalah.com.client.app.page.max;
	var CartPanelAction = function(){
		this.doSearch = function(cId, that, CartProductViews){
			var keyWord = that.$el.find('#search-text').val().trim();
			if(keyWord!=''){
				that.$el.find('#loader').show();
				var cartProducts = new Model.CartProducts();
				cartProducts.url = talalah.com.client.app.entity.customer.cartproduct.get+"/product?cId="+cId+"&name="+keyWord+"%25&first=0&max="+max;
				cartProducts.fetch({
					success : function(items,resp,opts){
						that.$el.find('#loader').hide();
						var cartProductViews = new CartProductViews({collection:items});
						that.$el.find('#cartProductDataGrid').empty();
						that.$el.find('#cartProductDataGrid').append(cartProductViews.render());
					}
				});
				
			}
		}
		this.doChangeSearchPage = function(keyWord, page, cId, that, CartProductViews){
			var cartProducts = new Model.CartProducts();
			var first = page*3;
			cartProducts.url = talalah.com.client.app.entity.customer.cartProduct.get+"/product?cid="+cId+"&name="+keyWord+"&first="+first+"&max="+max;
			cartProducts.fetch({
				success:function(items,resp,opts){
					var cartProductViews = new CartProductViews({collection:items});
					that.$el.find('#cartProductDataGrid').append(cartProductViews.render());
				}
			});
		}
		this.doEditAddr = function(that, AddressEditView){
			var addrressEditView = new AddressEditView({model:that.model});
			that.$el.find('#address').empty();
			that.$el.find('#address').append(addrressEditView.render());
			that.$el.find('#editAddr').hide();
			that.$el.find('#ok').show();
		}
		this.doUpdateAddr = function(that){
			that.$el.find('#ok').hide();
			that.$el.find('#loader1').show();
			var country =  that.$el.find('#country').val().trim();
			var city 	=  that.$el.find('#pvId').val().trim();
			var postal 	=  that.$el.find('#postal').val().trim();
			var tel 	=  that.$el.find('#tel').val().trim();
			var fax 	=  that.$el.find('#fax').val().trim();
			var addr1 	=  that.$el.find('#addr1').val().trim();
			var addr2 	=  that.$el.find('#addr2').val().trim();
			var addr3 	=  that.$el.find('#addr3').val().trim();
			
			var addr = that.model.toJSON().address;
			addr.country = country;
			addr.postal = postal;
			addr.tel = tel;
			addr.fax = fax;
			addr.address1 = addr1;
			addr.address2 = addr2;
			addr.address3 = addr3;
			var attrs = {address:addr};
			that.model.urlRoot = talalah.com.client.app.entity.customer.customer.update;
			that.model.save(attrs,{
				success:function(items,resp,opts){
					that.$el.find('.alert-success').show();
					that.$el.find('#ok').show();
					that.$el.find('#loader1').hide();
				},
				error :function(item,resp,opts){
					that.$el.find('.alert-danger').show();
					that.$el.find('#ok').show();
					that.$el.find('#loader1').hide();
				}
			});
		}
		
		this.doChangePage = function(page, id, cId, that, CartProductViews){
			var cartProducts = new Model.CartProducts();
			var first = page*3;
			
			cartProducts.url = talalah.com.client.app.entity.customer.cartproduct.get+"?cId="+cId+"&first="+first+"&max="+max;
			cartProducts.fetch({
				success:function(items,resp,opts){
					if(items.length>0){
						var cartProductViews = new CartProductViews({collection:items});
						that.$el.find('#cartProductDataGrid').empty();
						that.$el.find('#cartProductDataGrid').append(cartProductViews.render(id));
						that.$el.find('#backward').removeAttr('disabled');
						if(items.length<3)
							that.$el.find('#forward').attr('disabled','disabled');
					}
					else{
						that.$el.find('#forward').attr('disabled','disabled');
					}
				}
			});
		}
		
		this.doCheckOut = function(that){
			
			var data = that.model.toJSON();
			var cId = data.cart.customer.id;
			var cpId = data.id;
			var csrf = $('input[name=_csrf]').val().trim();
			var params = {_csrf:csrf, cId : cId, cpId : cpId };
			var url = '/Talalah/order/travel/save';
			$.post(url,params,function(resp){
				var customer = new Model.Customer({id:cId});
				customer.fetch({
					success:function(item, resp, opt){
						var dat = item.toJSON();
						var total = dat.cart.total;
						var sum	  = dat.cart.sum;
						$('#shopCartItems').text(total);
						$('#cart-total').text(total);
						$('.badge').text(total);
						$('#cart-sum').text(sum);
						
						//pop up dialog
						$('#MsgDialog').modal('toggle');
						$('#MsgDialog').find('.alert-success').show();
						
						that.remove();
					}
				});
				
			});
			
		}
		
		this.doDelete = function(that, CartProductViews){
			
			var data = that.model.toJSON();
			var id = data.id;
			var cId = data.cart.id;
			var ce = that;
			that.model.urlRoot = talalah.com.client.app.entity.customer.cartproduct.remove;
			that.model.destroy({
				success : function(item,resp,opts){
					that.remove();
					var cartProducts = new Model.CartProducts();
					cartProducts.url = talalah.com.client.app.entity.customer.cartproduct.get+"?cId="+cId+"&first=0&max="+max;
					cartProducts.fetch({
						success : function(items, resp, opts){
							var id = that.custId;
							var cartProductViews = new CartProductViews({collection:items});
							$('#cartProductDataGrid').empty();
							$('#cartProductDataGrid').append(cartProductViews.render(id));
							var customer = new Model.Customer({id:id});
							customer.fetch({
								success:function(item, resp, opt){
									var data = item.toJSON();
									var total = data.cart.total;
									var sum = data.cart.sum;
									$('#shopCartItems').text(total);
									$('#cart-total').text(total);
									$('.badge').text(total);
									$('#cart-sum').text(sum);
								}
							});
						}
					});
				}
			});
		}
		
		this.doLoadMoreComments = function(that){
			that.$el.find('#loader').show();
			that.$el.find('#loadmore').hide();
			var data = that.model.toJSON();
			var pId = data.product.id;
			var first = max*that.page;
			var comments = new Model.Comments();
			comments.url = talalah.com.client.app.entity.customer.comment.get+"?pId="+pId+"&first="+first+"&max="+max;
			comments.fetch({
				success:function(items,resp,opts){
					setTimeout(function(){
						that.$el.find('#loader').hide();
						that.$el.find('#loadmore').show();
						var commentViews = new PrdView.CommentViews({collection:items});
						that.$el.find('#comments').append(commentViews.render());
					}, 3000);
					
				}
			});
		}
	}
	
	return new CartPanelAction();
	
});