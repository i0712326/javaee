/**
 * 
 */

define(function(require, exports, module){
	
	var Model = require('model');
	var init  = require('init');
	
	var talalah = init.init();
	var max = talalah.com.client.app.page.max;
	
	var $CustomerProfileEvents = function(){
		this.selectImgFile = function(that){
			that.$el.find('#lefile').click();
			that.$el.find('#lefile').change(function() {
				if (this.files && this.files[0]) {
					var reader = new FileReader();
					reader.onload = function (e) {
						that.$el.find('#profileImg').attr('src', e.target.result);
					}
					reader.readAsDataURL(this.files[0]);
				}
				that.$el.find('#upload').hide();
				that.$el.find('#ok').show();
			});
			
		},
		this.uploadImgFile = function(that){
			that.$el.find('.alert').hide();
			that.$el.find('#ok').hide();
			that.$el.find('#loading').show();
			var dataModel = that.model.toJSON();
			var id = dataModel.id;
			var csrf = $('input[name=_csrf]').val().trim();
			var formData = new FormData();
			formData.append('id',id);
			formData.append('file', that.$el.find('#lefile')[0].files[0]);
			var uri = '/TalalahMerchant/customer/upload/img?_csrf='+csrf;
			var postData = {
					url:uri,
					method:'post',
					contentType: false,
				    processData: false,
				    data:formData,
				    success:function(data){
						that.$el.find('#success').show();
						that.$el.find('#loading').hide();
						that.$el.find('#upload').show();
					},
				    error:function(data){
						that.$el.find('#error').show();
						that.$el.find('#loading').hide();
						that.$el.find('#upload').show();
					}};
			$.ajax(postData);
		},
		this.editUpdateProfile = function(that){
			that.$el.find('#email').removeAttr('disabled');
			that.$el.find('#name').removeAttr('disabled');
			that.$el.find('#edit_pro').hide();
			that.$el.find('#ok1').show();
		},
		this.doUpdateProfile = function(that){

			that.$el.find('#ok1').hide();
			that.$el.find('#loading1').show();
			var email = that.$el.find('#email').val().trim();
			var nameSur = that.$el.find('#name').val().trim();
			var names = nameSur.split(" ");
			var usrname = names[0], surname=names[1];
			
			var newModel = that.model;
			newModel.urlRoot = talalah.com.client.app.entity.customer.customer.update;
			newModel.save({'email' : email,'usrname':usrname,'surname':surname},{
				success:function(item, response, options){
					that.$el.find('#loading1').hide();
					that.$el.find('#edit_pro').show();
					that.$el.find('#success1').show();
					that.$el.find('#email').attr('disabled','disabled');
					that.$el.find('#name').attr('disabled','disabled');
			    },
			    error:function(item, response,opts){
			    	that.$el.find('#loading1').hide();
					that.$el.find('#ok1').show();
					that.$el.find('#error1').show();
			    }
			});
		},
		this.doEditAddr = function(AddressView, that){
			that.$el.find('#edit_addr').hide();
			that.$el.find('#addr-content').empty();
			var addressView = new AddressView({model:that.model});
			that.$el.find('#addr-content').append(addressView.render());
			that.$el.find('#ok2').show();
		},
		this.doUpdateAddr = function(that){
			that.$el.find('#ok2').hide();
			that.$el.find('#loading2').show();
			var country =  that.$el.find('#country').val().trim();
			var city 	=  that.$el.find('#pvId').val().trim();
			var postal 	=  that.$el.find('#postal').val().trim();
			var tel 	=  that.$el.find('#tel').val().trim();
			var fax 	=  that.$el.find('#fax').val().trim();
			var addr1 	=  that.$el.find('#addr1').val().trim();
			var addr2 	=  that.$el.find('#addr2').val().trim();
			var addr3 	=  that.$el.find('#addr3').val().trim();
			
			var newModel = that.model;
			var addr = that.model.toJSON().address;
			addr.country = country;
			addr.postal = postal;
			addr.tel = tel;
			addr.fax = fax;
			addr.address1 = addr1;
			addr.address2 = addr2;
			addr.address3 = addr3;
			var attrs = {address:addr};
					
			newModel.urlRoot = talalah.com.client.app.entity.customer.customer.update;
			newModel.save(attrs,{
				success:function(item, response, options){
					that.$el.find('#loading2').hide();
					that.$el.find('#ok2').show();
					that.$el.find('#success2').show();
			    },
			    error:function(item, response,opts){
			    	that.$el.find('#loading2').hide();
					that.$el.find('#ok2').show();
					that.$el.find('#error2').show();
			    }
			});
		}
		
		this.doLoadMore = function(that, ProductViews){
			that.$el.find('#loader').show();
			that.$el.find('#loadmore').hide();
			var first = that.page*max;
			var products = new Model.Products();
			products.url = talalah.com.client.app.entity.product.product.get+"?rate=1&first="+first+"&max="+max;
			products.fetch({
				success : function(items,resp,opt){
					setTimeout(function(){
						that.$el.find('#loader').hide();
						that.$el.find('#loadmore').show();
						var productViews = new ProductViews({collection:items});
						that.$el.find('#cart-products').append(productViews.render());
					},3000);
					
				}
			});
		}
		
	}
	
	return new $CustomerProfileEvents();
	
});