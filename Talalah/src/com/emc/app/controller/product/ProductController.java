package com.emc.app.controller.product;

import java.io.IOException;
import java.sql.Date;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.emc.app.entity.product.Product;

public interface ProductController {
	

	public ResponseEntity<Product> addTravel(String id, String name, float price, String shDes,
			String loDes, String img, int review, int rate, String url, String available,
			String mcId, String prdCatId, MultipartFile defaultImg,
			MultipartFile[] relatedImgs, String food, Date start, Date end,
			String transport, int days, String accom, String pickUp, int adult,
			int child, String guide, String destId, String[] activities)
			throws IOException;
	
	public ResponseEntity<Product> updateTravel(String id, String name, float price, String shDes,
			String loDes, String img, int review, int rate, String url, String available,
			String mcId, String prdCatId, MultipartFile defaultImg,
			MultipartFile[] relatedImgs, String food, Date start, Date end,
			String transport, int days, String accom, String pickUp, int adult,
			int child, String guide, String destId, String[] activities)
			throws IOException;
	
	public ResponseEntity<Product> addItem( String id, String name, float price, String shDes,
			String loDes, String img, int review, int rate, String url, 
			String mcId, String prdCatId, MultipartFile defaultImg,
			MultipartFile[] relatedImgs, int stock, String size, String length,
			String width, String height, String color, String[] providers, float[] prices, int[] min, int[] max) throws IOException;
	
}
