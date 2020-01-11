package com.biz.crud;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import model.User;

/**
 * Session Bean implementation class UserEjb
 */
@Stateless(mappedName = "userEjb")
@LocalBean
public class UserEjb implements UserEjbLocal {
	@PersistenceContext(name="enterprise-jpa-01")
	private EntityManager em;
    /**
     * Default constructor. 
     */
    public UserEjb() {
        super();
    }
    public void save(User user) {
    	em.persist(user);
    }
}
