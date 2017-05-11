package com.emc.app.controller.customer;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.emc.app.controller.admin.MimeTypes;
import com.emc.app.controller.util.ContentFileUpload;
import com.emc.app.controller.util.ContentFileUploadImp;
import com.emc.app.entity.Entity;
import com.emc.app.entity.customer.Customer;
@Controller
@RequestMapping("/customer")
public class CustomerControllerImp implements CustomerController {
	@Autowired private ServletContext context;
	@Autowired private RestTemplate restTemplate;
	
	@RequestMapping(value="/upload/img",method=RequestMethod.POST)
	@ResponseBody @Override
	public ResponseEntity<Entity> upload(@RequestParam("id") String id, @RequestParam("file") MultipartFile multipartFile) throws IOException {
		String urlRoot = context.getInitParameter("com.talalah.web.service.engine").trim();
		
		// upload file to server
		uploadFile(id,multipartFile);
		// update database
		String url = urlRoot+"/customer/get/{id}";
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("id", id);
		ResponseEntity<Customer> custResp = restTemplate.getForEntity(url, Customer.class, params);
		Customer customer = custResp.getBody();
		
		String contentType = multipartFile.getContentType();
		String ext = MimeTypes.getMimeTypeExt(contentType);
		String fileName = id+"."+ext;
		customer.setImg(fileName);
		
		url = urlRoot+"/customer/update/"+id;
		restTemplate.put(url, customer);
		Entity entity =new Entity("200","OK");
		return new ResponseEntity<Entity>(entity,HttpStatus.OK);
	}
	
	@RequestMapping(value="/update/profile",method=RequestMethod.PUT, consumes="application/json")
	@ResponseBody @Override
	public ResponseEntity<Entity> updateProfile(@RequestBody Customer customer)
			throws IOException {
		String urlRoot = context.getInitParameter("com.talalah.web.service.engine").trim();
		return new ResponseEntity<Entity>(new Entity("200","OK"),HttpStatus.OK);
	}
	
	private void uploadFile(String id, MultipartFile multipartFile) throws IOException{
		ContentFileUpload contentFileUpload = new ContentFileUploadImp();
		String url = context.getInitParameter("com.talalah.web.content.customer.img").trim();
		HashMap<String,String> params = new HashMap<String,String>();
		params.put("id", id);
		contentFileUpload.imgFileUpload(url, params, multipartFile);
	}

}
