<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
<spring:url value="${customer.id}" var="custId"/>
<spring:url value="${customer.cart.id}" var="cartId"/>
<spring:url value="../" var="path"></spring:url>
<spring:url value="${path }css/bootstrap.min.css" var="bootstrapCss"></spring:url>
<spring:url value="${path }/css/bootstrap-datetimepicker.min.css" var="bootstrapDatepickerCss"></spring:url>
<spring:url value="${path }/css/home_style.css" var="homeStyleCss"></spring:url>
<link rel="home icon" href="${path }/css/img/tm/tm16x16.ico" type="image/ico"></link>
<link href="${bootstrapCss}" rel="stylesheet"></link>
<link href="${bootstrapDatepickerCss}" rel="stylesheet"></link>
<link href="${homeStyleCss}" rel="stylesheet"></link>
</head>
<body>
	<!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <p class="navbar-brand"> <span> <img alt="" src="${path}css/img/tm/tm32x32.png"/> LaosTalalah</span></p>
            </div>
            <!-- Collect the nav links, forms, and other content for navigation bar -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li id="item-home" class="active">
                        <a href="#Home">Home</a>
                    </li>
                    <li id="item-travel">
                        <a href="#Home/Travel">Travel</a>
                    </li>
                    <li id="item-fashion">
                        <a href="#Home/Product">Product</a>
                    </li>
                    <li id="item-contact">
                        <a href="#Home/Contact">About Us</a>
                    </li>
                </ul>
                <c:url value="/j_spring_security_logout" var="logoutUrl"/>
				<form class="navbar-form navbar-right" action="${logoutUrl}" id="actionForm" method="post">
					<div class="form-group">
						<input type="text" class="form-control" placeholder="Search" size="40" id="itemSearchVal"/>
					</div>
					<button type="button" class="btn btn-default" id="searchItem">
  						<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
					</button>
					<button type="button" class="btn btn-default noti_Container" id="shopCart">
  						<span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>
  						<span class="noti_bubble" id="shopCartItems">0</span>
					</button>
					<a href="#Home/Customer/${custId}" role="button" class="btn btn-default">
						<span class="glyphicon glyphicon-user" title="${customer.usrname}"></span>
					</a>
					<input type="hidden" name="${_csrf.parameterName}"	value="${_csrf.token}" />					
					<button class="btn btn-default" type="submit">
						<span class="glyphicon glyphicon-log-out" title="LOGOUT"></span>
					</button>
				</form>
			</div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>
    <input type="hidden" name="custId" id="custId" value="${custId}">
    <!-- Page Content -->
    <div id="pageContent"></div>
   	
    <!-- /.container -->
    <div class="container">

        <hr>

        <!-- Footer -->
        <footer>
            <div class="row">
                <div class="col-lg-12" style="text-align: center">
                    <p>Copyright &copy; Talalah.com</p>
                </div>
            </div>
        </footer>

    </div>
    <!-- /.container -->
    <!-- /.container -->
    <spring:url value="${path }js/lib/jquery-2.1.3.min.js" var="jQueryJs"></spring:url>
    <spring:url value="${path }js/lib/bootstrap.min.js" var="bootstrapJs"></spring:url>
    <spring:url value="${path }js/scripts/homeMain" var="main"></spring:url>
    <spring:url value="${path }js/lib/require.js" var="requireJs"></spring:url>
    <script type="text/javascript" src="${jQueryJs}"></script>
    <script type="text/javascript" src="${bootstrapJs}"></script>
	<script data-main="${main}" src="${requireJs}"></script>
</body>
</html>