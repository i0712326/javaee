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
<link href="css/bootstrap.min.css" rel="stylesheet"></link>
<link href="css/index_style.css" rel="stylesheet"></link>
</head>
<body>
<!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <p class="navbar-brand"> <span> <img alt="" src="css/img/tm/tm32x32.png"/> LaosTalalah </span></p>
            </div>
            <!-- Collect the nav links, forms, and other content for navigation bar -->
          	<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          		  <ul class="nav navbar-nav">
                    <li id="item-home" class="active">
                        <a href="#Home">Home</a>
                    </li>
                    <li id="item-travel">
                        <a href="#Travel"> Travel </a>
                    </li>
                    <li id="item-fashion">
                        <a href="#Product">Products</a>
                    </li>
                    <li id="item-contact">
                        <a href="#Contact">About Us</a>
                    </li>
                </ul>
				<form class="navbar-form navbar-right" action="#SearchProduct" method="get" id="SearchProductForm">
					<div class="form-group">
						<input type="text" class="form-control" placeholder="travel:name or product:name" size="40" id="itemSearchVal"/>
					</div>
					<button type="button" class="btn btn-default" id="searchItem">
  						<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
					</button>
					<button type="button" class="btn btn-default noti_Container" id="shopCart">
  						<span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>
  						<span class="noti_bubble" id="shopCartItems">0</span>
					</button>
					<a href="/Talalah/loginSignin.jsp" class="btn btn-default" role="button">
						<span class="glyphicon glyphicon-log-in aria-hidden="true" title="LOG IN"></span>
					</a>
				</form>
			</div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>
    
    <!-- Page Content -->
    <div id="pageContent"></div>
   
    <!-- /.container -->
    
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
    <!-- /.container -->
    <!-- /.container -->
    <script type="text/javascript" src="js/lib/jquery-2.1.3.min.js"></script>
    <script type="text/javascript" src="js/lib/bootstrap.min.js"></script>
	<script data-main="js/scripts/indexMain" src="js/lib/require.js"></script>
</body>
</html>