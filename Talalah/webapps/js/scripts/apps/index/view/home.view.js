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
	var event		= 	require('home.event');
	var View		= 	require('product.view');
	var HomeMainTemp		=	require('text!homeTemp');
	var HomeComponentTemp	=	require('text!homeComponentTemp');
	
	var talalah = init.init();
	
	var $slideShowIndicatorTemp = $(HomeComponentTemp).find('#carouselLink').html();
	var $slideShowImageTemp	    = $(HomeComponentTemp).find('#carouselImage').html();
	var $productTemp			= $(HomeComponentTemp).find('#productBox').html();
	var $nextSlideButtonTemp	= $(HomeComponentTemp).find('#nextBtn').html();
	var $prevSlideButtonTemp	= $(HomeComponentTemp).find('#prevBtn').html();
	var $homeTemp			    = $(HomeMainTemp).html();
	
	var SlideShowIndicatorView = Backbone.View.extend({
		tagName:'li',
		render:function(){
			var num = this.model.toJSON().num;
			if(num===0) this.$el.attr('class','active');
			this.$el.attr('data-target','#carousel-home-generic');
			this.$el.attr('data-slide-to',num);
			return this.$el;
		}
	});
	
	var SlideShowIndicatorViews = Backbone.View.extend({
		tagName:'ol',
		className:'carousel-indicators',
		render:function(){
			_.each(this.collection.models, function(item){
				var slideShowIndicatorView = new SlideShowIndicatorView({model:item});
				this.$el.append(slideShowIndicatorView.render());
			}, this);
			return this.$el;
		}
	});
	
	var SlideShowImageView = Backbone.View.extend({
		tagName:'div',
		className : 'item',
		template : Handlebars.compile($slideShowImageTemp),
		render : function(){
			var num = this.model.toJSON().num;
			if(num===0) this.$el.attr('class','item active');
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.find('img').attr('src',this.model.toJSON().path);
			this.$el.find('img').attr('alt',this.model.toJSON().name);
			return this.$el;
		}
	});
	
	var SlideShowImageViews = Backbone.View.extend({
		className:'carousel-inner',
		render : function(){
			_.each(this.collection.models, function(item){
				var slideShowImageView = new SlideShowImageView({model:item});
				this.$el.append(slideShowImageView.render());
			}, this);
			this.$el.attr("role","listbox");
			return this.$el;
		}
	});
	
	var PrevSlideButtonView = Backbone.View.extend({
		tagName:'a',
		template:Handlebars.compile($prevSlideButtonTemp),
		render:function(){
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
			this.$el.attr('class', data.lbBtn1 + " carousel-control");
			this.$el.attr('href', "#carousel-home-generic");
			this.$el.attr('role',"button");
			this.$el.attr('data-slide',data.lbBtn2);
			return this.$el;
		}
	});
	
	var NextSlideButtonView = Backbone.View.extend({
		tagName:'a',
		template:Handlebars.compile($nextSlideButtonTemp),
		render:function(){
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
			this.$el.attr('class', data.lbBtn1 + " carousel-control");
			this.$el.attr('href', "#carousel-home-generic");
			this.$el.attr('role',"button");
			this.$el.attr('data-slide',data.lbBtn2);
			return this.$el;
		}
	});
	
	var HomeView = Backbone.View.extend({
		initialize : function(){
			this.tvlCnt = 1;
			this.iteCnt = 1;
		},
		className : 'container',
		render : function(){
			this.$el.html($homeTemp);
			return this.$el;
		},
		events : {
			'click #travelBtn' : 'doLoadTravelMore',
			'click #itemBtn' : 'doLoadItemMore'
		},
		doLoadTravelMore : function(e){
			e.preventDefault();
			var count = this.tvlCnt;
			event.loadMoreTravel(count,this,View.ProductViews);
			this.tvlCnt++;
		},
		doLoadItemMore : function(e){
			e.preventDefault();
			var count = this.iteCnt;
			event.loadMoreItem(count,this,View.ProductViews);
			this.iteCnt++;
		}
	});
	
	return {
		HomeView 				: HomeView,
		SlideShowIndicatorView 	: SlideShowIndicatorView,
		SlideShowIndicatorViews : SlideShowIndicatorViews,
		SlideShowImageView 		: SlideShowImageView,
		SlideShowImageViews 	: SlideShowImageViews,
		PrevSlideButtonView 	: PrevSlideButtonView,
		NextSlideButtonView 	: NextSlideButtonView
	}
	
});