/**
 * 
 */
define(function(require,exports,module){
	
	var Model	= require('model');
	var View	= require('home.view');
	var PrdView = require('product.view');
	var init	= require('init');
	
	var talalah	= init.init();
	var contentUtil = talalah.com.client.app.page.content.util;
	var HomePage	=	function(){
		
		this.render	=	function(){
			
			var prevSlideButtonModel = new Model.SlideButtonModel({lbBtn1:'left',lbBtn2:'prev', lbBtn3:'icon-prev', lbBtn4:'Previous'});
			
			var nextSlideButtonModel = new Model.SlideButtonModel({lbBtn1:'right',lbBtn2:'next', lbBtn3:'icon-next', lbBtn4:'Next'});
			
			var slideShowImgs = [ 
				contentUtil+'/img/1800x500.png',
				contentUtil+'/img/1800x500.png',
				contentUtil+'/img/1800x500.png',
				contentUtil+'/img/1800x500.png',
				contentUtil+'/img/1800x500.png'];
			var slideShows = new Model.SlideShows();
			for(var i=0;i<slideShowImgs.length;i++){
				var slideShow = new Model.SlideShow({num:i,path:slideShowImgs[i],name:'image'+i});
				slideShows.add(slideShow);
			}
			
			var slideShowIndicatorViews = new View.SlideShowIndicatorViews({collection:slideShows});
			var slideShowImageViews 	= new View.SlideShowImageViews({collection:slideShows});
			var prevSlideButtonView 	= new View.PrevSlideButtonView({model:prevSlideButtonModel});
			var nextSlideButtonView 	= new View.NextSlideButtonView({model:nextSlideButtonModel});
			var homeView 				= new View.HomeView();
			
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