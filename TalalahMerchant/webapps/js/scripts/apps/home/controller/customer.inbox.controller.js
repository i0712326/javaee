/**
 * 
 */
define(function(require, exports, module){
	
	var Model = require('model');
	var init  = require('init');
	
	var talalah = init.init();
	var max = talalah.com.client.app.page.max;
	var $MessageInboxEvents = function(){
		// Message Panel action
		this.doSearch = function(that, MessageViews){
			var keyWord = that.$el.find('#search-text').val().trim();
			if(keyWord!=''){
				that.$el.find('#loading0').show();
				that.keyWord = keyWord;
				that.countSearch = 1;
				var data = that.model.toJSON();
				var id = data.id;
				var messages = new Model.Messages();
				messages.url =  talalah.com.client.app.entity.user.message.received.get+'/subject?id='+id+'&subject='+keyWord+"%25&first=0&max=10";
				messages.fetch({
					success:function(items,resp,opts){
						that.$el.find('#loading0').hide();
						if(items.length>0){
							var messageViews = new MessageViews({collection:items});
							that.$el.find('#messageDataGrid').empty();
							that.$el.find('#messageDataGrid').append(messageViews.render());
							that.$el.find('#loadsearch').show();
							that.$el.find('#loadmore').hide();
						}
					}
				});
			}
		}
		
		this.doLoadSearch = function(page, that, MessageViews){
			that.$el.find('#loader').show();
			that.$el.find("#loadsearch").hide();
			setTimeout(function(){},1200000000);
			var data = that.model.toJSON();
			var id = data.id;
			var messages = new Model.Messages();
			var max = 10;
			var first = max*page;
			var keyWord = that.keyWord;
			messages.url = talalah.com.client.app.entity.user.message.received.get+'/subject?id='+id+'&subject='+keyWord+"%25&first="+first+"&max=10";
			messages.fetch({
				success:function(items,resp,opts){
					if(items.length>0){
						var messageViews = new MessageViews({collection:items});
						that.$el.find('#messageDataGrid').append(messageViews.render());
					}
					that.$el.find('#loader').hide();
					that.$el.find("#loadsearch").show();
				}
			});
		}
		
		this.doLoadMore = function(page, that, MessageViews){
			that.$el.find('#loader').show();
			that.$el.find("#loadmore").hide();
			var data = that.model.toJSON();
			var id = data.id;
			var messages = new Model.Messages();
			
			var first = max*page;
			messages.url = talalah.com.client.app.entity.user.message.received.get+'?id='+id+'&first='+first+"&max="+max;
			messages.fetch({
				success:function(items,resp,opts){
					setTimeout(function(){
						if(items.length>0){
							var messageViews = new MessageViews({collection:items});
							that.$el.find('#messageDataGrid').append(messageViews.render());
						}
						that.$el.find('#loader').hide();
						that.$el.find("#loadmore").show();
					},3000);
					
				}
			});
		}
		
		// message item action
		this.messageItemAction = {
			showMessage : function(that){
				var data = that.model.toJSON();
				if(data.status ==='N'){
					var newModel = new Model.Message({id:data.id});
					newModel.urlRoot = talalah.com.client.app.entity.user.message.received.get;
					newModel.fetch({
						success:function(item,res,opts){
							var attrs = {status:'Y', sender:null};
							item.urlRoot = talalah.com.client.app.entity.user.message.received.update;
							item.save(attrs,{
								success:function(item, response, options){
									that.$el.find('#msgViewer').click();
								},
								error:function(item, response, options){
									$('#alert-msg').show();
								}				
							});
						}
					});
				}
				else{
					that.$el.find('#msgViewer').click();
				}
			},
			deleteMessage : function(that){
				that.model.urlRoot=talalah.com.client.app.entity.user.message.received.remove;
				that.model.destroy({
					success:function(item,resp){
						that.remove();
					},
					error:function(item,resp){
						$('#alert-msg').show();
					}
				});
			}
		}
		
		// message viewer panel action
		this.messageViewerAction = {
				doReply : function(that){
					that.$el.find('#reply').hide();
					that.$el.find('#reply-box').show();
					that.$el.find('#reply-box').focus();
					that.$el.find('#send').show();
				},
				doBack : function(that){
					that.$el.find('#inbox-link').click();
				},
				doSend: function(that){
					var data = that.model.toJSON();
					var sender = data.receiver;
					var receiver = data.sender;
					var subject = data.subject;
					var msgId = data.msgId;
					var date = data.date;
					var time = data.time;
					var body = that.$el.find('#reply-box').val().trim();
					
					var model = {sender:sender, receiver:receiver, subject:subject, body:body, msgId:msgId, date:date, time:time};
					var newModel = new Model.Message();
					newModel.urlRoot = talalah.com.client.app.entity.user.message.save;
					
					newModel.save(model,{
						success:function(item,resp,opt){
							that.$el.find('.alert').hide();
							that.$el.find('.alert-success').show();
						},
						error:function(item,resp,opt){
							that.$el.find('.alert').hide();
							that.$el.find('.alert-danger').show();
						}
					});
				},
				doDelete : function(that){
					that.model.urlRoot = talalah.com.client.app.entity.user.message.received.remove;
					that.model.destroy({
						success:function(item,resp){
							that.$el.find('#inbox-link').click();
						},
						error:function(item,resp){
							that.$el.find('.alert').hide();
							that.$el.find('.alert-danger').show();
						}
					});
				}
		}
	}
	
	return new $MessageInboxEvents();
	
});