define(['jquery','underscore','backbone','deep-model','handlebars','bootstrap','backgrid','init','backbone.paginator','backgridPaginator','backgridFilter'],
		function($, _,Backbone, deepModel, Handlebars, Bootstrap, backGrid,init,BackbonePaginator, backgridPaginator, backgridFilter){
	
	var talalah = init.init();
	
	var DataGrid = function(columnNames, $pageableData, DoubleClickRow, filterField, filterPlaceholder){
		var $view = $('<div></div>');
		var dataGrid = new Backgrid.Grid({
			row : DoubleClickRow,
			columns : columnNames,
			collection : $pageableData
		});
		
		var paginator = new Backgrid.Extension.Paginator({
			windowSize: 20,
			slideScale: 0.25, 
			goBackFirstOnSort: false,
		  	collection: $pageableData
		});
		
		var filter = new Backgrid.Extension.ServerSideFilter({
		  collection: $pageableData,
		  name: filterField,
		  placeholder: filterPlaceholder
		});
		
		return { render : function(){
					$view.append(filter.render().$el)
					.append(dataGrid.render().$el)
					.append(paginator.render().$el);
					$(filter.el).css({float: "left", margin: "20px"});
					$pageableData.fetch({reset: true});
					return $view;
				}
		
		}
	}

	var ShippingProvidersGrid = function(id){
		var columnNames = [{name:"itemShippingProviderId.shippingProvider.id", label:"ID", editable:false, cell:"string"},
		                   {name:"itemShippingProviderId.shippingProvider.name", label:"Name", editable:false, cell:"string"},
		                   {name:"price", label:"Price (USD)", editable:false, cell:"integer"},
		                   {name:"min", label:"Minimum (Days)", editable:false, cell:"integer"},
		                   {name:"max", label:"Maxium (Days)", editable:false, cell:"integer"}];
		var ItemShippingProvider = Backbone.DeepModel.extend({});
		var ItemShippingProviders = Backbone.Collection.extend({
			url:talalah.com.client.app.entity.product.item.itemShippingProvider.get+"/"+id,
			model:ItemShippingProvider
		});
		var itemShippingProviders = new ItemShippingProviders();
		var dataGrid = new Backgrid.Grid({
			columns : columnNames,
			collection : itemShippingProviders
		});
		
		itemShippingProviders.fetch({reset:true});
		
		return {render : dataGrid.render().$el};
	}
	
	
	var ActivitiesGrid = function(id){
		var columnNames = [{name:"id", label:"ID", editable:false, cell:"string"},
		                   {name:"name", label:"Name", editable:false, cell:"string"},
		                   {name:"activityCategory.name", label:"Category", editable:false, cell:"string"}];
		var Activity = Backbone.DeepModel.extend({});
		var Activities = Backbone.Collection.extend({
			url:talalah.com.client.app.entity.product.travel.activity.get+"/product/"+id+"?first=0&max=100",
			model:Activity
		});
		var activities = new Activities();
		var dataGrid = new Backgrid.Grid({
			columns : columnNames,
			collection : activities
		});
		
		activities.fetch({reset:true});
		
		return {render : dataGrid.render().$el};
		
	}
	var SubmitMerchantForm = function(action, method, $success, $error, $mForm){
			this.submitFunc = function(){
					var that = $mForm;
					var id 		= "", $id 		= that.find('#id');
					var mcc 	= "", $mcc 		= that.find('#mcc');
					var name 	= "", $name		= that.find('#name');
					var url		= "", $url		= that.find('#url');
					var country = "", $country 	= that.find('#country');
					var pvId	= "", $pvId 	= that.find('#pvId');
					var postal	= "", $postal 	= that.find('#postal');
					var addr1	= "", $addr1 	= that.find('#addr1');
					var addr2	= "", $addr2 	= that.find('#addr2');
					var addr3	= "", $addr3 	= that.find('#addr3');
					var tel		= "", $tel 		= that.find('#tel');
					var email	= "", $email 	= that.find('#email');
					var fax		= "", $fax 		= that.find('#fax');
					var addrId  = "", $addrId 	= that.find('#addrId');
					var file 	= that.find('#lefile').prop("files")[0];
					
					if($id	   != null) id 	    = $id.val().trim();
					if($mcc	   != null)	mcc     = $mcc.val().trim();
					if($name   != null) name    = $name.val().trim();
					if($url    != null) url     = $url.val().trim();
					if($pvId   != null) pvId    = $pvId.val().trim();
					if($country!= null) country = $country.val().trim();
					if($postal != null) postal  = $postal.val().trim();
					if($addr1  != null) addr1   = $addr1.val().trim();
					if($addr2  != null) addr2   = $addr2.val().trim();
					if($addr3  != null) addr3   = $addr3.val().trim();
					if($tel    != null) tel     = $tel.val().trim();
					if($email  != null) email   = $email.val().trim();
					if($fax    != null) fax     = $fax.val().trim();
					if($addrId != null) addrId  = $addrId.val().trim();
					
					var $formData = new FormData();
					$formData.append("id",		     id);
					$formData.append("mcc",		    mcc);
					$formData.append("name",	   name);
					$formData.append("url",		    url);
					$formData.append("country", country);
					$formData.append("pvId",	   pvId);
					$formData.append("postal", 	 postal);
					$formData.append("addr1", 	  addr1);
					$formData.append("addr2", 	  addr2);
					$formData.append("addr3", 	  addr3);
					$formData.append("tel", 		tel);
					$formData.append("email", 	  email);
					$formData.append("fax", 		fax);
					$formData.append("addrId",	 addrId);
					$formData.append("file", 	  file);
					var postData ={
							 url: action,
							 type :  method,
							 dataType : "text",
							 data : $formData,
							 processData : false,
							 contentType : false,
							 success:function(data,textStatus,jqXHR ){
								$success.run();
							},
							error: function(XMLHttpRequest, textStatus, errorThrown) {
								$error.run(textStatus);	
							}
					  };
					$.ajax(postData);
					
				}
	}
	
	var ShowPopupDialog = function(){
		var Merchant = Backbone.Model.extend({});
		var columnMerchantNames = [{name:"mcc", label:"MCC", editable:false, cell:"string"},{name:"note", editable:false, label:"NOTE", cell:"string"}];
		var PageableMerchant = Backbone.PageableCollection.extend({
			  model:Merchant,
			  url: talalah.com.client.app.entity.merchant.merchantCode.get+"/pager?note=%25",
			  state: {pageSize: 15, sortKey: "updated", order: 1 },
			  queryParams: { totalPages: null,totalRecords: null, note : "%25"},
			  parseState: function (resp, queryParams, state, options) {
			    return {totalRecords: resp.total_count};
			  },
			  parseRecords: function (resp, options) { return resp.items;} 
		});
		
		var MccDoubleClickRow = Backgrid.Row.extend({
			  events: { dblclick : 'getRowData'},
			  getRowData : function () {
					var mcc = this.$el.find('.mcc').text().trim();
					var note = this.$el.find('.note').text().trim();
				    $('#mcc').val(mcc); 
				    $('#mcc').attr('title',note);
				    $('#mccBox').modal('hide');
				}
		});
		
		
		var District = Backbone.Model.extend({});
		var columnDistrictNames = [{name:"id", label:"CODE", editable:false, cell:"string"},{name:"name", editable:false, label:"NAME", cell:"string"}];
		var PageableDistrict =  Backbone.PageableCollection.extend({
			model: District,
			url:talalah.com.client.app.entity.shipping.district.get+"?name=%25",
			state: { pageSize: 15, sortKey: "updated", order: 1 },
			queryParams: {totalPages: null,totalRecords: null,name : "%25"},
			parseState: function (resp, queryParams, state, options) {
			    return {totalRecords: resp.total_count};
			},
			parseRecords: function (resp, options) {return resp.items;} 
		});
		
		var DistDoubleClickRow = Backgrid.Row.extend({
			  events: { dblclick : 'getRowData'},
			  getRowData : function () {
				  var id = this.$el.find('.id').text().trim();
				  var name = this.$el.find('.name').text().trim();
				  $('#pvId').val(id); 
				  $('#pvId').attr('title',name);
				  $('#cityBox').modal('hide');
				}
		});
		
		return {
			getMerchantDataGrid : function(){
				var merchantDataGrid = new DataGrid(columnMerchantNames, new PageableMerchant(), MccDoubleClickRow, "note", "Note");
				return merchantDataGrid.render();
			},
			getCityDataGrid : function(){
				var districtDataGrid = new DataGrid(columnDistrictNames, new PageableDistrict(), DistDoubleClickRow, "name", "Name");
				return districtDataGrid.render();
				
			}
		}
		
		
	}
	var showPopupDialog = new ShowPopupDialog();
	return {
		submitActionForm:function(uri,method,$form){
			var success = {
					run : function(){
						$('#result-content').html('<div class="alert alert-success"><span class="glyphicon glyphicon-ok"></span> Operation is Successfully executed !</div>');
						$('#ResultModal').modal('show');
						$('#ResultModal').on('hidden.bs.modal', function (e){
							window.location.href="#Merchant";
						});
					}
			};
			
			var error = {
					run : function(msg){
						$('#result-content').html('<div class="alert alert-error"><span class="glyphicon glyphicon-remove"></span> Operation is failed '+msg+'</div>');
						$('#ResultModal').modal('show');
					}
			};
			 var submitMerchantForm = new SubmitMerchantForm(uri,method,success,error,$form);
			submitMerchantForm.submitFunc();
		},
		getMccGrid:function(){
			return showPopupDialog.getMerchantDataGrid();
		},
		getCityGrid:function(){
			return showPopupDialog.getCityDataGrid();
		},
		getShippingProdersGrid:function(id){
			var shippingProvidersGrid = new ShippingProvidersGrid(id);
			return shippingProvidersGrid.render;
		},
		getActivitiesGrid:function(id){
			var activitiesGrid = new ActivitiesGrid(id);
			return activitiesGrid.render;
		}
	}
});