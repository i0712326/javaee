package com.emc.app.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;

import com.emc.app.entity.customer.Cart;
import com.emc.app.entity.customer.Customer;
import com.emc.app.entity.shipping.Address;
import com.emc.app.entity.user.Role;

@Controller("customerAuthController")
public class CustomerAuthControllerImp implements CustomerAuthController{
	private Logger logger = Logger.getLogger(getClass());
	@Autowired private ServletContext servletContext;
	@Autowired private RestTemplate restTemplate;
	@Autowired private AuthenticationManager authenticationManager;
	@RequestMapping(value ={"/auth/home.html","customer/auth/home.html"}, method = {RequestMethod.GET,RequestMethod.POST})
	@Override
	public ModelAndView homePage() {
		String urlRoot = servletContext.getInitParameter("com.talalah.web.service.engine").trim();
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    String id = auth.getName();
	    String url = urlRoot+"/customer/get/"+id;
	    ResponseEntity<Customer> resp = restTemplate.getForEntity(url, Customer.class);
	    Customer customer = resp.getBody();
		ModelAndView modelAndView = new ModelAndView("/authen/home.jsp","customer",customer);
		return modelAndView;
	}
	@RequestMapping(value="/customer/signup",method=RequestMethod.POST)
	@Override
	public ModelAndView register(HttpServletRequest request, @RequestParam("email") String email,
			@RequestParam("passwd") String passwd,
			@RequestParam("name") String name,
			@RequestParam("surname") String surname,
			@RequestParam("country") String country,
			@RequestParam("tel") String tel) {
		String rootUrl = servletContext.getInitParameter("com.talalah.web.service.engine").trim();
		String contentPath = servletContext.getRealPath("/content");
		String url = rootUrl+"/customer/signup?passwd={passwd}";
		String success="auth/home.html";
		String error = "index.jsp?error";
		ModelAndView modelAndView = new ModelAndView();
		Address address = new Address();
		Customer customer = new Customer();
		address.setCountry(country);
		address.setTel(tel);
		customer.setEmail(email);
		customer.setPasswd(passwd);
		customer.setUsrname(name);
		customer.setSurname(surname);
		customer.setAddress(address);
		customer.setImg("default.png");
		customer.setRole(new Role(1));
		customer.setCart(new Cart());
		customer.setStatus("A");
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("passwd", passwd);
		ResponseEntity<Customer> response = restTemplate.postForEntity(url, customer, Customer.class, params);
		HttpStatus status = response.getStatusCode();
		customer = response.getBody();
		long id			= customer.getId();
		String path			= contentPath+"/util/img/default.png";
		String destPath		= contentPath+"/user/customer/"+id;
		File destPathDir = new File(destPath);
		if(!destPathDir.exists()) destPathDir.mkdir();
		File srcFile = new File(path);
		File destFile = new File(destPath+"/default.png");
		try {
			FileUtils.copyFile(srcFile, destFile);
		} catch (IOException e) {
			logger.debug("Exception occured while try to copy image file",e);
		}
		
		if(status.equals(HttpStatus.CREATED)){
			UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(customer.getEmail(), passwd);
	        token.setDetails(new WebAuthenticationDetails(request));
	        SecurityContextHolder.getContext().getAuthentication();
	        Authentication authentication = authenticationManager.authenticate(token);
	        SecurityContextHolder.getContext().setAuthentication(authentication);
	        modelAndView.addObject("customer", customer);
	        modelAndView.setViewName(success);
		}
		else{
			modelAndView.setViewName(error);
		}
		return modelAndView;
	}
}
