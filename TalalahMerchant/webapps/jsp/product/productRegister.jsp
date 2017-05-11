<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<script type="text/javascript" src="/EmarketWeb/js/lib/jquery-2.1.3.min.js"></script>
<script type="text/javascript">
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#preview0').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#prdpic0").change(function () {
    readURL(this);
});

</script>
<style type="text/css">
<!--
.prdImgs{
	width:100%;
	height:200px;
}
.prdImg {
	width: 200px;
	float: left;
}
.prdDescript{
	display:block;
	width:900px;
}
-->
</style>
<title>Talalah</title>
</head>
<body>	
	<form name="product_form" action="register" method="POST" enctype="multipart/form-data">
		<div class="prdInfo">
			<p>
				<label for="mcId"><strong>MERCHANT ID :</strong></label>
				<input id="mcId" type="text" value="662314222333" name="mcId" size="10"/>
				<label for="prdType"><strong>PRODUCT TYPE :</strong></label>
				<input id="prdType" type="text" value='5691' name="prdType" size="10"/>
				<label for="prdId"><strong>PROID :</strong></label>
				<input id="prdId" type="text" value="000000000001" name="prdId" size="10"/>
			</p>
			<p>
				<label for="prdName"><strong>NAME :</strong></label>
				<input id="prdName" type="text" name="prdName" size="15"/>
				<label for="prdPrice"><strong>PRICE  :</strong></label>
				<input id="prdPrice" type="text" name="prdPrice" size="5"/> <strong>USD</strong>
				<label for="prdStock"><strong>STOCK :</strong></label>
				<input id="prdStock" type="text" name="prdStock" size="5"/>
			</p>
			<p>
				<label for="prdColor"><strong>COLOR :</strong></label>
				<input type="color" name="prdColor" id="prdColor"/>
				<label for="prdSize"><strong>SIZE :</strong></label>
				<select id="prdSize" name="prdSize">
					<optgroup label="SIZE">
						<option value="xs">XS</option>
						<option value="s">S</option>
						<option value="m">M</option>
						<option value="l">L</option>
						<option value="xl">XL</option>
					</optgroup>
				</select>
			</p>
		</div>
		 
		<h3>PRODUCT IMAGES :</h3>
		<div class="prdImg">
			<p>
				<strong>IMAGE</strong>
			</p>
			<p>
				<img id="preview0" src="http://placehold.it/100x100"
					alt="your image" width="90" height="100" />
			</p>
			<p>
				<input type="file" id="thumb" name="thumb" />
			</p>
		</div>
		<h3>RELATED IMAGES :</h3>
		<div class="prdImgs">
			<div class="prdImg">
				<p><strong>IMAGE</strong></p>
				<p><img id="preview0" src="http://placehold.it/100x100" alt="your image" width="90" height="100"/></p>
				<p><input type="file" id="prdpic0" name="prdpic0"/></p>
			</div>
			<div class="prdImg">
				<p><strong>IMAGE</strong></p>
				<p><img id="preview1" src="http://placehold.it/100x100" alt="your image" width="90" height="100"/></p>
				<p><input type="file" id="prdpic1" name="prdpic1"/></p>
			</div>
			<div class="prdImg">
				<p><strong>IMAGE</strong></p>
				<p><img id="preview2" src="http://placehold.it/100x100" alt="your image" width="90" height="100"/></p>
				<p><input type="file" id="prdpic2" name="prdpic2"/></p>
			</div>
			<div class="prdImg">
				<p><strong>IMAGE</strong></p>
				<p><img id="preview3" src="http://placehold.it/100x100" alt="your image" width="90" height="100"/></p>
				<p><input type="file" id="prdpic3" name="prdpic3"/></p>
			</div>
			<div class="prdImg">
				<p><strong>IMAGE</strong></p>
				<p><img id="preview4" src="http://placehold.it/100x100" alt="your image" width="90" height="100"/></p>
				<p><a href="#">Add More</a></p>
			</div>
		</div>
		
		<h3>PRODUCT DESCRIPTION</h3>
		<div class="prdDescript">
			<strong>SHORT DESCRIPTION :</strong>
			<p><textarea rows="4" cols="50" id="shrdes" name="shrdes"></textarea></p>
			<strong>LONG DESCRIPTION :</strong>
			<p><textarea rows="10" cols="50" id="lngdes" name="lngDes"></textarea></p>
		</div>
		<p><input type="submit" value="Submit"/></p>
	</form>
</body>
</html>