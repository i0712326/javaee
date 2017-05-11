/**
 * 
 */
define(function(require,exports,module){
	var Model 	= require('model');
	var init  	= require('init');
	var talalah = init.init();
	
	var MessageSentEvent = function(){
		
		this.doSearch = function(that, MessageSentViews){
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
				messages.url = talalah.com.client.app.entity.user.message.sent.get+"/subject?id="+id+"&subject="+key+"%25&first=0&max=16";
				messages.fetch({
					success : function(items,resp,opt){
						setTimeout(function(){
							that.$el.find('#message-loader').hide();
							if(items.length>0){
								var messageSentViews = new MessageSentViews({collection:items});
								that.$el.find('#messages').append(messageSentViews.render());
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
		
		this. doSearchMore = function(page,max,that,MessageSentViews){
			$('.alert').hide();
			var key = that.$el.find('#search-text').val().trim();
			if(key!==''){
				var data = that.model.toJSON();
				var id = data.id;
				var first = page*max;
				that.$el.find('#loader').show();
				that.$el.find('#searchmore').hide();
				var first = page*max;
				var messages = new Model.Messages();
				messages.url = talalah.com.client.app.entity.user.message.sent.get+"/subject?id="+id+"&subject="+key+"%25&first="+first+"&max=16";
				messages.fetch({
					success : function(items,resp,opt){
						setTimeout(function(){
							that.$el.find('#loader').hide();
							that.$el.find('#loadmore').show();
							if(items.length>0){
								var messageSentViews = new MessageSentViews({collection:items});
								that.$el.find('#messages').append(messageSentViews.render());
							}
							
						},3000);
					}
				});
			}
		}
		
		this.doReset = function(that, MessageSentViews){
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
			messages.url = talalah.com.client.app.entity.user.message.sent.get+"?id="+id+"&first=0&max=16";
			messages.fetch({
				success : function(items,resp,opt){
					setTimeout(function(){
						that.$el.find('#message-loader').hide();
						if(items.length>0){
							var messageSentViews = new MessageSentViews({collection:items});
							that.$el.find('#messages').append(messageSentViews.render());
						}
						else{
							that.$el.find('#empty-alert').show();
						}
						
					},3000);
				}
			});
		}
		
		this.doLoadMore = function(page, max, that, MessageSentViews){
			$('.alert').hide();
			var data = that.model.toJSON();
			var id = data.id;
			that.$el.find('#loader').show();
			that.$el.find('#loadmore').hide();
			var first = page*max;
			var messages = new Model.Messages();
			messages.url = talalah.com.client.app.entity.user.message.sent.get+"?id="+id+"&first="+first+"&max="+max;
			messages.fetch({
				success : function(items,resp,opt){
					setTimeout(function(){
						that.$el.find('#loader').hide();
						that.$el.find('#loadmore').show();
						if(items.length>0){
							var messageSentViews = new MessageSentViews({collection:items});
							that.$el.find('#messages').append(messageSentViews.render());
						}
						
					},3000);
				}
			});
		}
		
		this.doShowMessage = function(that){
			that.$el.find('#msg').click();
		}
		
		this.doDelete = function(that){
			var data = that.model.toJSON();
			var id = data.id;
			that.model.url = talalah.com.client.app.entity.user.message.sent.remove+"/"+id;
			that.model.destroy({
				success:function(item,resp){
					that.remove();
					$('.alert-success').show();
				},
				error : function(item,resp){
					$('.alert-danger').show();
				}
			});
		}
		
		this.doBack	= function(that){
			that.$el.find('#sent-link').click();
		}
		
		this.doDeleteMsg = function(that){
			var data = that.model.toJSON();
			var id = data.id;
			that.model.url = talalah.com.client.app.entity.user.message.sent.remove+"/"+id;
			that.model.destroy({
				success:function(item,resp){
					that.$el.find('#sent-link').click();
				},
				error : function(item,resp){
					that.$el.find('.alert-danger').show();
				}
			});
		}
	}
	
	return new MessageSentEvent();
});