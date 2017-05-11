package com.emc.app.controller.merchant;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.emc.app.entity.merchant.Merchant;

public interface MerchantProfileController {
	public ResponseEntity<Merchant> uploadImg(String mcId, MultipartFile multipartFile);
}
