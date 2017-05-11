/**
 * 
 */
define(function(require,exports,module){
	var Model	= require('model');
	var View = require('customer.inbox.view');
	var init = require('init');
	var talalah = init.init();
	var max = talalah.com.client.app.page.max;
	var MessageInboxPage = function(id){
		var id = id;
		this.render = function(){
			var customer =  new Model.Customer({id:id});
			var messagePanelView =  new View.InboxMessagePanelView({model:customer});
			var $ele = messagePanelView.render();
			
			customer.fetch({
				success:function(item,resp,opt){
					messagePanelView.model = item;
					var messages =  new Model.Messages();
					messages.url = talalah.com.client.app.entity.user.message.received.get+"?id="+id+"&first=0&max="+max;
					$ele.find('#wait-loader').show();
					messages.fetch({
						success:function(items, response, options){
							setTimeout(function(){
								$ele.find('#wait-loader').hide();
								if(items.length > 0){
									var messageViews = new View.MessageViews({collection:items});
									$ele.find('#messageDataGrid').empty();
									$ele.find('#messageDataGrid').append(messageViews.render());
									$ele.find('#loadmore').show();
								}
								else{
									$ele.find('#inboxGrid').show();
								}
							},3000);
							
						}
					});
				}
			});
			
			
			
			return $ele;
		}
	}
	
	var MessageInboxDetailPage = function(id,mcId){
		var id = id;
		var mcId = mcId;
		this.render = function(){
			var message = new Model.Message({id:mcId});
			message.urlRoot =  talalah.com.client.app.entity.user.message.received.get;
			var $messageBoxView = new View.MessageBoxView({model:message});
			var $ele = $messageBoxView.render();
			message.fetch({
				success:function(item,response,options){
					$messageBoxView.model = item;
					$ele = $messageBoxView.render();
				}
			});
			
			return $ele;
		}
	}
	
	var endPoint = {
			showMessageInboxPage : function(id){
				var messageInboxPage =  new MessageInboxPage(id);
				return messageInboxPage.render();
			},
			showMessageDetailPage : function(id,mcId){
				var messageInboxDetailPage =  new MessageInboxDetailPage(id,mcId);
				return messageInboxDetailPage.render();
			}
	}
	
	return endPoint;
});