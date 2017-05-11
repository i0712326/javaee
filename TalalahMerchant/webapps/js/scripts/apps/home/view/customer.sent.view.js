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
	var customerMessageController = require('customer.sent.controller');
	var talalah = init.init();

	var messageTemp 	= require('text!messageTemp');
	
	var $sentMessagePanelTemp 	= $(messageTemp).find('#sentMessagePanel').html();
	var $sendMsgViewTemp 		= $(messageTemp).find('#sentMsgView').html();
	var $messageSentTemp 		= $(messageTemp).find('#sendMessageViewer').html();
	
	var SentMessagePanelView = Backbone.View.extend({
		initialize : function(){
			this.loadCount = 0;
			this.searchCount = 0;
			this.keyWord = '';
			_.bindAll(this,"render");
			this.model.bind('change', this.render);
		},
		className :'container',
		template : Handlebars.compile($sentMessagePanelTemp),
		render : function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this.$el;
		},
		events:{
			'click #search' : 'doSearch',
			'click #loadsearch' : 'doLoadSearch',
			'click #load-more' : 'doLoad'
		},
		doSearch : function(e){
			e.preventDefault();
			customerMessageController.doSearch(this,SentMessageViews);
		},
		doLoadSearch : function(e){
			e.preventDefault();
			var page = this.searchCount++;
			customerMessageController.doLoadSearch(page,this,SentMessageViews);
		},
		doLoad : function(e){
			e.preventDefault();
			var count = ++this.loadCount;
			customerMessageController.doLoadMore(count,this,SentMessageViews);
		}
		
	});
	
	var SentMessageView = Backbone.View.extend({
		className : 'col-sm-12 col-xs-12 col-lg-12 small_space msgview',
		template : Handlebars.compile($sendMsgViewTemp),
		render : function(){
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.find('#marker').html('<span class="glyphicon glyphicon-envelope"></span>');
			this.$el.find('.glyphicon').attr('style','color:#CCC;');
			return this.$el;
		},
		events : {
			'dblclick' : 'showMsg',
			'click #del' : 'doDelete'
		},
		showMsg : function(e){
			e.preventDefault();
			customerMessageController.showMessage(this);
		},
		doDelete : function(e){
			e.preventDefault();
			customerMessageController.deleteMessage(this);
		}
		
	});
	
	var SentMessageViews = Backbone.View.extend({
		render : function(){
			_.each(this.collection.models,function(item){
				var sentMessageView = new SentMessageView({model:item});
				this.$el.append(sentMessageView.render());
			},this);
			return this.$el;
		}
	});
	
	// renderer
	
	var MessageSentView = Backbone.View.extend({
		className : 'container',
		template  : Handlebars.compile($messageSentTemp),
		render : function(){
			return this.$el.html(this.template(this.model.toJSON()));
		},
		events : {
			'click #back' : 'doBack',
			'click #delete' : 'doDelete'
		},
		doBack : function(e){
			e.preventDefault();
			this.$el.find('#sent-link').click();
		},
		doDelete : function(e){
			e.preventDefault();
			customerMessageController.doDelete(this);
		}
	});
	
	return {
		SentMessagePanelView : SentMessagePanelView,
		SentMessageView		 : SentMessageView,
		SentMessageViews	 : SentMessageViews,
		MessageSentView		 : MessageSentView,
	}
	
});