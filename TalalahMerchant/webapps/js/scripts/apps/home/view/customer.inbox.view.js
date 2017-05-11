/**
 * 
 */
define(function(require,exports,module){
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	var Model	= require('model');
	var init	= require('init');
	var customerMessageController = require('customer.inbox.controller');
	var talalah = init.init();
	
	var messageTemp 	= require('text!messageTemp');
	
	var $inboxMessagePanelTemp 	= $(messageTemp).find('#inboxMessagePanel').html();
	var $messageViewTemp 		= $(messageTemp).find('#messageView').html();
	var $messageBoxTemp 		= $(messageTemp).find('#msgViewer').html();
	
	var InboxMessagePanelView = Backbone.View.extend({
		initialize : function(){
			this.count = 1;
			this.countSearch = 1;
			this.keyWord = '';
			_.bindAll(this, "render");
		    this.model.bind('change', this.render);
		},
		className :'container',
		template : Handlebars.compile($inboxMessagePanelTemp),
		render:function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this.$el;
		},
		events:{
			'click #search' : 'doSearch',
			'click #loadsearch':'doLoadSearch',
			'click #loadmore':'doLoad'
		},
		doSearch : function(e){
			e.preventDefault();
			customerMessageController.doSearch(this,MessageViews);
		},
		doLoad : function(e){
			e.preventDefault();
			var page = this.count++;
			customerMessageController.doLoadMore(page,this,MessageViews);
		},
		doLoadSearch : function(e){
			e.preventDefault();
			var page = this.count++;
			customerMessageController.doLoadSearch(page,this,MessageViews);
		}
	});
	
	var MessageView = Backbone.View.extend({
		className : 'col-sm-12 col-xs-12 col-lg-12 small_space msgview',
		template : Handlebars.compile($messageViewTemp),
		render : function(){
			var data = this.model.toJSON();
			this.$el.html(this.template(this.model.toJSON()));
			if(data.status==='N'){
				this.$el.find('#marker').html('<span class="glyphicon glyphicon-envelope"></span>');
				this.$el.addClass('unread');
			}
			else{
				this.$el.find('#marker').html('<span class="glyphicon glyphicon-folder-open"></span>');
				this.$el.find('.glyphicon').attr('style','color:#CCC;');
			}
			return this.$el;
		},
		events:{
			'dblclick':'showMsg',
			'click #del':'doDelete'
		},
		showMsg : function(e){
			e.preventDefault();
			customerMessageController.messageItemAction.showMessage(this);
		},
		doDelete : function(e){
			e.preventDefault();
			customerMessageController.messageItemAction.deleteMessage(this);
		}
	});
	
	var MessageViews = Backbone.View.extend({
		render:function(){
			_.each(this.collection.models, function(item){
				var messageView = new MessageView({model:item});
				this.$el.append(messageView.render());
			}, this);
			return this.$el;
		}
	});
	
	var MessageBoxView = Backbone.View.extend({
		className:'container',
		template:Handlebars.compile($messageBoxTemp),
		render:function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this.$el;
		},
		events:{
			'click #reply' : 'doReply',
			'click #back' : 'doBack',
			'click #send' : 'doSend',
			'click #delete' : 'doDelete'
		},
		doReply : function(e){
			e.preventDefault();
			customerMessageController.messageViewerAction.doReply(this);
		},
		doBack : function(e){
			e.preventDefault();
			customerMessageController.messageViewerAction.doBack(this);
		},
		doDelete : function(e){
			e.preventDefault();
			customerMessageController.messageViewerAction.doDelete(this);
		},
		doSend : function(e){
			e.preventDefault();
			customerMessageController.messageViewerAction.doSend(this);
		}
	});
	
	return {
		InboxMessagePanelView : InboxMessagePanelView,	
		MessageView			  : MessageView,
		MessageViews		  : MessageViews,
		MessageBoxView		  : MessageBoxView
	}
					
});