<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@page session="true"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="Phoudthavong Thephanonexay">
<title>LaosTalalah</title>
<spring:url value="../../" var="path"/>
<spring:url value="${path}css/bootstrap.min.css" var="bootStrapCss"/>
<spring:url value="${path}css/bootstrap-datetimepicker.min.css" var="bootStrapDatetimePicker"/>
<spring:url value="${path}css/merchant_style.css" var="merchantStyleCss"/>
<spring:url var="mcId" value="${merchant.mcId}"/>
<link href="${bootStrapCss}" rel="stylesheet"></link>
<link href="${bootStrapDatetimePicker}" rel="stylesheet"></link>
<link href="${merchantStyleCss}" rel="stylesheet"></link>
</head>
<body>
	<!-- header navigation -->
	<nav class="navbar navbar-default">
	  <div class="container-fluid">
	    <div class="navbar-header">
	      <a class="navbar-brand" href="#"><span class="glyphicon glyphicon-th"></span> &nbsp; Merchant</a>
	    </div>
	    <ul class="nav navbar-nav navbar-right">
	      <li id="home"  class="active">
	      	<a href="#Home/Customer/${mcId}">Home</a>
	      </li>
	      <li id="messages" role="presentation" class="dropdown">
	      	<a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
	      		Messages <span class="caret"></span>
	      	</a>
	      	<ul class="dropdown-menu">
	      		<li><a href="#Messages/Customer/${mcId}/Inbox">Inbox</a></li>
	      		<li role="separator" class="divider"></li>
	      		<li><a href="#Messages/Customer/${mcId}/Sent">Sent</a></li>
	      	</ul>
	      </li>
	      <li id="product">
	      	<a href="#Products/Customer/${mcId}">Products</a>
	      </li>
	      <li id="order">
	      	<a href="#Order/Customer/${mcId}">Order</a>
	      </li>
	      <li id="history">
	      	<a href="#History/Customer/${mcId}">History</a>
	      </li>
	      <li id="logout">
	      	  <c:url value="/j_spring_security_logout" var="logoutUrl"/>
	      	  <form class="navbar-form navbar-right" action="${logoutUrl}" method="post" id="logoutForm">
	      	  	<input type="hidden" name="mcId" value="${mcId}"/>
		      	<input type="hidden" name="${_csrf.parameterName}"	value="${_csrf.token}" />	
	      	  </form>
	      	  <a href="#"><span id="logout">Log out <span class="glyphicon glyphicon-log-out"></span></span></a>
	      </li>
	    </ul>
	  </div>
	</nav>
	
	<!-- Application content -->
	<div class="container">
		<div id="page-content"></div>
	</div>
    
    <!-- Page Content -->
     <div class="container">

        <hr>

        <!-- Footer -->
        <footer>
            <div class="row">
                <div class="col-lg-12">
                    <p>Copyright &copy; Talalah.com</p>
                </div>
            </div>
        </footer>

    </div>
    <!-- /.container -->
    <!-- /.container -->
    <spring:url value="${path}js/scripts/merchantMain" var="merchantMainJs"/>
    <spring:url value="${path}js/lib/require.js" var="requireJs"/>
	<script data-main="${merchantMainJs}" src="${requireJs}"></script>
</body>
</html>