<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<spring:url value="css/bootstrap.min.css" var="bootStrapCss"/>
<spring:url value="js/lib/jquery-2.1.3.min.js" var="jqueryJs"/>
<spring:url value="js/lib/bootstrap.min.js" var="bootStrapJs"/>
<spring:url value="js/lib/verify.notify.min.js" var="verifyJs"/>
<spring:url value="js/lib/sha1.min.js" var="shaJs"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" href="${bootStrapCss}" type="text/css">
<style type="text/css">
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 50px auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form h2{
	font-family: "Roboto", sans-serif;
}
.form input {
  /* font-family: "Roboto", sans-serif; */
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #91D6ED;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #457EBA;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
  text-decoration: none;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before, .container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #EF3B3A;
}
</style>
<title>Talalah Merchant</title>
</head>
<body>
	<div class="login-page">
		<div class="form">
			<img src="content/util/img/mystore.png" width="200" height="60" />
			<hr/>
			<c:url value="j_spring_security_check" var="loginUrl" />
			<form class="login-form"  action="${loginUrl}" method="POST">
				<input type="text" name="email" placeholder="username" data-validate="required"/> 
				<input type="password" name="passwd" placeholder="password" data-validate="required"/>
				<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
				<button type="submit" class="submit">login</button>
			</form>
		</div>
	</div>
	<script type="text/javascript" src="${jqueryJs}"></script>
	<script type="text/javascript" src="${bootStrapJs}"></script>
	<script type="text/javascript" src="${verifyJs}"></script>
	<script type="text/javascript" src="${shaJs}"></script>
	<script type="text/javascript">
		$(function(){
				$('input[name=passwd]').blur(function(){
						var passwd = sha1($('input[name=passwd]').val().trim());
						if(passwd!=='')
							$('input[name=passwd]').val(passwd);
				});
				
				$('.submit').click(function(e){
					e.preventDefault();
					var email = $('input[name=email]').val().trim();	
					var passwd = $('input[name=passwd]').val().trim();
					if(email===''||passwd===''){
						return false;
					}

					$('form').submit();
					
				});
			
		});

	</script>
</body>
</html>