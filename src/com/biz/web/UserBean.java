package com.biz.web;

import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import com.biz.crud.UserEjb;

import model.User;

@Named("userBean")
@RequestScoped
public class UserBean {
	private User user;
	@EJB
	private UserEjb userEjb;
	public UserBean() {
		user = new User();
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String save() {
		userEjb.save(user);
		return "save.xhtml";
	}
}
