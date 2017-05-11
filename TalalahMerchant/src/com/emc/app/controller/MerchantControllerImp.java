package com.emc.app.controller;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;

import com.emc.app.entity.merchant.Merchant;

@Controller("merchantController")
public class MerchantControllerImp implements MerchantController {
	@Autowired private RestTemplate restTemplate;
	@Autowired private ServletContext servletContext;
	@RequestMapping(value="/auth/merchant/merchant.html",method=RequestMethod.GET)
	@Override
	public ModelAndView merchantPage() {
		String urlRoot = servletContext.getInitParameter("com.talalah.web.service.engine").trim();
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    String id = auth.getName();
	    String url = urlRoot+"/merchant/get/"+id;
	    ResponseEntity<Merchant> resp = restTemplate.getForEntity(url, Merchant.class);
	    Merchant merchant = resp.getBody();
		return new ModelAndView("/jsp/merchant/merchant.jsp","merchant",merchant);
	}

}
