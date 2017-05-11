/**
 * 
 */
define(function(require,exports,module){
	
	var Model	= require('model');
	var View	= require('homeView');
	var PrdView = require('productView');
	var init	= require('init');
	
	var talalah	= init.init();
	
	var HomePage	=	function(){
		
		this.render	=	function(){
			var user = new Model.User({name:'Administrator'});
			
			var prevSlideButtonModel = new Model.SlideButtonModel({lbBtn1:'left',lbBtn2:'prev', lbBtn3:'icon-prev', lbBtn4:'Previous'});
			
			var nextSlideButtonModel = new Model.SlideButtonModel({lbBtn1:'right',lbBtn2:'next', lbBtn3:'icon-next', lbBtn4:'Next'});
			
			var slideShow0 = new Model.SlideShow({num:0,path:'/Talalah/content/util/img/1800x500.png',name:'image01'});
			var slideShow1 = new Model.SlideShow({num:1,path:'/Talalah/content/util/img/1800x500.png',name:'image02'});
			var slideShow2 = new Model.SlideShow({num:2,path:'/Talalah/content/util/img/1800x500.png',name:'image03'});
			var slideShow3 = new Model.SlideShow({num:1,path:'/Talalah/content/util/img/1800x500.png',name:'image04'});
			var slideShow4 = new Model.SlideShow({num:2,path:'/Talalah/content/util/img/1800x500.png',name:'image05'});
			
			var slideShows = new Model.SlideShows();
			slideShows.add(slideShow0);
			slideShows.add(slideShow1);
			slideShows.add(slideShow2);
			slideShows.add(slideShow3);
			slideShows.add(slideShow4);
			
			var slideShowIndicatorViews = new View.SlideShowIndicatorViews({collection:slideShows});
			var slideShowImageViews 	= new View.SlideShowImageViews({collection:slideShows});
			var prevSlideButtonView 	= new View.PrevSlideButtonView({model:prevSlideButtonModel});
			var nextSlideButtonView 	= new View.NextSlideButtonView({model:nextSlideButtonModel});
			var homeView 				= new View.HomeView({model:user});
			
			var $view = homeView.render();
			
			$view.find('#carousel-home-generic')
			.append(slideShowIndicatorViews.render())
			.append(slideShowImageViews.render())
			.append(prevSlideButtonView.render())
			.append(nextSlideButtonView.render());
			
			var travelProducts 		= new Model.Products();
			var itemProducts	  	= new Model.Products();
			
			travelProducts.url = talalah.com.client.app.entity.product.travel.travel.get+"?first=0&max=4";
			itemProducts.url = talalah.com.client.app.entity.product.item.item.get+"?first=0&max=4";
			
			travelProducts.fetch({
				success:function(items, response, options){
					var travelProductViews = new PrdView.ProductViews({collection:items});
					$view.find('#travel-product').append(travelProductViews.render());
				}
			});
			
			itemProducts.fetch({
				success:function(items, response, options){
					var itemProductViews = new PrdView.ProductViews({collection:items});
					$view.find('#item-product').append(itemProductViews.render());
				}
			});
			
			return $view;
		}
	}
	
	var endPoint	= {
		showHomePage : function(){
			var homePage = new HomePage();
			return homePage.render();
		}
	}
	
	return endPoint;
});