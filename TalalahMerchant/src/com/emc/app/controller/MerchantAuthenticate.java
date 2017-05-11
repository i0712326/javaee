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

import com.emc.app.entity.merchant.Merchant;
import com.emc.app.entity.user.Role;

@Component("customerAuthenticate")
public class MerchantAuthenticate implements AuthenticationProvider {
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
		String uri = rootUrl+"/merchant/authen?email={email}&passwd={passwd}";
		String email = authen.getName().trim();
		String passwd = authen.getCredentials().toString().trim();
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("email", email);
		params.put("passwd", passwd);
		ResponseEntity<Merchant> resp = restTemplate.postForEntity(uri, null, Merchant.class, params);
		Merchant merchant = resp.getBody();
		Role role = merchant.getRole();
		boolean check = resp.getStatusCode().equals(HttpStatus.OK);
		check = check && role.getId()==3;
		if(check){
			List<GrantedAuthority> grantedAuths = new ArrayList<>();
			grantedAuths.add(new SimpleGrantedAuthority(merchant.getRole().getRoleId()));
			return new UsernamePasswordAuthenticationToken(merchant.getMcId(), authen.getCredentials(),grantedAuths);
		}
		return null;
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}
}
