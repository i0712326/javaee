package com.emc.app.controller.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.emc.app.entity.merchant.Merchant;

public interface MerchantController {
	public ResponseEntity<Merchant> addMerchant(
			String id, String mcc,
			MultipartFile file, 
			String name, 
			String url, 
			String country,
			String city, 
			String postal, 
			String addr1, 
			String addr2,
			String addr3, 
			String tel, 
			String email, 
			String fax
	);
	
	public ResponseEntity<Merchant> updateMerchant(
			String id, String mcc,
			MultipartFile file, 
			String name, 
			String url,
			int addrId,
			String country,
			String city, 
			String postal, 
			String addr1, 
			String addr2,
			String addr3, 
			String tel, 
			String email, 
			String fax
	);
	
}
