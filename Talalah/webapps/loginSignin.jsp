<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<spring:url value="css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="css/logon_signup.css" var="logonSignup"/>

<link rel="stylesheet" href="${bootstrapCss}" type="text/css">
<link rel="stylesheet" href="${logonSignup }" type="text/css"/>
<title>Talalah</title>
</head>
<body>
	<div class="loginSignUpArea">
		<c:if test="${not empty error}">
			<div class="error">${error}</div>
		</c:if>
		<!-- Nav tabs -->
		<ul class="nav nav-tabs" role="tablist">
			<li role="presentation" class="active"><a href="#login" aria-controls="login" role="tab" data-toggle="tab">login</a></li>
			<li role="presentation"><a href="#signup" aria-controls="signup" role="tab" data-toggle="tab">signup</a></li>
			
		</ul>

		<!-- Tab panes -->
		<div class="tab-content">
		
			<!-- customer login page -->
		
			<div role="tabpanel" class="tab-pane active" id="login">
				<c:url value="j_spring_security_check" var="loginUrl" />
				<div class="login-page">
					<div class="form">
						<form class="login-form" action="${loginUrl}" method="POST" id="login-form">
							<input type="text" name="email" placeholder="email" id="login-email"  data-validate="required"/>
							<input type="password" name="passwd" placeholder="password" id="login-passwd"  data-validate="required"/>
							<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
							<button id="login-submit" type="submit">login</button>
						</form>
					</div>
					<div class="row" style="text-align:center;margin-top:10px;margin-bottom:10px;">
						<a role="button" href="index.jsp" class="btn btn-primary" style="text-align: center;">
							<span class="glyphicon glyphicon-home"></span> Home
						</a>
					</div>
				</div>
				
			</div>
			
			<!-- sign up page -->
			
			<div role="tabpanel" class="tab-pane" id="signup">
				<div class="signup-page">
					<spring:url value="customer/signup" var="signupUrl"/> 
					<div class="form">
						<form class="register-form" action="${signupUrl}" method="POST" id="signup-form">
							<input type="text" name="email" placeholder="email address" id="signup-email" data-validate="required"/> 
							<input type="password" name="passwd" placeholder="password" id="signup-passwd" data-validate="required"/>
							<input type="password" name="cpasswd" placeholder="confirm password" id="signup-cpasswd" data-validate="required"/>
							<input type="text" name="name" placeholder="First Name" data-validate="require"/>
							<input type="text" name="surname" placeholder="Last Name" data-validate="require"/>
							<select name="country">
								<option default>Select Your Country</option>
							</select>
							<input type="text" name="tel" placeholder="Telephone" data-validate="require"/>
							<input type="hidden" name="${_csrf.parameterName}"	value="${_csrf.token}" />
							<button id="signup-submit" type="submit">create</button>
						</form>
						<div id="error-signup"></div>
					</div>
				</div>
			</div>
			
		</div>

	</div>
	
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
    
<spring:url value="js/lib/jquery-2.1.3.min.js" var="jquery" />
<spring:url value="js/lib/sha1.min.js" var="sha1Js"/>
<spring:url value="js/lib/bootstrap.min.js" var="bootstrapJs" />
<spring:url value="js/lib/verify.notify.min.js" var="verifyJs"/>

<script type="text/javascript" src="${jquery}"></script>
<script type="text/javascript" src="${sha1Js}"></script>
<script type="text/javascript" src="${bootstrapJs}"></script>
<script type="text/javascript" src="${verifyJs}"></script>
<script type="text/javascript">
$(document).ready(function(){
	var uri	= '/Talalah/content/util/datasource/countries/document.json';
	$.get(uri,function(data){
		$.each(data,function(index, obj){
			var code = obj.numericCode;
			if(code!==null)
				var opt = '<option value="'+code+'">'+obj.name+'</option>';
				$('select[name=country]').append(opt);
		});
	});

	$('select[name=country]').on('change',function(e){
		var code = $('select[name=country]').val().trim();
		var uri	= '/Talalah/content/util/datasource/countries/document.json';
		$.get(uri,function(data){
			$.each(data,function(index, obj){
				var co = obj.numericCode;
				if(co == code){
					var callingCode = obj.callingCodes[0];
					$('input[name=tel]').val('+'+callingCode);
				}
					
			});
		});
	});
	/* password masked function */
	$('#login-passwd').blur(function(){
		var passwd = $('#login-passwd').val().trim();
		if(passwd!=''){
			var maskedPasswd = sha1(passwd);
			$('#login-passwd').val(maskedPasswd);
		}
	});

	/* signup password mask */
	$('#signup-passwd').blur(function(){
		var passwd = $('#signup-passwd').val().trim();
		if(passwd!=''){
			var maskedPasswd = sha1(passwd);
			$('#signup-passwd').val(maskedPasswd);
		}
	});

	$('#signup-cpasswd').blur(function(){
		var passwd = $('#signup-cpasswd').val().trim();
		if(passwd!=''){
			var maskedPasswd = sha1(passwd);
			$('#signup-cpasswd').val(maskedPasswd);
		}
	});
	
	/** click login function for form submit function*/
	
	$('#login-submit').click(function(e){
		e.preventDefault();
		var email = $('#login-email').val().trim();
		var passwd = $('#login-passwd').val().trim();
		if(email===''||passwd===''){
			return false;
		}
		$('#login-form').submit();
		
	});
	
	$('#signup-submit').click(function(e){
		e.preventDefault();
		$('#error-signup').empty();
		var email	= $('#signup-email').val().trim();
		var passwd 	= $('#signup-passwd').val().trim();
		var cpasswd = $('#signup-cpasswd').val().trim();
		var name	= $('input[name=name]').val().trim();
		var surname = $('input[name=surname]').val().trim();
		
		if(email===''||passwd===''||cpasswd===''){
			return false;
		}
		
		if(passwd!==cpasswd){
			var errorMsg = '<div class="alert alert-danger"><strong>Error!</strong> Password is no match.</div>';
			$('#error-signup').html(errorMsg);
			return false;
		}
		
		$('#signup-form').submit();
	});
	
});
</script>

</body>
</html>