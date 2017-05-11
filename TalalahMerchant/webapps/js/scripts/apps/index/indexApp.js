/**
 * 
 */	
define(function(require,exports,module){
	var $		 	= require('jquery');
	var _ 			= require('underscore');
	var Backbone 	= require('backbone');
	var app			= require('indexCoreApp');
	
	var ApplicationRouter = Backbone.Router.extend({
		initialize: function(){
			// check localStorage for Shopping cart Content
			var sessionStorage = window.sessionStorage;
			var shopCart = sessionStorage.getItem('shopCart');
			if(shopCart===null){
				shopCart = [];
				sessionStorage.setItem('shopCart',JSON.stringify(shopCart));
			}
			else{
				var items = JSON.parse(shopCart);
				var num	  = items.length;
				document.getElementById("shopCartItems").innerHTML=num;
			}
			
			// Search Item Action
			
			$('#SearchProductForm').submit(function(e){
				e.preventDefault();
				var keyVal = $('#itemSearchVal').val().trim();
				if(keyVal.trim()!==""){
					window.location.href='#Search/Product/'+keyVal;
				}
			});
			
			$('#searchItem').on('click', function(e){
				var keyVal = $('#itemSearchVal').val().trim();
				if(keyVal.trim()!==""){
					window.location.href='#Search/Product/'+keyVal;
				}
			});
			
			// View Shopping Cart Action
			$('#shopCart').on('click',function(e){
				window.location.href='#ShoppingCart/View';
			});
			
		},
		routes : {
			''									: 'index',
			'Home' 								: 'index',
			'Travel' 							: 'travel',
			'Product' 							: 'product',
			'Living' 							: 'living',
			'Contact' 							: 'info',
			'Home/Product/:mcc/:mcId/:id'		: 'getProduct',
			'Home/Product/:mcc/:mcId'			: 'getProductMc',
			'Home/Product/:mcc'					: 'getProductMcc',
			'Search/Product/:keyVal'			: 'searchProduct',
			'ShoppingCart/View'					: 'viewCart',
			'ShoppingCart/RemoveItem/:index'	: 'removeItem'
		},
		index : function() {
			$('.nav li').removeClass('active');
			$('#item-home').addClass('active');
			$('#pageContent').empty();
			$('#pageContent').append(app.showHome());
			
		},
		travel : function() {
			$('.nav li').removeClass('active');
			$('#item-travel').addClass('active');
			$('#pageContent').empty();
			$('#pageContent').append(app.showTravel());
		},
		product : function() {
			$('.nav li').removeClass('active');
			$('#item-fashion').addClass('active');
			$('#pageContent').empty();
			$('#pageContent').append(app.showItem());
		},
		info : function(){
			$('.nav li').removeClass('active');
			$('#item-living').addClass('active');
			$('#pageContent').empty();
			$('#pageContent').append(app.showContact());
		},
		getProduct:function(mcc, mcId, pid){
			$('#pageContent').empty();
			$('#pageContent').append(app.showProduct(mcc, mcId, pid));
		},
		getProductMc:function(mcc, mcId){
			$('#pageContent').empty();
			$('#pageContent').append(app.showProductMc(mcc, mcId));
		},
		getProductMcc:function(mcc){
			$('#pageContent').empty();
			$('#pageContent').append(app.showProductMcc(mcc));
		},
		searchProduct:function(keyVal){
			$('#pageContent').empty();
			$('#pageContent').html(app.showSearchProducts(keyVal));
		},
		viewCart:function(){
			$('#pageContent').empty();
			$('#pageContent').append($(shopCart).html());
			app.viewCart();
		},
		removeItem : function(index){
			$('#pageContent').empty();
			$('#pageContent').append($(shopCart).html());
			app.viewCart();
		}
	});
	
	return{
		start:function(){
			var applicationRouter = new ApplicationRouter();
			Backbone.history.start();
		}
	}
	
	
});