/**
 * 
 */
define(function(require,exports,module){
	
	var $			=	require('jquery');
	var _			=	require('underscore');
	var Backbone	=	require('backbone');
	var Handlebars	=	require('handlebars');
	var init		=	require('init');
	var Model		=	require('model');
	
	// template
	
	var commentTemp = require('text!productComponentTempl');
	var $commentTempl = $(commentTemp).find('#comment').html();
	
	var CommentView = Backbone.View.extend({
		className:'media comment',
		template:Handlebars.compile($commentTempl),
		render:function(){
			var data = this.model.toJSON();
			var id = data.customer.id;
			var img	= data.customer.img;
			this.$el.html(this.template(data));
			this.$el.find('img').attr('src','/Talalah/content/user/customer/'+id+"/"+img);
			return this.$el;
		}
	});
	
	var CommentViews = Backbone.View.extend({
		render:function(){
			_.each(this.collection.models, function(item){
				var commentView = new CommentView({model:item});
				this.$el.append(commentView.render());
			},this);
			return this.$el;
		}
	});
	
	return {
		CommentViews : CommentViews
	}
	
});