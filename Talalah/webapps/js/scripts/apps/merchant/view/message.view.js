/**
 * 
 */
define(function(require,exports,module){
	
	var $ 			= require('jquery');
	var _ 			= require('underscore');
	var Backbone	= require('backbone');
	var Handlebars	= require('handlebars');
	
	var inboxEvent		= require('message.inbox.event');
	var sentEvent		= require('message.sent.event');
	
	var messageInboxTempl 	= require('text!messageInboxTemp');
	var messageSentTempl	= require('text!messageSentTemp');
	
	var $messageInboxMainTempl 	= $(messageInboxTempl).find('#messageInboxMainPage').html();
	var $messageInboxTempl		= $(messageInboxTempl).find('#inbox-message-item').html();
	var $messageTempl			= $(messageInboxTempl).find('#msgViewer').html();
	
	var $messageSentMainTempl	= $(messageSentTempl).find('#messageSentMainPage').html();
	var $sentMessageTempl		= $(messageSentTempl).find('#sent-message-item').html();
	var $messageSentDetailTempl = $(messageSentTempl).find('#sendMessageViewer').html();
	var MessageInboxMainView = Backbone.View.extend({
		initialize : function(){
			this.page = 1;
			this.searchpage = 1;
			_.bindAll(this, "render");
		    this.model.bind('change', this.render);
		},
		template : Handlebars.compile($messageInboxMainTempl),
		render	  : function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this.$el;
		},
		events : {
			'click #search' : 'doSearch',
			'click #reset'	: 'doReset',
			'click #loadmore' : 'doLoadMore'
		},
		doSearch : function(e){
			e.preventDefault();
			inboxEvent.doSearch(this,MessageViews);
		},
		doReset	: function(e){
			e.preventDefault();
			inboxEvent.doReset(this,MessageViews);
		},
		doLoadMore : function(e){
			e.preventDefault();
			inboxEvent.doLoadMore(this.page,16,this,MessageViews);
			this.page++;
		}
	});
	
	var MessageInboxView = Backbone.View.extend({
		initialize : function(){
			_.bindAll(this, "render");
		    this.model.bind('change', this.render);
		},
		className : 'container',
		template : Handlebars.compile($messageTempl),
		render : function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this.$el;
		},
		events : {
			'click #reply':'doReply',
			'click #send' : 'doSend',
			'click #delete' : 'doDelete'
		},
		doReply : function(e){
			e.preventDefault();
			inboxEvent.doReply(this);
		},
		doSend : function(e){
			e.preventDefault();
			inboxEvent.doSend(this);
		},
		doDelete : function(e){
			e.preventDefault();
			inboxEvent.doDeleteMsg(this);
		}
	});
	
	var MessageView	= Backbone.View.extend({
		className : 'col-xs-12 col-sm-12 col-lg-12 small_space page-header msgitem',
		template  : Handlebars.compile($messageInboxTempl),
		render	  : function(){
			var data = this.model.toJSON();
			var stat = data.status;
			this.$el.html(this.template(data));
			if(stat!=='N')
				this.$el.attr('style','color:#737576;');
			return this.$el;
		},
		events : {
			'dblclick' : 'showMessage',
			'click #delete': 'doDelete'
		},
		showMessage : function(e){
			e.preventDefault();
			inboxEvent.showMessage(this);
		},
		doDelete : function(e){
			e.preventDefault();
			inboxEvent.doDeleteMessage(this);
		}
	});
	
	var MessageViews = Backbone.View.extend({
		render : function(){
			_.each(this.collection.models,function(item){
				var messageView = new MessageView({model:item});
				this.$el.append(messageView.render());
			},this);
			return this.$el;
		}
	});
	
	var MessageSentMainView = Backbone.View.extend({
		initialize : function(){
			this.page = 1;
			this.searchpage = 1;
			_.bindAll(this, "render");
		    this.model.bind('change', this.render);
		},
		template : Handlebars.compile($messageSentMainTempl),
		render	  : function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this.$el;
		},
		events : {
			'click #search' : 'doSearch',
			'click #reset'	: 'doReset',
			'click #loadmore' : 'doLoadMore',
			'click #searchmore' : 'doSearchMore'
		},
		doSearch : function(e){
			e.preventDefault();
			sentEvent.doSearch(this,MessageSentViews);
		},
		doReset : function(e){
			e.preventDefault();
			sentEvent.doReset(this,MessageSentViews);
		},
		doLoadMore : function(e){
			e.preventDefault();
			sentEvent.doLoadMore(this.page,8,this,MessageSentViews);
			this.page++;
		},
		doSearchMore : function(e){
			e.preventDefault();
			sentEvent.doSearchMore(this.searchpage,8,this,MessageSentViews);
			this.searchpage++;
		}
	});
	
	var MessageSentDetailView = Backbone.View.extend({
		initialize : function(){
			_.bindAll(this, "render");
		    this.model.bind('change', this.render);
		},
		className : 'container',
		template : Handlebars.compile($messageSentDetailTempl),
		render : function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this.$el;
		},
		events : {
			'click #delete' : 'doDelete',
			'click #back'	: 'doBack'
		},
		doDelete : function(e){
			e.preventDefault();
			sentEvent.doDeleteMsg(this);
		},
		doBack	: function(e){
			e.preventDefault();
			sentEvent.doBack(this);
		}
	});
	
	var MessageSentView	= Backbone.View.extend({
		className : 'col-xs-12 col-sm-12 col-lg-12 small_space page-header msgitem',
		template : Handlebars.compile($sentMessageTempl),
		render : function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this.$el;
		},
		events : {
			'dblclick' : 'showMessage',
			'click #delete' : 'doDelete'
			
		},
		showMessage : function(e){
			e.preventDefault();
			sentEvent.doShowMessage(this);
		},
		doDelete : function(e){
			e.preventDefault();
			sentEvent.doDelete(this);
		},
		doBack	: function(e){
			e.preventDefault();
			sentEvent.doBack(this);
		}
	});
	
	var MessageSentViews = Backbone.View.extend({
		render : function(){
			_.each(this.collection.models,function(item){
				var messageSentView = new MessageSentView({model:item});
				this.$el.append(messageSentView.render());
			},this);
			return this.$el;
		}
	});
	
	return {
		MesssageInboxMainView : MessageInboxMainView,
		MessageInboxView	  : MessageInboxView,
		MessageView			  : MessageView,
		MessageViews		  : MessageViews,
		MessageSentMainView	  : MessageSentMainView,
		MessageSentView		  : MessageSentView,
		MessageSentViews	  : MessageSentViews,
		MessageSentDetailView : MessageSentDetailView
	};
	
	
});