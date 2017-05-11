/*****
 * 
 * Core Application for client communicate with server for requesting data.
 * 
 *****/
define(function(require,exports,module){
	
	var homePage 			= require('home.page');
	var travelPage 			= require('travel.page');
	//TODO var travelDestPage		= require('travel.destination.page');
	var itemPage			= require('item.page');
	var productPage 		= require('product.page');
	var productSearchPage 	= require('product.search.page');
	var cartPage			= require('cart.page');
	
	var endPoint = {
			showHome : function(){
				return homePage.showHomePage();
			},
			showTravel : function(){
				return travelPage.showTravelPage();
			},
			showTravelByDest : function(id){
				// TODO return travelDestPage.showTravelPage(id);
			},
			showItem : function(){
				return itemPage.showItemPage();
			},
			showProduct : function(mcc,mcId,pId){
				return productPage.showTheProductPage(mcc,mcId,pId);
			},
			showProductMc : function(mcc,mcId){
				return productPage.showProductMcPage(mcc,mcId);
			},
			showProductMcc : function(mcc){
				return productPage.showProductMccPage(mcc);
			},
			showSearchProducts : function(keyWord){
				return productSearchPage.showSearchProduct(keyWord);
			},
			showCartPage : function(){
				return cartPage.showCart();
			},
			showContact : function(){
				return null;
			}
	}
	
	return endPoint;
});