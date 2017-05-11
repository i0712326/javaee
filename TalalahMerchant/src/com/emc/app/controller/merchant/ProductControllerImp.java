package com.emc.app.controller.merchant;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.apache.commons.io.FileUtils;
import org.apache.http.client.ClientProtocolException;
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

import com.emc.app.controller.admin.MimeTypes;
import com.emc.app.controller.util.ContentFileUpload;
import com.emc.app.entity.Entity;
import com.emc.app.entity.product.Product;
import com.emc.app.entity.product.ProductImg;
import com.emc.app.entity.product.item.Item;
import com.emc.app.entity.product.item.ItemImgs;
import com.emc.app.entity.product.travel.Travel;

@Controller("merchantProductController")
@RequestMapping("/merchant/product")
public class ProductControllerImp implements ProductController {
	private Logger logger = Logger.getLogger(getClass());
	
	@Autowired private ServletContext servletContext;
	@Autowired private RestTemplate restTemplate;
	@Autowired private ContentFileUpload contentFileUpload;
	
	@RequestMapping(value="/upload/img",method=RequestMethod.POST)
	@ResponseBody @Override
	public ResponseEntity<Entity> uploadImg(@RequestParam("mcc") String mcc, @RequestParam("mcId") String mcId, @RequestParam("id") String id, @RequestParam("file") MultipartFile multipartFile) {
		
		HashMap<String, String> hashMap = new HashMap<String,String>();
		hashMap.put("mcc", mcc);
		hashMap.put("mcId", mcId);
		hashMap.put("id", id);
		
		remotePrdImgUpload(hashMap, multipartFile);
		
		updatePrdImgName(id, multipartFile);
		
		Entity entity = new Entity("200","OK");
		return new ResponseEntity<Entity>(entity,HttpStatus.OK);
	}
	
	private void updatePrdImgName(String id, MultipartFile multipartFile){
		String rootUrl = servletContext.getInitParameter("com.talalah.web.service.engine").trim();
		String url = rootUrl+"/product/get/{id}";
		
		Map<String, Object> params = new HashMap<String,Object>();
		params.put("id", id);
		ResponseEntity<Product> resp = restTemplate.getForEntity(url, Product.class, params);
		Product product = resp.getBody();
		String contentType = multipartFile.getContentType();
		String ext = MimeTypes.getMimeTypeExt(contentType);
		String img = id+"."+ext;
		product.setImg(img);
		url = rootUrl+"/product/update/*";
		restTemplate.put(url, product);
	}
	
	private void remotePrdImgUpload(HashMap<String, String> hashMap, MultipartFile multipartFile){
		String url = servletContext.getInitParameter("com.talalah.web.content.product");
		try {
			contentFileUpload.imgFileUpload(url, hashMap, multipartFile);
		} catch (IOException e) {
			logger.debug("Exception occured while try to upload image to remote server",e);
		}
	}
	
	@RequestMapping(value = "/upload/relate/img", method = RequestMethod.POST)
	@ResponseBody
	@Override
	public ResponseEntity<ProductImg> uploadRelateImg(
			@RequestParam("mcc") String mcc, @RequestParam("mcId") String mcId,
			@RequestParam("id") String id, @RequestParam("file") MultipartFile multipartFile) {
			
			String contentType = multipartFile.getContentType();
			String ext = MimeTypes.getMimeTypeExt(contentType);
			
			SimpleDateFormat format = new SimpleDateFormat("yyMMddHHmmss");
			String formattedDate = format.format(new Date());
			String name = id+ "_" + formattedDate ;
			remoteUploadRelateImg(name, mcc, mcId, id, multipartFile);
			// get product data
			String urlRoot = servletContext.getInitParameter("com.talalah.web.service.engine").trim();
			String url = urlRoot+"/product/get/{id}";
			Map<String,Object> params = new HashMap<String,Object>();
			params.put("id", id);
			ResponseEntity<Product> resp = restTemplate.getForEntity(url, Product.class,params);
			Product product = resp.getBody();
			
			ProductImg prdImg = new ProductImg();
			prdImg.setPicName(name+ "."+ext);
			prdImg.setProduct(product);
			
			// persist related image of product
			url = urlRoot+"/productImg/save";
			restTemplate.postForEntity(url, prdImg, ProductImg.class);
			
			// retrieve data from 
			url = urlRoot+"/productImg/get/name?picName={picName}";
			params.clear();
			params.put("picName", prdImg.getPicName());
			
			ResponseEntity<ProductImg> res = restTemplate.getForEntity(url, ProductImg.class, params);
			prdImg = res.getBody();
			
			return new ResponseEntity<ProductImg>(prdImg, HttpStatus.OK);
		
	}
	
	private void remoteUploadRelateImg(String name, String mcc, String mcId, String id, MultipartFile multipartFile){
		String url = servletContext.getInitParameter("com.talalah.web.content.product.img").trim();
		
		try {
			HashMap<String,String> hashMap = new HashMap<String,String>();
			hashMap.put("mcc", mcc);
			hashMap.put("mcId", mcId);
			hashMap.put("prdId", id);
			hashMap.put("name",name);
			contentFileUpload.imgFileUpload(url, hashMap, multipartFile);
		} catch (IOException e) {
			logger.debug("Exception occured while try to upload file to content server",e);
		}
	}
	
	@RequestMapping("/delete/relate/img")
	@Override
	public ResponseEntity<Entity> removeRelateImg(@RequestParam("id") String id) {
		String urlRoot = servletContext.getInitParameter("com.talalah.web.service.engine").trim();
		String url = urlRoot+"/productImg/delete/{id}";
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("id", id);
		restTemplate.delete(url, params);
		Entity entity = new Entity("200","OK");
		return new ResponseEntity<Entity>(entity,HttpStatus.OK);
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
			File destFile = new File(filePath03+"/"+name);
			FileUtils.copyFile(file, destFile);
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
		
		uploadTravelDefaultImg(travel, path);
		
		String url = urlRoot+"/travel/save";
		ResponseEntity<Entity> resp = restTemplate.postForEntity(url, travel, Entity.class);
		
		Entity entity = resp.getBody();
		return new ResponseEntity<Entity>(entity,HttpStatus.OK);
	}

	private void uploadTravelDefaultImg(Travel travel, String path) throws ClientProtocolException, IOException {
		String mcc = travel.getMerchant().getMerchantCode().getMcc();
		String mcId =  travel.getMerchant().getMcId();
		String id = travel.getId();
		File file = new File(path);
		
		String urlContent = servletContext.getInitParameter("com.talalah.web.content.product").trim();
		String img = id + ".png";
		travel.setImg(img);
		String contentType = "image/png";
		HashMap<String,String> hashMap = new HashMap<String,String>();
		
		hashMap.put("mcc", mcc);
		hashMap.put("mcId", mcId);
		hashMap.put("id", id);
		
		contentFileUpload.imgFileUpload(urlContent, hashMap, contentType, file);
	}
	
}
