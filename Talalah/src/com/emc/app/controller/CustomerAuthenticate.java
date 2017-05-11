package com.emc.app.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.emc.app.entity.customer.Customer;

@Component("customerAuthenticate")
public class CustomerAuthenticate implements AuthenticationProvider {
	@Autowired private ServletContext servletContext;
	@Autowired private RestTemplate restTemplate;
	public void setRestTemplate(RestTemplate restTemplate){
		this.restTemplate = restTemplate;
	}
	public void setServletContext(ServletContext servletContext){
		this.servletContext = servletContext;
	}
	@Override
	public Authentication authenticate(Authentication authen)
			throws AuthenticationException {
		String rootUrl = servletContext.getInitParameter("com.talalah.web.service.engine").trim();
		String uri = rootUrl+"/customer/authen?email={email}&passwd={passwd}";
		String email = authen.getName().trim();
		String passwd = authen.getCredentials().toString().trim();
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("email", email);
		params.put("passwd", passwd);
		ResponseEntity<Customer> res= restTemplate.postForEntity(uri, null, Customer.class, params);
		Customer customer = res.getBody();
		if(res.getStatusCode().equals(HttpStatus.OK)){
			List<GrantedAuthority> grantedAuths = new ArrayList<>();
			grantedAuths.add(new SimpleGrantedAuthority(customer.getRole().getRoleId()));
			return new UsernamePasswordAuthenticationToken(customer.getId(), authen.getCredentials(),grantedAuths);
		}
		return null;
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}
}
