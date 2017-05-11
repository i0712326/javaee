/**
 * 
 */
define(function(require,exports,module){
	var Model = require('model');
	var init  = require('init');
	
	var talalah = init.init();
	
	var MessageEvent = function(){
		// click search button
		this.doSearch			= function(that, MessageViews){
			$('.alert').hide();
			var key = that.$el.find('#search-text').val().trim();
			if(key!==''){
				var data = that.model.toJSON();
				var id = data.id;
				that.$el.find('#message-loader').show();
				that.$el.find('.msgitem').remove();
				that.$el.find('#loadmore').hide();
				that.$el.find('#reset').show();
				var messages = new Model.Messages();
				messages.url = talalah.com.client.app.entity.user.message.received.get+"/subject?id="+id+"&subject="+key+"%25&first=0&max=16";
				messages.fetch({
					success : function(items,resp,opt){
						setTimeout(function(){
							that.$el.find('#message-loader').hide();
							if(items.length>0){
								var messageViews = new MessageViews({collection:items});
								that.$el.find('#messages').append(messageViews.render());
								that.$el.find('#searchmore').show();
							}
							else{
								that.$el.find('#empty-alert').show();
							}
							
						},3000);
					}
				});
			}
			
		}
		this.doReset				= function(that, MessageViews){
			$('.alert').hide();
			var data = that.model.toJSON();
			var id = data.id;
			that.$el.find('#message-loader').show();
			that.$el.find('.msgitem').remove();
			that.$el.find('#loadmore').show();
			that.$el.find('#reset').hide();
			that.$el.find('#searchmore').hide();
			that.$el.find('#search-text').val('');
			var messages = new Model.Messages();
			messages.url = talalah.com.client.app.entity.user.message.received.get+"?id="+id+"&first=0&max=16";
			messages.fetch({
				success : function(items,resp,opt){
					setTimeout(function(){
						that.$el.find('#message-loader').hide();
						if(items.length>0){
							var messageViews = new MessageViews({collection:items});
							that.$el.find('#messages').append(messageViews.render());
						}
						else{
							that.$el.find('#empty-alert').show();
						}
						
					},3000);
				}
			});
		}
		// click load more button
		this.doLoadMore 		= function(page, max, that, MessageViews){
			$('.alert').hide();
			var data = that.model.toJSON();
			var id = data.id;
			that.$el.find('#loader').show();
			that.$el.find('#loadmore').hide();
			var first = page*max;
			var messages = new Model.Messages();
			messages.url = talalah.com.client.app.entity.user.message.received.get+"?id="+id+"&first="+first+"&max="+max;
			messages.fetch({
				success : function(items,resp,opt){
					setTimeout(function(){
						that.$el.find('#loader').hide();
						that.$el.find('#loadmore').show();
						if(items.length>0){
							var messageViews = new MessageViews({collection:items});
							that.$el.find('#messages').append(messageViews.render());
						}
						
					},3000);
				}
			});
		}
		
		this.showMessage = function(that){
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
								that.$el.find('#msg').click();
							},
							error:function(item, response, options){
								$('#alert-msg').show();
							}				
						});
					}
				});
			}
			else{
				that.$el.find('#msg').click();
			}
		}
		//
		this.doDeleteMessage 	= function(that){
			$('.alert').hide();
			var data = that.model.toJSON();
			var id = data.id;
			that.model.url = talalah.com.client.app.entity.user.message.received.remove+"/"+id;
			that.model.destroy({
				success:function(item,resp){
					that.remove();
					$('.alert-success').show();
				},
				error:function(item,resp){
					$('.alert-danger').show();
				}
			});
			
		}
		// message reply
		this.doReply			= function(that){
			that.$el.find('#send').show();
			that.$el.find('#reply').hide();
			that.$el.find('#reply-box').show();
		}
		
		this.doSend				= function(that){
			var data = that.model.toJSON();
			var sender = data.receiver;
			var receiver = data.sender;
			var subject = data.subject;
			var msgId = data.msgId;
			var datetime = data.datetime;
			var body = that.$el.find('#reply-box').val().trim();
			
			var model = {sender:sender, receiver:receiver, subject:subject, body:body, msgId:msgId, datetime:datetime};
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
			
			var attrs = {status:'R', sender:null};
			that.model.urlRoot = talalah.com.client.app.entity.user.message.received.update;
			that.model.save(attrs,{
				success:function(item,resp,opt){
					that.$el.find('.alert').hide();
					that.$el.find('.alert-success').show();
				},
				error:function(item,resp,opt){
					that.$el.find('.alert').hide();
					that.$el.find('.alert-danger').show();
				}			
			});
		}
		
		this.doDeleteMsg = function(that){
			that.model.urlRoot = talalah.com.client.app.entity.user.message.received.remove;
			that.model.destroy({
				success:function(item,resp){
					that.$el.find('#inbox').click();
				},
				error:function(item,resp){
					that.$el.find('.alert').hide();
					that.$el.find('.alert-danger').show();
				}
			});
			
		}
		
	}
	
	return new MessageEvent();
});