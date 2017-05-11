/**
 * 
 */
define(function(require,exports,module){
	var Model = require('model');
	var View  = require('message.view');
	var init  = require('init');
	
	var talalah = init.init();
	
	var MessageSentPage = function(mcId){
		var mcId = mcId;
		this.render = function(){
			var merchant = new Model.Merchant({id:mcId});
			var messageSentMainView = new View.MessageSentMainView({model:merchant});
			var $messageSentMainEle	= messageSentMainView.render();
			
			merchant.urlRoot = talalah.com.client.app.entity.merchant.merchant.get;
			merchant.fetch({
				success : function(item,resp,opts){
					var data = item.toJSON();
					var id = data.id;
					var messages = new Model.Messages();
					messages.url = talalah.com.client.app.entity.user.message.sent.get+"?id="+id+"&first=0&max=8";
					messages.fetch({
						success : function(items,resp,opt){
							var messageSentViews = new View.MessageSentViews({collection:items});
							$messageSentMainEle.find('#messages').append(messageSentViews.render());
							$messageSentMainEle.find('#loadmore').show();
							$messageSentMainEle.find('#message-loader').hide();
						}
					});
				}
			});
			
			return $messageSentMainEle;
		}
	}
	
	
	var MessageSentDetailPage = function(id){
		var id = id;
		this.render = function(){
			var message = new Model.Message({id:id});
			var messageSentDetailView = new View.MessageSentDetailView({model:message});
			var $ele				= messageSentDetailView.render();
			message.urlRoot = talalah.com.client.app.entity.user.message.sent.get;
			message.fetch({
				success : function(item,resp,opt){
					messageSentDetailView.model = item;
				}
			});
			return $ele;
		}
		
	}
	var endPoint = {
			showSentMessage : function(mcId){
				var messageSentPage = new MessageSentPage(mcId);
				return messageSentPage.render();
			},
			showSentDetail : function(id){
				var messageSentDetailPage = new MessageSentDetailPage(id);
				return messageSentDetailPage.render();
				
			}
	}
	
	return endPoint;
});