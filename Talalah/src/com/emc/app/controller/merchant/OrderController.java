package com.emc.app.controller.merchant;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.emc.app.entity.Entity;

public interface OrderController {
	public ResponseEntity<Entity> updateOrderItem(String mcc, String mcId, String id,String fileName, MultipartFile multipartFile);
}
