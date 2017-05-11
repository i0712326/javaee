package com.emc.app.controller.order;

import org.springframework.http.ResponseEntity;

import com.emc.app.entity.order.OrderTravel;

public interface OrderProductController {
	public ResponseEntity<OrderTravel> pressOrderTravel(int uId, int cpId);
	
}
