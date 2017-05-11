/**
 * 
 */
define(function(require, exports, module){
	
	var Model = require('model');
	var init  = require('init');
	
	var talalah = init.init();
	var max = talalah.com.client.app.page.max;
	var MessageSentEvents = function(){
		// sent message panel
		this.doSearch = function(that, SentMessageViews){
			var keyWord = that.$el.find('#search-text').val().trim();
			if(keyWord!=''){
				that.$el.find('#loading0').show();
				that.keyWord = keyWord;
				that.searchCount = 1;
				var data = that.model.toJSON();
				var id = data.id;
				var messages = new Model.Messages();
				messages.url =  talalah.com.client.app.entity.user.message.sent.get+'/subject?id='+id+'&subject='+keyWord+"%25&first=0&max=10";
				messages.fetch({
					success:function(items,resp,opts){
						setTimeout(function(){
							that.$el.find('#loading0').hide();
							if(items.length>0){
								var sentMessageViews = new SentMessageViews({collection:items});
								that.$el.find('#sentMessageDataGrid').empty();
								that.$el.find('#sentMessageDataGrid').append(sentMessageViews.render());
								that.$el.find('#loadsearch').show();
								that.$el.find('#load-more').hide();
							}
						},3000);
						
					}
				});
			}
		}
		
		this.doLoadSearch = function(page, that, SentMessageViews){
			that.$el.find('#loader').show();
			that.$el.find("#loadsearch").hide();
			var data = that.model.toJSON();
			var id = data.id;
			var messages = new Model.Messages();
			var max = 10;
			var first = max*page;
			var keyWord = this.keyWord;
			messages.url = talalah.com.client.app.entity.user.message.sent.get+'/subject?id='+id+'&subject='+keyWord+"%25&first="+first+"&max=10";
			messages.fetch({
				success:function(items,resp,opts){
					setTimeout(function(){
						if(items.length>0){
							var sentMessageViews = new SentMessageViews({collection:items});
							that.$el.find('#sentMessageDataGrid').append(sentMessageViews.render());
						}
						that.$el.find('#loader').hide();
						that.$el.find("#loadsearch").show();
					},3000);
					
				}
			});
		}
		
		this.doLoadMore = function(count, that, SentMessageViews){
			that.$el.find('#loader').show();
			that.$el.find('#load-more').hide();
			var data = that.model.toJSON();
			var id = data.id;
			var first = count*max;
			var messages = new Model.Messages();
			messages.url = talalah.com.client.app.entity.user.message.sent.get+"?id="+id+"&first="+first+"&max="+max;
			messages.fetch({
				success : function(items,resp,opts){
					setTimeout(function(){
						if(items.length>0){
							var sentMessageViews = new SentMessageViews({collection:items});
							that.$el.find('#sentMessageDataGrid').append(sentMessageViews.render());
						}
						that.$el.find('#loader').hide();
						that.$el.find('#load-more').show();
					},3000);
					
				}
			});
		}
		// item sent message action
		
		this.showMessage = function(that){
				that.$el.find('#viewMsg').click();
		}
		
		this.deleteMessage = function(that){
			that.model.urlRoot=talalah.com.client.app.entity.user.message.sent.remove;
			that.model.destroy({
				success:function(item,resp){
					that.remove();
				},
				error:function(item,resp){
					$('#alert-msg').show();
				}
			});
		}
		
		
		// message viewer panel action
		this.doBack = function(that){
			this.$el.find('#sent-link').click();
		}
		
		this.doDelete = function(that){
			that.model.urlRoot=talalah.com.client.app.entity.user.message.sent.remove;
			that.model.destroy({
				success:function(item,resp){
					that.$el.find('#sent-link').click();
				},
				error:function(item,resp){
					that.$el.find('.alert').hide();
					that.$el.find('.alert-danger').show();
				}
			});
		}
	}
	
	return  new MessageSentEvents();
});