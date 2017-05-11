/**
 * 
 */

define(function(require,exports,module){
	var init = require('init');
	var Model = require('model');
	var talalah = init.init();
	var max = talalah.com.client.app.page.max;
	var MerchantHomeController = function(){
		this.doUpload = function(that){
			that.$el.find('#thefile').click();
			that.$el.find('#thefile').change(function() {
				if (this.files && this.files[0]) {
					var reader = new FileReader();
					reader.onload = function (e) {
						that.$el.find('#merchant-img').attr('src', e.target.result);
					}
					reader.readAsDataURL(this.files[0]);
				}
				that.$el.find('#upload').hide();
				that.$el.find('#ok').show();
			});
			
		}
		
		this.doUpdateImg = function(that){
			that.$el.find('alert').hide();
			that.$el.find('#imgloader').show();
			that.$el.find('#ok').hide();
			var dataModel = that.model.toJSON();
			var mcId = dataModel.mcId;
			var formData = new FormData();
			formData.append('mcId',mcId);
			formData.append('file', that.$el.find('#thefile')[0].files[0]);
			var uri = '/Talalah/merchant/upload/img';
			
			var postData = {
					url:uri,
					method:'post',
					contentType: false,
				    processData: false,
				    data:formData,
				    success:function(data){
				    	setTimeout(function(){
							that.$el.find('#imgloader').hide();
							that.$el.find('#img .alert-success').show();
							that.$el.find('#upload').show();
						},3000);
					},
				    error:function(data){
				    	setTimeout(function(){
							that.$el.find('#imgloader').hide();
							that.$el.find('#img .alert-danger').show();
							that.$el.find('#upload').show();
						},3000);
					}};
			$.ajax(postData);
		}
		
		this.doUpdateProfile  = function(that){
			that.$el.find('#infoloader').show();
			var surusrname = that.$el.find('#usrname').val().trim();
			var names = surusrname.split("/");
			var usrname = names[0].trim(), surname = names[1].trim();
			var name = that.$el.find('#name').val().trim();
			var type = "com.emc.app.entity.merchant.Merchant"
			var merchantData = {type:type, surname:surname, usrname:usrname,name:name};
			that.model.urlRoot = talalah.com.client.app.entity.merchant.merchant.update;
			that.model.save(merchantData,{
				success : function(item,resp,opt){
					setTimeout(function(){
						that.$el.find('#infoloader').hide();
						that.$el.find('#success2').show();
					},3000);
				},
				error : function(item,resp,opt){
					setTimeout(function(){
						that.$el.find('#infoloader').hide();
						that.$el.find('#failed2').show();
					},3000);
				}
			});
			
		}
		
		this.doEditAddress = function(that, AddressView, DistrictViews){
			var addressView = new AddressView({model:that.model});
			var addrView = addressView.render();
			that.$el.find('#addr-body').html(addrView);
			that.$el.find('#editAddr').hide();
			that.$el.find('#updateAddr').show();
			var districts = new Model.Districts();
			districts.url=talalah.com.client.app.entity.shipping.district.get+"/all?first=0&max=20";
			districts.fetch({
				success:function(items,resp,opts){
					var districtViews = new DistrictViews(addrView);
					districtViews.collection=items;
					that.$el.find('#dist-body').append(districtViews.render());
				}
			});
		}
		
		this.doUpdateAddress = function(that){
			that.$el.find('#addrloader').show();
			var address = that.model.toJSON().address;
			var id = that.$el.find('#distId').val().trim();
			var name	= that.$el.find('#distName').val().trim();
			
			var postal = that.$el.find('#postal').val().trim();
			var email  = that.$el.find('#email').val().trim();
			var fax	   = that.$el.find('#fax').val().trim();
			var tel		= that.$el.find('#tel').val().trim();
			var addr1	= that.$el.find('#addr1').val().trim();
			var addr2	= that.$el.find('#addr2').val().trim();
			var addr3	= that.$el.find('#addr3').val().trim();
			
			var district = {id:id,name:name};
			
			address.district= district;
			address.postal = postal;
			address.email = email;
			address.fax = fax;
			address.tel = tel;
			address.address1 = addr1;
			address.address2 = addr2;
			address.address3 = addr3;
			that.model.urlRoot = talalah.com.client.app.entity.merchant.merchant.update;
			that.model.save({address:address},{
				success:function(item,resp,opt){
					setTimeout(function(){
						that.$el.find('#addr #success3').show();
						that.$el.find('#addrloader').hide();
					},3000);
				},
				error:function(item,resp,opt){
					setTimeout(function(){
						that.$el.find('#addr #failed3').show();
						that.$el.find('#addrloader').hide();
					},3000);
				}
			});
		}
		
		this.doSelect = function(that){	
			var addressView = that.addressView;
			var id = that.model.toJSON().id;
			var name = that.model.toJSON().name;
			$(addressView).find('#distId').val(id);
			$(addressView).find('#distName').val(name);
			$(addressView).find('#districtModal').modal('toggle');
		}
		
		this.doSearch = function(that, ProductViews){
			var keyWord = that.$el.find('#search-text').val().trim();
			var mcId = that.model.toJSON().mcId;
			if(keyWord!==''){
				that.$el.find('#search-loader').show();
				that.$el.find('#loadmore').hide();
				
				var products = new Model.Products();
				products.url = talalah.com.client.app.entity.product.product.get+"/mc/"+mcId+"/prd?name="+keyWord+"%25&first=0&max=20";
				products.fetch({
					success : function(items, resp, opts){
						setTimeout(function(){
							that.$el.find('#search-loader').hide();
							that.$el.find('#search-result').hide();
							that.$el.find('#products').empty();
							if(items.length>0){
								var productViews = new ProductViews({collection:items});
								that.$el.find('#products').append(productViews.render());
							}
							else{
								that.$el.find('#search-result').show();
							}
						},3000);
					}
				});
			}
		}
		
		this.doLoadMore = function(that, ProductViews){
			var page = that.page;
			var first= max*page;
			var mcId = that.model.toJSON().mcId;
			that.$el.find('#loadmore').hide();
			that.$el.find('#loader').show();
			
			var products = new Model.Products();
			products.url = talalah.com.client.app.entity.product.product.get+"/mc/"+mcId+"?first="+first+"&max="+max;
			products.fetch({
				success:function(items,resp,opts){
					setTimeout(function(){
						that.$el.find('#loadmore').show();
						that.$el.find('#loader').hide();
						if(items.length>0){
							var productViews = new ProductViews({collection:items});
							that.$el.find('#products').append(productViews.render());
						}
					},3000);
				}
			});
		}
		
		this.doDelete = function(that){
			that.model.urlRoot = talalah.com.client.app.entity.product.product.remove;
			that.model.destroy({
				success:function(item,resp,opt){
					that.$el.remove();
					$('#delete-success').show();
				},
				error : function(item,resp,opt){
					$('#delete-error').show();
				}
			});
		}
	}
	
	return new MerchantHomeController();
});