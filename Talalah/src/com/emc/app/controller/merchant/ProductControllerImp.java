package com.emc.app.controller.merchant;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.emc.app.entity.Entity;
import com.emc.app.entity.product.ProductImg;
import com.emc.app.entity.product.item.Item;
import com.emc.app.entity.product.item.ItemImgs;
import com.emc.app.entity.product.travel.Travel;
import com.emc.app.entity.product.travel.TravelImgs;

@Controller("merchantProductController")
@RequestMapping("/merchant/product")
public class ProductControllerImp implements ProductController {
	private Logger logger = Logger.getLogger(getClass());
	@Autowired private ServletContext servletContext;
	@Autowired private RestTemplate restTemplate;
	
	
	@RequestMapping(value="/upload/img",method=RequestMethod.POST)
	@ResponseBody @Override
	public ResponseEntity<Entity> uploadImg(@RequestParam("mcc") String mcc, @RequestParam("mcId") String mcId, @RequestParam("id") String id, @RequestParam("file") MultipartFile multipartFile) {
		String contentPath = servletContext.getRealPath("/content");
		filePersistence(contentPath,mcc,mcId,id,multipartFile);
		Entity entity = new Entity("200","OK");
		return new ResponseEntity<Entity>(entity,HttpStatus.OK);
	}
	@RequestMapping(value="/upload/relate/img",method=RequestMethod.POST)
	@ResponseBody @Override
	public ResponseEntity<Entity> uploadRelateImg(@RequestParam("mcc") String mcc, @RequestParam("mcId") String mcId, @RequestParam("id")String id, @RequestParam("name")String name, @RequestParam("file") MultipartFile multipartFile) {
		String contentPath = servletContext.getRealPath("/content");
		try {
			File filePath01 = new File(contentPath +"/"+mcc);
			if(!filePath01.exists()) filePath01.mkdir();
			File filePath02 = new File(contentPath +"/"+mcc+"/"+mcId);
			if(!filePath02.exists()) filePath02.mkdir();
			File filePath03 = new File(contentPath +"/"+mcc+"/"+mcId+"/"+id);
			if(!filePath03.exists()) filePath03.mkdir();
			String filePath = contentPath +"/"+mcc+"/"+mcId+"/"+id+"/"+name;
			File file = new File(filePath);
			byte[] bytes = multipartFile.getBytes();
			FileUtils.writeByteArrayToFile(file, bytes);
			
			return new ResponseEntity<Entity>(HttpStatus.OK);
		} catch (IOException e) {
			logger.debug("Exception occure while try to write merchant image file to system", e);
			return new ResponseEntity<Entity>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	@RequestMapping(value="/add/item",method=RequestMethod.POST)
	@ResponseBody @Override
	public ResponseEntity<Entity> addItem(@RequestBody Item item) throws IOException {
		String urlRoot = servletContext.getInitParameter("com.talalah.web.service.engine").trim();
		String contentPath = servletContext.getRealPath("/content");
		item.setId(item.getpId());
		String path			= contentPath+"/util/img/default.png";
		String mcc = item.getMerchant().getMerchantCode().getMcc();
		String mcId =  item.getMerchant().getMcId();
		String id = item.getId();
		
		
		File filePath01 = new File(contentPath +"/"+mcc);
		if(!filePath01.exists()) filePath01.mkdir();
		File filePath02 = new File(contentPath +"/"+mcc+"/"+mcId);
		if(!filePath02.exists()) filePath02.mkdir();
		File filePath03 = new File(contentPath +"/"+mcc+"/"+mcId+"/"+id);
		if(!filePath03.exists()) filePath03.mkdir();
		File file = new File(path);
		File dFile = new File(filePath03+"/default.png");
		
		FileUtils.copyFile(file, dFile);
		
		String picName = "pic000";
		List<ProductImg> productImgs = new ArrayList<ProductImg>();
		ItemImgs itemImgs = new ItemImgs();
		itemImgs.setId(item.getId());
		for(int i=0;i<6;i++){
			int ind = i+1;
			String name = picName+ind+".png";
			/*
			File destFile = new File(filePath03+"/"+name);
			FileUtils.copyFile(file, destFile);
			*/
			ProductImg productImg = new ProductImg();
			productImg.setPicName(name);
			productImg.setProduct(item);
			productImgs.add(productImg);
		}
		itemImgs.setProductImgs(productImgs);
		
		String url = urlRoot+"/item/save";
		restTemplate.postForEntity(url, item, Entity.class);
		
		url = urlRoot+"/item/save/img";
		
		ResponseEntity<Entity> resp = restTemplate.postForEntity(url, itemImgs, Entity.class);
		Entity entity = resp.getBody();
		return new ResponseEntity<Entity>(entity,HttpStatus.OK);
	}
	
	@RequestMapping(value="/add/travel",method=RequestMethod.POST)
	@ResponseBody @Override
	public ResponseEntity<Entity> addTravel(@RequestBody Travel travel) throws IOException {
		String urlRoot = servletContext.getInitParameter("com.talalah.web.service.engine").trim();
		String contentPath = servletContext.getRealPath("/content");
		travel.setId(travel.getpId());
		String path			= contentPath+"/util/img/default.png";
		String mcc = travel.getMerchant().getMerchantCode().getMcc();
		String mcId =  travel.getMerchant().getMcId();
		String id = travel.getId();
		
		File file = new File(path);
		
		
		File filePath01 = new File(contentPath +"/"+mcc);
		if(!filePath01.exists()) filePath01.mkdir();
		File filePath02 = new File(contentPath +"/"+mcc+"/"+mcId);
		if(!filePath02.exists()) filePath02.mkdir();
		File filePath03 = new File(contentPath +"/"+mcc+"/"+mcId+"/"+id);
		if(!filePath03.exists()) filePath03.mkdir();
		File dFile = new File(filePath03+"/default.png");
		FileUtils.copyFile(file, dFile);
		
		
		String picName = "pic000";
		List<ProductImg> productImgs = new ArrayList<ProductImg>();
		TravelImgs travelImgs = new TravelImgs();
		travelImgs.setId(travel.getId());
		for(int i=0;i<6;i++){
			int ind = i+1;
			String name = picName+ind+".png";
			File destFile = new File(filePath03+"/"+name);
			FileUtils.copyFile(file, destFile);
			ProductImg productImg = new ProductImg();
			productImg.setPicName(name);
			productImg.setProduct(travel);
			productImgs.add(productImg);
		}
		travelImgs.setProductImgs(productImgs);
		String url = urlRoot+"/travel/save";
		restTemplate.postForEntity(url, travel, Entity.class);
		
		url = urlRoot+"/travel/save/img";
		
		ResponseEntity<Entity> resp = restTemplate.postForEntity(url, travelImgs, Entity.class);
		Entity entity = resp.getBody();
		return new ResponseEntity<Entity>(entity,HttpStatus.OK);
	}
	
	private void filePersistence(String contentPath, String mcc, String mcId, String id,MultipartFile multipartFile) {
		try {
			File filePath01 = new File(contentPath +"/"+mcc);
			if(!filePath01.exists()) filePath01.mkdir();
			File filePath02 = new File(contentPath +"/"+mcc+"/"+mcId);
			if(!filePath02.exists()) filePath02.mkdir();
			File filePath03 = new File(contentPath +"/"+mcc+"/"+mcId+"/"+id);
			if(!filePath03.exists()) filePath03.mkdir();
			String filePath = contentPath +"/"+mcc+"/"+mcId+"/"+id+"/default.png";
			File file = new File(filePath);
			byte[] bytes;
			bytes = multipartFile.getBytes();
			FileUtils.writeByteArrayToFile(file, bytes);
		} catch (IOException e) {
			logger.debug("Exception occure while try to write merchant image file to system", e);
		}
	}
}
