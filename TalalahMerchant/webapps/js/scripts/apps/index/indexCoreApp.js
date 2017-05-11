/*****
 * 
 * Core Application for client communicate with server for requesting data.
 * 
 *****/
define(function(require,exports,module){
	
	var homePage 			= require('home.page');
	var travelPage 			= require('travel.page');
	var itemPage			= require('item.page');
	var productPage 		= require('product.page');
	var productSearchPage 	= require('product.search.page');
	
	var endPoint = {
			showHome : function(){
				return homePage.showHomePage();
			},
			showTravel : function(){
				return travelPage.showTravelPage();
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
			showContact : function(){
				return null;
			}
	}
	
	return endPoint;
});