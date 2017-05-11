package com.emc.app.controller.merchant;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.emc.app.entity.Entity;
import com.emc.app.entity.product.ProductImg;
import com.emc.app.entity.product.item.Item;
import com.emc.app.entity.product.travel.Travel;

public interface ProductController {
	public ResponseEntity<Entity> uploadImg(String mcc, String mcId, String id, MultipartFile multipartFile); 
	public ResponseEntity<ProductImg> uploadRelateImg(String mcc, String mcId, String id, MultipartFile multipartFile);
	public ResponseEntity<Entity> removeRelateImg(String id);
	public ResponseEntity<Entity> addItem(Item item) throws IOException;
	public ResponseEntity<Entity> addTravel(Travel travel) throws IOException;
}
