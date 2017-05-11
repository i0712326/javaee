package com.emc.app.controller.order;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.emc.app.entity.customer.CartTravel;
import com.emc.app.entity.customer.Customer;
import com.emc.app.entity.order.Order;
import com.emc.app.entity.order.OrderTravel;
import com.emc.app.entity.order.Payment;
import com.emc.app.entity.product.travel.Travel;

@Controller("orderProductController")
@RequestMapping("/order")
public class OrderProductControllerImp implements OrderProductController {
	@Autowired private ServletContext servletContext;
	@Autowired private RestTemplate restTemplate;
	@RequestMapping(value="/travel/save", method=RequestMethod.POST,produces="application/json")
	@ResponseBody @Override
	public ResponseEntity<OrderTravel> pressOrderTravel(@RequestParam("cId") int uId, @RequestParam("cpId") int cpId) {
		String rootUrl = servletContext.getInitParameter("com.talalah.web.service.engine").trim();
		
		String url = rootUrl + "/user/get/{id}";
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("id", uId);
		ResponseEntity<Customer> custResp = restTemplate.getForEntity(url, Customer.class, params);
		Customer customer = custResp.getBody();
		
		url = rootUrl+"/cartProduct/get/{id}";
		params.clear();
		params.put("id", cpId);
		ResponseEntity<CartTravel> cartTvlResp = restTemplate.getForEntity(url, CartTravel.class, params);
		CartTravel cartTravel = cartTvlResp.getBody();
		Travel travel = (Travel) cartTravel.getProduct();
		
		Order order = new Order();
		order.setCustomer(customer);
		order.setNum(cartTravel.getQty());
		order.setTotal(cartTravel.getPrice());
		order.setPayment(new Payment());
		
		OrderTravel orderTravel = new OrderTravel(order,travel);
		orderTravel.setAdult(cartTravel.getAdult());
		orderTravel.setChild(cartTravel.getChild());
		orderTravel.setStart(cartTravel.getStart());
		orderTravel.setEnd(cartTravel.getEnd());
		orderTravel.setDays(cartTravel.getDays());
		orderTravel.setNote(cartTravel.getNote());
		orderTravel.setQuantity(cartTravel.getQty());
		orderTravel.setPrice(cartTravel.getPrice());
		orderTravel.setType("com.emc.app.entity.order.OrderTravel");
		
		url = rootUrl+"/orderProduct/travel/save";
		ResponseEntity<OrderTravel> respOrdTvl = restTemplate.postForEntity(url, orderTravel, OrderTravel.class);
		
		url = rootUrl+"/cartProduct/travel/delete/{id}";
		params.clear();
		params.put("id", cpId);
		restTemplate.delete(url, params);
		
		return respOrdTvl;
	}
	
	

}
