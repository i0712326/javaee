/**
 * 
 */

define(function(require,exports,module){
	
	var Model = require('model');
	var View  = require('message.view');
	var init  = require('init');
	
	var talalah = init.init();
	
	var MessageInboxPage = function(mcId){
		var mcId = mcId;
		this.render = function(){
			
			var merchant = new Model.Merchant ({id:mcId});
			var messageInboxMainView = new View.MesssageInboxMainView({model:merchant});
			var $messageInboxMainEle = messageInboxMainView.render();
			
			merchant.urlRoot = talalah.com.client.app.entity.merchant.merchant.get;
			merchant.fetch({
				success : function(item,resp,opt){
					var data = item.toJSON();
					var id = data.id;
					var messages  = new Model.Messages();
					messages.url = talalah.com.client.app.entity.user.message.received.get+"?id="+id+"&first=0&max=16";
					messages.fetch({
						success:function(items,resp,opt){
							$messageInboxMainEle.find('#message-loader').hide();
							$messageInboxMainEle.find('#loadmore').show();
							if(items.length>0){
								var messageViews = new View.MessageViews({collection:items});
								$messageInboxMainEle.find('#messages').append(messageViews.render());
							}
							else{
								$messageInboxMainEle.find('#empty-alert').show();
							}
						}
					});
				}
			});
			
			
			
			return $messageInboxMainEle;
		}
	}
	
	var MessageViewPage	= function(id){
		var id = id;
		this.render = function(){
			var message = new Model.Message({id:id});
			var $messageInboxEle	=  new View.MessageInboxView({model:message});
			var $ele				= $messageInboxEle.render();
			message.urlRoot = talalah.com.client.app.entity.user.message.received.get;
			message.fetch({
				success : function(item,resp,opt){
					$ele.model = item;
				}
			});
			return $ele;
		}
	}
	
	var endPoint = {
			showInboxMessage : function(mcId){
				var messageInboxPage = new MessageInboxPage(mcId);
				return messageInboxPage.render();
			},
			showMessageDetail : function(id){
				var messageViewPage = new MessageViewPage(id);
				return messageViewPage.render();
			}
	}
	
	return endPoint;
});