package com.emc.app.servlet;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.emc.app.entity.Entity;

public interface ContentManagement {
	public ResponseEntity<Entity> uploadPrdImg(String mcc, String mcId, String prdId, MultipartFile multipartFile);

	public ResponseEntity<Entity> uploadPrdRelImg(String name, String mcc, String mcId, String prdId, MultipartFile multipartFile);

	public ResponseEntity<Entity> uploadUsrImg(String usrId, MultipartFile multipartFile);

	public ResponseEntity<Entity> uploadMcImg(String mcc, String mcId, MultipartFile multipartFile);
		
}
