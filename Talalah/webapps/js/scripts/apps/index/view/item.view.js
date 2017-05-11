/**
 * 
 */

define(function(require,exports,module){
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	
	var productTempl		 	= require('text!productTempl');
	var productComponentTempl 	= require('text!productComponentTempl');
	
	var $itemPageTemp	 		= $(productTempl).find('#itemPage').html();
	var $itemMainTemp1			= $(productComponentTempl).find('#itemMainTemp1').html();
	var $itemMainTemp2			= $(productComponentTempl).find('#itemMainTemp2').html();
	
	var ItemPageView = Backbone.View.extend({
		className : 'container',
		template : Handlebars.compile($itemPageTemp),
		render:function(){
			return this.$el.html(this.template(this.model.toJSON()));
		}
	});
	
	var ItemMainView1	= Backbone.View.extend({
		className : 'col-lg-12 col-sm-12 col-xs-12 space',
		template : Handlebars.compile($itemMainTemp1),
		render : function(){
			var data = this.model.toJSON();
			var mcc 	= data.merchant.merchantCode.mcc;
			var mcId 	= data.merchant.mcId;
			var pId 	= data.id;
			var img 	= data.img;
			this.$el.html(this.template(data));
			this.$el.find('img').attr('src','/Talalah/content/'+mcc+"/"+mcId+"/"+pId+"/"+img);
			var shDes = this.$el.find('.shDes');
			shDes.text(shDes.text().substring(0,800));
			return this.$el;
		}
	});
	
	var ItemMainView2	= Backbone.View.extend({
		className : 'col-lg-12 col-sm-12 col-xs-12 space',
		template : Handlebars.compile($itemMainTemp2),
		render : function(){
			var data = this.model.toJSON();
			var mcc 	= data.merchant.merchantCode.mcc;
			var mcId 	= data.merchant.mcId;
			var pId 	= data.id;
			var img 	= data.img;
			this.$el.html(this.template(data));
			this.$el.find('img').attr('src','/Talalah/content/'+mcc+"/"+mcId+"/"+pId+"/"+img);
			var shDes = this.$el.find('.shDes');
			shDes.text(shDes.text().substring(0,800));
			return this.$el;
		}
	});
	
	var ItemMainViews = Backbone.View.extend({
		render:function(){
			var ind = 0;
			_.each(this.collection.models, function(item){
				if(ind%2===0){
					var productMainView = new ItemMainView1({model:item});
					this.$el.append(productMainView.render());
				}
				else{
					var productMainView = new ItemMainView2({model:item});
					this.$el.append(productMainView.render());
				}
				ind++;
			}, this);
			return this.$el;
		}
	});
	
	return {
		ItemPageView : ItemPageView,
		ItemMainViews : ItemMainViews
	}
});