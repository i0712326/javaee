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
	
	var $travelPageTemp 	= $(productTempl).find('#travelPage').html();
	var $travelMainTemp1 	= $(productComponentTempl).find('#itemMainTemp1').html();
	var $travelMainTemp2 	= $(productComponentTempl).find('#itemMainTemp2').html();
	
	var TravelPageView = Backbone.View.extend({
		className : 'container',
		render:function(){
			this.$el.html($travelPageTemp);
			return this.$el;
		}
	});
	
	var TravelMainView1 = Backbone.View.extend({
		className : 'col-xs-12 col-sm-12 col-lg-12 space',
		template : Handlebars.compile($travelMainTemp1),
		render : function(id){
			var data = this.model.toJSON();
			data.destinationId = id;
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
	
	var TravelMainView2 = Backbone.View.extend({
		className : 'col-xs-12 col-sm-12 col-lg-12 space',
		template : Handlebars.compile($travelMainTemp2),
		render : function(id){
			var data = this.model.toJSON();
			data.destinationId = id;
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
	
	var TravelMainViews = Backbone.View.extend({
		render:function(id, ind){
			_.each(this.collection.models, function(item){
				if(ind%2===0){
					var productMainView = new TravelMainView1({model:item});
					this.$el.append(productMainView.render(id));
				}
				else{
					var productMainView = new TravelMainView2({model:item});
					this.$el.append(productMainView.render(id));
				}
			}, this);
			return this.$el;
		}
	});
	
	return {
		TravelPageView : TravelPageView,
		TravelMainViews : TravelMainViews
	}
	
});