<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="Phoudthavong Thephanonexay">
<title>LaosTalalah</title>
<link rel="home icon" href="css/img/tm/tm16x16.ico" type="image/ico">
<!-- Bootstrap Core CSS -->
<link href="/EmarketWeb/css/bootstrap.min.css" rel="stylesheet"></link>
<link href="/EmarketWeb/css/shop-homepage.css" rel="stylesheet"></link>
<link href="/EmarketWeb/css/logon_signup.css" rel="stylesheet"></link>
</head>
<body>
	 <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <p class="navbar-brand"> <span> <img alt="" src="/EmarketWeb/css/img/tm/tm32x32.png"/> LaosTalalah </span></p>
            </div>
            <!-- Collect the nav links, forms, and other content for navigation bar -->
          	<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          		  <ul class="nav navbar-nav">
                    <li id="item-home" class="active">
                        <a href="#Home">Home</a>
                    </li>
                    <li id="item-travel">
                        <a href="#Travel">Travel</a>
                    </li>
                    <li id="item-fashion">
                        <a href="#Fashion">Fashion</a>
                    </li>
                    <li id="item-living">
                        <a href="#contact">Living</a>
                    </li>
                    <li id="item-contact">
                        <a href="#contact">Contact</a>
                    </li>
                </ul>
				<form class="navbar-form navbar-right" action="#">
					<div class="form-group">
						<input type="text" class="form-control" placeholder="Search" size="40" id="itemSearchVal"/>
					</div>
					<button type="button" class="btn btn-default" id="searchItem">
  						<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
					</button>
					<a href="/EmarketWeb/loginSignin.jsp" class="btn btn-default" role="button">
						<span class="glyphicon glyphicon-log-in aria-hidden="true" title="LOG IN"></span>
					</a>
				</form>
			</div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>
    <!-- Main container -->
    <div class="container-fluid">
    	<div class="row-fluid">
    		<div class="span2">
    			<!-- Sidebar content -->
    			<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
				  <li><a tabindex="-1" href="#">Action</a></li>
				  <li><a tabindex="-1" href="#">Another action</a></li>
				  <li><a tabindex="-1" href="#">Something else here</a></li>
				  <li><a tabindex="-1" href="#">Separated link</a></li>
				</ul>
    		</div>
    		<div class="span10">
    			<!-- Body content -->
    		</div>
    	</div>
    </div>
    
    <script data-main="/EmarketWeb/js/scripts/startApplication" src="/EmarketWeb/js/lib/require.js"></script>
</body>
</html>