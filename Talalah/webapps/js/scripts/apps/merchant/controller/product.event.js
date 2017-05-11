/**
 * 
 */
define(function(require,exports,module){
	var Model = require('model');
	var init  = require('init');
	
	var talalah = init.init();
	
	var ProductEvents = function(){
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
		
		this.doUploadImg = function(that){
			that.$el.find('.alert').hide();
			that.$el.find('#lefile').click();
			that.$el.find('#lefile').change(function() {
				if (this.files && this.files[0]) {
					var reader = new FileReader();
					reader.onload = function (e) {
						that.$el.find('#productImg').attr('src', e.target.result);
					}
					reader.readAsDataURL(this.files[0]);
				}
				that.$el.find('#upload').hide();
				that.$el.find('#imgloader').show();
				var data = that.model.toJSON();
				var mcc	 = data.merchant.merchantCode.mcc;
				var mcId = data.merchant.mcId;
				var id	 = data.id;
				var formData = new FormData();
				formData.append('mcc',mcc);
				formData.append('mcId',mcId);
				formData.append('id',id);
				formData.append('file', that.$el.find('#lefile')[0].files[0]);
				var uri = '/Talalah/merchant/product/upload/img';
				var postData = {
						url:uri,
						method:'post',
						contentType: false,
					    processData: false,
					    data:formData,
					    success:function(data){
					    	setTimeout(function(){					    		
					    		that.$el.find('.alert-success').show();
					    		that.$el.find('#imgloader').hide();
					    		that.$el.find('#upload').show();
					    	},3000);
						},
					    error:function(data){
					    	setTimeout(function(){
					    		that.$el.find('.alert-danger').show();
								that.$el.find('#imgloader').hide();
								that.$el.find('#upload').show();
					    	},3000);
							
						}};
				$.ajax(postData);
				
			});
		}
		
		this.doEdit = function(that){
			that.$el.find('input').removeAttr('disabled');
			that.$el.find('#ok').show();
			that.$el.find('#edit').hide();
		}
		
		this.doUpdateInfo = function(that){
			that.$el.find('img').show();
			that.$el.find('.alert').hide();
			var name = that.$el.find('input[name=name]').val().trim();
			var price = that.$el.find('input[name=price]').val().trim();
			var url	= that.$el.find('input[name=url]').val().trim();			
			
			var json = that.model.toJSON();
			var mcc = json.merchant.merchantCode.mcc;
			var type = null;
			var urlRoot = null;
			if(mcc==='4722'){
				type = "com.emc.app.entity.product.travel.Travel";
				urlRoot =  talalah.com.client.app.entity.product.travel.travel.update;
			}
			else{
				type = "com.emc.app.entity.product.item.Item";
				urlRoot =  talalah.com.client.app.entity.product.item.item.update;
			}
			
			var data = {name:name,price:price,url:url,type:type};
			var model = that.model;
			that.model.urlRoot = urlRoot;
			model.save(data,{
				success : function(item,resp,opt){
					setTimeout(function(){
						that.$el.find('img').hide();
						that.$el.find('.alert-success').show();
					},3000);
				},
				error : function(item, resp,opt){
					that.$el.find('img').hide();
					that.$el.find('.alert-success').show();
				}
			});
		}
		
		this.doSaveProduct = function(that){
			var id 		= 	that.$el.find('input[name=id]').val().trim();
			var name 	=	that.$el.find('input[name=name]').val().trim();
			var price	=	that.$el.find('input[name=price]').val().trim();
			var url		=	that.$el.find('input[name=url]').val().trim();
			
			var check = (id!=='')&&(name!=='')&&(price!=='');
			
			if(check===false){
				that.$el.find('.alert-danger').show();
				return false;
			}
			
			var urlRoot = null;
			var type	= null;
			var data 	= that.model.toJSON();
			var merchant	= data.merchant;
			var mcc 		= merchant.merchantCode.mcc;
			var productCategory	= null;
			if(mcc==='4722'){
				urlRoot = '/Talalah/merchant/product/add/travel';
				type = "com.emc.app.entity.product.travel.Travel";
				productCategory = {id:'T',note:'TRAVEL'};
			}
			else{
				urlRoot = '/Talalah/merchant/product/add/item';
				type = "com.emc.app.entity.product.item.Item";
				productCategory = {id:'I',note:'ITEM'};
			}
			var model	= 	{pId : id, name : name, price : price, url : url, type : type, merchant : merchant, productCategory : productCategory};
			var product = 	new Model.Product();
			product.urlRoot = urlRoot;
			product.save(model,{
				success : function(item,resp,opt){
					that.$el.find('#next').attr('href','#Products/Customer/'+merchant.mcId+"/"+id);
					that.$el.find('#next-page').click();
				},
				error : function(item,resp,opt){
					that.$el.find('.alert-danger').show();
				}
			});
		}
		
		this.doEditShDes = function(that){
			that.$el.find('textarea').removeAttr('disabled');
			that.$el.find('#ok').show();
			that.$el.find('#edit').hide();
		}
		
		this.doUpdateShDes = function(that){
			that.$el.find('img').show();
			var shDes = that.$el.find('#short-des').val().trim();
			
			var check = shDes.length > 0;
			if(check === false){
				that.$el.find('.alert-danger').show();
				return false;
			}
			
			var json = that.model.toJSON();
			var mcc = json.merchant.merchantCode.mcc;
			var type = null;
			var urlRoot = null;
			if(mcc==='4722'){
				type = "com.emc.app.entity.product.travel.Travel";
				urlRoot =  talalah.com.client.app.entity.product.travel.travel.update;
			}
			else{
				type = "com.emc.app.entity.product.item.Item";
				urlRoot =  talalah.com.client.app.entity.product.item.item.update;
			}
			
			var data = {shDes:shDes,type:type};
			that.model.urlRoot = urlRoot;
			that.model.save(data,{
				success : function(item,resp,opt){
					setTimeout(function(){
						that.$el.find('img').hide();
						that.$el.find('.alert-success').show();
					},3000);
				},
				error : function(item, resp,opt){
					that.$el.find('img').hide();
					that.$el.find('.alert-danger').show();
				}
			});
		}
		
		/* update travel detail */
		
		this.doEditDetail = function(that){
			that.$el.find('input').removeAttr('disabled');
			that.$el.find('#edit1').hide();
			that.$el.find('#ok1').show();
		}
		
		this.doUpdateDetail = function(that){
			that.$el.find('#infoloader1').show();
			that.$el.find('#ok1').hide();
			
			var accom = that.$el.find('input[name=accom]').val().trim(),
				adult = that.$el.find('input[name=adult]').val().trim(),
				child = that.$el.find('input[name=child]').val().trim(),
				pickUp = that.$el.find('input[name=pickUp]').val().trim(),
				transport = that.$el.find('input[name=transport]').val().trim(),
				start = that.$el.find('input[name=start]').val().trim(),
				end = that.$el.find('input[name=end]').val().trim(),
				days = that.$el.find('input[name=days]').val().trim(),
				food = that.$el.find('input[name=food]').val().trim(),
				guide = that.$el.find('input[name=guide]').val().trim();
			
			var check = accom.length > 0 ;
			check = check && adult.length > 0;
			check = check && child.length > 0;
			check = check && pickUp.length	> 0;
			check = check && transport.length > 0;
			check = check && start.length > 0;
			check = check && start.end > 0;
			check = check && start.days > 0;
			check = check && start.food > 0;
			check = check && start.guide > 0;
			
			if(check===true){
				that.$el.find('.alert-danger').show();
				return false;
			}
			
			var json = that.model.toJSON();
			var mcc = json.merchant.merchantCode.mcc;
			var type = null;
			var urlRoot = null;
			if(mcc==='4722'){
				type = "com.emc.app.entity.product.travel.Travel";
				urlRoot =  talalah.com.client.app.entity.product.travel.travel.update;
			}
			else{
				type = "com.emc.app.entity.product.item.Item";
				urlRoot =  talalah.com.client.app.entity.product.item.item.update;
			}
			var data = {accom:accom, adult:adult,child:child,pickUp:pickUp,transport:transport,start:start,end:end,days:days,food:food,guide:guide,type:type};
			that.model.urlRoot = urlRoot;
			that.model.save(data,{
				success : function(item,resp,opt){
					setTimeout(function(){
						that.$el.find('#infoloader1').hide();
						that.$el.find('#ok1').show();
						that.$el.find('.success1').show();
					},3000);
				},
				error : function(item, resp,opt){
					that.$el.find('#infoloader1').hide();
					that.$el.find('#ok1').show();
					that.$el.find('.error1').show();
				}
			});
		}
		
		this.doEditDest = function(that, DestinationEditViews){
			// 2.fetch product destinations
			that.$el.find('#edit').hide();
			that.$el.find('#ok').show();
			var pId = that.model.toJSON().id;
			var dests = new Model.Destinations();
			dests.url = talalah.com.client.app.entity.product.travel.destination.get+"/product?prdId="+pId+"&first=0&max=20";
			dests.fetch({
				success :function(items,resp,opts){
					var arrays = _.pluck(items.toJSON(),"id");
					var destinations = new Model.Destinations();
					destinations.url = talalah.com.client.app.entity.product.travel.destination.get+"?first=0&max=20";
					destinations.fetch({
						success:function(ites, resp, opts){
							var destEditViews = new DestinationEditViews({collection:ites});
							var eles = destEditViews.render(arrays);
							that.$el.find('#destinations').empty();
							that.$el.find('#destinations').append(eles);
						}
					});
				}
			});
		}
		
		this.doUpdateDest = function(that){
			that.$el.find('img').show();
			that.$el.find('#ok').hide();
			var items = that.$el.find('input[type=checkbox]:checked');
			var itemArrays = items.toArray();
			var destinations = [];
			$.each(itemArrays,function(ind,item){
				var destId = $(item).val().trim();
				var destName = $(item).next().val().trim();
				var destObj = {id:destId,name:destName};
				destinations.push(destObj);
			});
			
			var product = that.model.toJSON();
			var id = product.id;
			var travelDestinations = new Model.TravelDestinations();
			travelDestinations.urlRoot = talalah.com.client.app.entity.product.travel.travel.update+"/"+id+"/destinations";
			travelDestinations.save({id:id,destinations:destinations},{
				success : function(item,resp,opt){
					setTimeout(function(){
						that.$el.find('img').hide();
						that.$el.find('.alert-success').show();
						that.$el.find('#ok').show();
					},3000);
				},
				error:function(item,resp,opt){
					setTimeout(function(){
						that.$el.find('img').hide();
						that.$el.find('.alert-error').show();
						that.$el.find('#ok').show();
					},3000);
				}
			});
			
		}
		
		this.doEditActivities = function(that,ActivityEditViews){
			that.$el.find('#edit').hide();
			that.$el.find('#ok').show();
			var pId = that.model.toJSON().id;
			var activities = new Model.Activities();
			activities.url = talalah.com.client.app.entity.product.travel.activity.get+"/product?prdId="+pId+"&first=0&max=20";
			activities.fetch({
				success :function(items,resp,opts){
					var arrays = _.pluck(items.toJSON(),"id");
					var acts = new Model.Activities();
					acts.url = talalah.com.client.app.entity.product.travel.activity.get+"?first=0&max=20";
					acts.fetch({
						success:function(ites, resp, opts){
							var actEditViews = new ActivityEditViews({collection:ites});
							var eles = actEditViews.render(arrays);
							that.$el.find('#activities').empty();
							that.$el.find('#activities').append(eles);
						}
					});
				}
			});
		}
		
		this.doUpdateActivities = function(that){
			that.$el.find('#ok').hide();
			that.$el.find('img').show();
			var items = that.$el.find('input[type=checkbox]:checked');
			var itemArrays = items.toArray();
			var activities = [];
			$.each(itemArrays,function(ind,item){
				var actId = $(item).val().trim();
				var actName = $(item).next().val().trim();
				var actObj = {id:actId,name:actName};
				activities.push(actObj);
			});
			
			var product = that.model.toJSON();
			var id = product.id;
			var travelActivities = new Model.TravelActivities();
			travelActivities.urlRoot = talalah.com.client.app.entity.product.travel.travel.update+"/"+id+"/activities";
			travelActivities.save({id:id,activities:activities},{
				success : function(item,resp,opt){
					setTimeout(function(){
						that.$el.find('img').hide();
						that.$el.find('.alert-success').show();
						that.$el.find('#ok').show();
					},3000);
				},
				error:function(item,resp,opt){
					setTimeout(function(){
						that.$el.find('img').hide();
						that.$el.find('.alert-error').show();
						that.$el.find('#ok').show();
					},3000);
				}
			});
		}
		
		this.uploadRelateImg = function(that){
			that.$el.find('.glyphicon-ok').hide();
			that.$el.find('.glyphicon-remove').hide();
			that.$el.find('input[type=file]').click();
			that.$el.find('button').hide();
			that.$el.find('input[type=file]').change(function() {
				that.$el.find('#load').show();
				if (this.files && this.files[0]) {
					var reader = new FileReader();
					reader.onload = function (e) {
						that.$el.find('#img').attr('src', e.target.result);
					}
					reader.readAsDataURL(this.files[0]);
				}
				
				var data = that.model.toJSON();
				var mcc	 = data.product.merchant.merchantCode.mcc;
				var mcId = data.product.merchant.mcId;
				var id	 = data.product.id;
				var name = data.picName;
				var formData = new FormData();
				formData.append('mcc',mcc);
				formData.append('mcId',mcId);
				formData.append('id',id);
				formData.append('name',name);
				formData.append('file', that.$el.find('input[type=file]')[0].files[0]);
				var uri = '/Talalah/merchant/product/upload/relate/img';
				var postData = {
						url:uri,
						method:'post',
						contentType: false,
					    processData: false,
					    data:formData,
					    success:function(data){
					    	setTimeout(function(){					    		
					    		that.$el.find('.glyphicon-ok').show();
					    		that.$el.find('#load').hide();
					    		that.$el.find('button').show();
					    	},3000);
						},
					    error:function(data){
					    	setTimeout(function(){
					    		that.$el.find('.glyphicon-remove').show();
								that.$el.find('#load').hide();
								that.$el.find('button').show();
					    	},3000);
							
						}};
				$.ajax(postData);
				
			});
		}
		
		this.doUpdateLongDes = function(that){
			that.$el.find('img').show();
			var loDes = that.$el.find('#long-des').val().trim();
			
			var check = loDes.length > 0;
			if(check === false){
				that.$el.find('.alert-danger').show();
				return false;
			}
			
			var json = that.model.toJSON();
			var mcc = json.merchant.merchantCode.mcc;
			var type = undefined;
			var urlRoot = undefined;
			if(mcc==='4722'){
				type = "com.emc.app.entity.product.travel.Travel";
				urlRoot = talalah.com.client.app.entity.product.travel.travel.update;
			}
			else{
				type = "com.emc.app.entity.product.item.Item";
				urlRoot = talalah.com.client.app.entity.product.item.item.update;
			}
			that.model.urlRoot = urlRoot;
			that.model.save({loDes:loDes,type:type},{
				success : function(item,resp,opt){
					that.$el.find('img').hide();
					that.$el.find('.alert-success').show();
				},
				error : function(item,resp,opt){
					that.$el.find('img').hide();
					that.$el.find('.alert-error').show();
				}
			});
		}
		
		this.doEditItem = function(that){
			that.$el.find('input[type=text]').removeAttr('disabled');
			that.$el.find('#ok1').show();
			that.$el.find('#edit1').hide();
		}
		
		this.doUpdateItem = function(that){
			that.$el.find('#loader1').show();
			var size 	=  that.$el.find('input[name=size]').val().trim(),
				color 	=  that.$el.find('input[name=color]').val().trim(),
				length 	=  that.$el.find('input[name=length]').val().trim(),
				width 	=  that.$el.find('input[name=width]').val().trim(),
				heigth 	=  that.$el.find('input[name=height]').val().trim(),
				weight 	=  that.$el.find('input[name=weight]').val().trim(),
				stock  	=  that.$el.find('input[name=stock]').val().trim(),
				modelId =  that.$el.find('input[name=modelId]').val().trim();
			
			var check = size.length > 0;
				check = check && color.length > 0;
				check = check && length.length > 0;
				check = check && width.length > 0;
				check = check && heigth.length > 0;
				check = check && weight.length > 0;
				check = check && stock.length > 0;
				check = check && modelId.length > 0;
				
			if(check===false){
				that.$el.find('.alert-danger').show();
				return false;
			}
				
			var type ="com.emc.app.entity.product.item.Item";
			var urlRoot = talalah.com.client.app.entity.product.item.item.update;
			var data = {size : size, color : color, lenght : length, width : width, height : heigth, weight:weight, stock : stock, modelId : modelId,type:type};
			that.model.urlRoot = urlRoot;
			that.model.save(data,{
				success : function(item,resp,opts){
					setTimeout(function(){
						that.$el.find('#loader1').hide();
						that.$el.find('.success1').show();
					},3000);
				},
				error : function(item, resp, opts){
					setTimeout(function(){
						that.$el.find('#loader1').hide();
						that.$el.find('.error1').show();
					},3000);
				}
			});
		}
		
		this.doEditShipper = function(that,ShippingProviderEditViews){
			that.$el.find('#ok').show();
			that.$el.find('#edit').hide();
			var data = that.collection.toJSON();
			var itemShippingProviders = new Model.ItemShippingProviders();
			itemShippingProviders.url = talalah.com.client.app.entity.product.item.shippingProvider.get+"?first=0&max=100";
			itemShippingProviders.fetch({
				success : function(collection,resp,opt){
					var shippingProviderEditViews = new ShippingProviderEditViews({collection:collection});
					var $ele = shippingProviderEditViews.render(data);
					that.$el.find('#shippingProvider-list').empty();
					that.$el.find('#shippingProvider-list').append($ele);
				}
			});
			
		}
		
		this.doUpdateShipper = function(that){
			that.$el.find('img').show();
			var eles = that.$el.find('.ele').toArray();
			var ispvds = [];
			var prdId = null;
			$.each(eles, function(ind,ele){
				var chkEle = $(ele).find('input[type=checkbox]:checked').html();
				 
				if(chkEle !== undefined){
					var id 		= $(ele).find('input[type=checkbox]').val().trim();
					var pId		= $(ele).find('input[name=pId]').val().trim();
					var name 	= $(ele).find('input[name=name]').val().trim();
					var price 	= $(ele).find('input[name=price]').val().trim();
					var max 	= $(ele).find('input[name=max]').val().trim();
					var min 	= $(ele).find('input[name=min]').val().trim();
					prdId		= pId;
					var type = "com.emc.app.entity.product.item.Item";
					var ispvdId = {item:{id:pId,type:type},shippingProvider:{id:id,name:name}};
					var ispvd = {itemShippingProviderId : ispvdId, price:price, max : max, min : min};
					ispvds.push(ispvd);
				}
			});
			
			var itemShppingProviders = {id:prdId,itemShippingProviders:ispvds};
			var itemhasShippingProviders = new Model.ItemhasShippingProviders();
			itemhasShippingProviders.urlRoot = talalah.com.client.app.entity.product.item.item.update+"/"+prdId+"/itemShippingProviders";
			itemhasShippingProviders.save(itemShppingProviders,{
				success : function(item,resp,opts){
					setTimeout(function(){
						that.$el.find('img').hide();
						that.$el.find('.success2').show();
					},3000);
				},
				error : function(item, resp, opts){
					setTimeout(function(){
						that.$el.find('img').hide();
						that.$el.find('.error2').show();
					},3000);
				}
			});
		}
		
		this.doSearchProduct = function(that, ProductViews){
			var key = that.$el.find('input[type=text]').val().trim();
			that.$el.find('#products').empty();
			that.$el.find('#loading').show();
			var mcId =	that.model.toJSON().id;
			var products = new Model.Products();
			if(key!=='')
				products.url = talalah.com.client.app.entity.product.product.get+"/mc/"+mcId+"/prd?name="+key+"%25&first=0&max=5";
			else
				products.url = talalah.com.client.app.entity.product.product.get+"/mc/"+mcId+"/prd?name=%25&first=0&max=5";
			products.fetch({
				success : function(items,resp,opt){
					setTimeout(function(){
						that.$el.find('#loading').hide();
						var productViews = new ProductViews({collection:items});
						that.$el.find('#products').append(productViews.render());
					},3000);
				}
			});
			
		}
		
		this.doLoadMore = function(page, max, that, ProductViews){
			that.$el.find('#loadmore').hide();
			that.$el.find('#loader').show();
			var produucts = new Model.Products();
			var mcId =	that.model.toJSON().id;
			var products = new Model.Products();
			var first = page*max;
			products.url = talalah.com.client.app.entity.product.product.get+"/mc/"+mcId+"?first="+first+"&max="+max;
			products.fetch({
				success : function(items,resp,opt){
					setTimeout(function(){
						that.$el.find('#loader').hide();
						that.$el.find('#loadmore').show();
						var productViews = new ProductViews({collection:items});
						that.$el.find('#products').append(productViews.render());
					},3000);
				}
			});
		}
	}
	
	return new ProductEvents();
});