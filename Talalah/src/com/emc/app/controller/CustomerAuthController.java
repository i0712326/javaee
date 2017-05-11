package com.emc.app.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.servlet.ModelAndView;

public interface CustomerAuthController {
	public ModelAndView homePage();
	public ModelAndView register(HttpServletRequest request, String email, String passwd, String name, String surname, String country, String tel);
}
