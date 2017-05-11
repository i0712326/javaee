<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<spring:url value="../../css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="../../css/backgrid.css" var="backGridCss"/>
<spring:url value="../../css/backgrid-filter.min.css" var="backGridFilterCss"/>
<spring:url value="../../css/backgrid-paginator.min.css" var="backGridPaginatorCss"/>
<spring:url value="../../css/backgrid-select-all.min.css" var="backgridSelectAllCss"/>
<spring:url value="../../css/admin_style.css" var="adminStyleCss"/>
<link rel="stylesheet" href="${bootstrapCss}" type="text/css"></link>
<link rel="stylesheet" href="${backGridCss}"  type="text/css"></link>
<link rel="stylesheet" href="${backGridFilterCss}" type="text/css"></link>
<link rel="stylesheet" href="${backGridPaginatorCss}" type="text/css"></link>
<link rel="stylesheet" href="${backgridSelectAllCss}" type="text/css"></link>
<link rel="stylesheet" href="${adminStyleCss}" type="text/css"></link>
<title>Administrator</title>
</head>
<body>
	<!-- header navigation -->
	<nav class="navbar navbar-default">
	  <div class="container-fluid">
	    <div class="navbar-header">
	      <a class="navbar-brand" href="#"><span class="glyphicon glyphicon-th"></span> &nbsp; Administrator</a>
	    </div>
	    <ul class="nav navbar-nav navbar-right">
	      <li id="admin-home"">
	      	<a href="#Home">Home</a>
	      </li>
	      <li id="admin-merchant" class="active">
	      	<a href="#Merchant">Merchant</a>
	      </li>
	      <li id="admin-product">
	      	<a href="#Product">Product</a>
	      </li>
	      <li id="admin-shipping">
	      	<a href="#Shipping">Shipping</a>
	      </li>
	      <li id="admin-customer">
	      	<a href="#Customer">Customer</a>
	      </li>
	      <li id="admin-order">
	      	<a href="#Order">Order</a>
	      </li>
	      <li id="admin-back">
	      	<a href="#">Log out <span class="glyphicon glyphicon-log-out"></span></a>
	      </li>
	    </ul>
	  </div>
	</nav>
	<!-- body -->
	<div class="container">
		<div id="page-content"></div>
	</div>
	<!-- footer -->
	<div class="container">
        <hr>
        <!-- Footer -->
        <footer>
            <div class="row">
                <div class="col-lg-12" style="text-align: center">
                    <p>Copyright &copy;Talalah.com</p>
                </div>
            </div>
        </footer>
    </div>
	<!-- Javascript library parts -->
	<spring:url value="../../js/lib/jquery-2.1.3.min.js" var="jquery" />
	<spring:url value="../../js/lib/bootstrap.min.js" var="bootstrapJs" />
	<spring:url value="../../js/lib/require.js" var="requireJs"/>
	<spring:url value="../../js/scripts/adminMain" var="adminMainJs"/> 
	<script type="text/javascript" src="${jquery}"></script>
	<script type="text/javascript" src="${bootstrapJs}"></script>
	<script data-main="${adminMainJs}" src="${requireJs}"></script>
</body>
</html>