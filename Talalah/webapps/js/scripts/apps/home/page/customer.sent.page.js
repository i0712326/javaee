/**
 * 
 */
define(function(require,exports,module){
	
	var Model 	= require('model');
	var View	= require('customer.sent.view');
	var init	= require('init');
	
	var talalah = init.init();
	var max		= talalah.com.client.app.page.max;
		
	var MessageSentPage = function(id){
		var id = id;
		this.render = function(){
			var customer = new Model.Customer({id:id});
			var sentMessagePanelView = new View.SentMessagePanelView({model:customer});
			var $ele = sentMessagePanelView.render();
			
			customer.fetch({
				success : function(item,resp,opt){
					sentMessagePanelView.model = item;
					var sentMessages = new Model.Messages();
					sentMessages.url = talalah.com.client.app.entity.user.message.sent.get+"?id="+id+"&first=0&max="+max;
					sentMessages.fetch({
						success:function(items, response, options){
							var sentMessageViews = new View.SentMessageViews({collection:items});
							$ele.find('#sentMessageDataGrid').empty();
							$ele.find('#sentMessageDataGrid').append(sentMessageViews.render());
						}
					});
				}
			});
			
			return $ele;
		}
	}
	
	var MessageSentDetailPage = function(id,mId){
		var id = id;
		var mId = mId;
		this.render =  function(){
			var message = new Model.Message({id:mId});
			message.urlRoot =  talalah.com.client.app.entity.user.message.sent.get;
			var $messageSentView = new View.MessageSentView({model:message});
			var $ele = $messageSentView.render();
			message.fetch({
				success:function(item,response,options){
					$messageSentView.model = item;
					$ele = $messageSentView.render();
				}
			});
			
			return $ele;
		}
	}
	
	var endPoint = {
			showMessageSentPage : function(id){
				var messageSentPage = new MessageSentPage(id);
				return messageSentPage.render();
			},
			showMessageSentDetailPage : function(id,mId){
				var messageSentDetailPage = new MessageSentDetailPage(id,mId);
				return messageSentDetailPage.render();
			}
	}
	
	return endPoint;
});