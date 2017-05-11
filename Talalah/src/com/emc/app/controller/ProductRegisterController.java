package com.emc.app.controller;

import javax.servlet.ServletContext;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
@Controller
@RequestMapping(value="/auth/product")
public class ProductRegisterController {
	private ServletContext servletContext;
	public void setServletContext(ServletContext servletContext){
		this.servletContext = servletContext;
	}
	@RequestMapping(value="/register.html", method=RequestMethod.POST)
	public String register(@RequestParam("name") String name[], @RequestParam("file") MultipartFile[] file){
		String path = servletContext.getRealPath("/content");
		return "auth/product/productCatalog";
	}
}
