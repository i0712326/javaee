package com.emc.app.controller.product;

import java.io.File;
import java.io.IOException;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.emc.app.entity.merchant.Merchant;
import com.emc.app.entity.product.Product;
import com.emc.app.entity.product.ProductCategory;
import com.emc.app.entity.product.ProductImg;
import com.emc.app.entity.product.item.Item;
import com.emc.app.entity.product.item.ItemShippingProvider;
import com.emc.app.entity.product.item.ItemShippingProviderId;
import com.emc.app.entity.product.item.ShippingProvider;
import com.emc.app.entity.product.travel.Activity;
import com.emc.app.entity.product.travel.Destination;
import com.emc.app.entity.product.travel.Travel;

@Controller("productController")
@RequestMapping("/product")
public class ProductControllerImp implements ProductController{
	private Logger logger = Logger.getLogger(getClass());
	@Autowired private ServletContext servletContext;
	@Autowired private RestTemplate restTemplate;
	public void setRestTemplate(RestTemplate restTemplate){
		this.restTemplate = restTemplate;
	}
	@RequestMapping(value="/addTravel", method=RequestMethod.POST)
	@ResponseBody @Override
	public ResponseEntity<Product> addTravel(
			@RequestParam("id") 			String id,
			@RequestParam("name") 			String name,
			@RequestParam("price")			float price,
			@RequestParam("shDes") 			String shDes,
			@RequestParam("lonDes") 		String loDes,
			@RequestParam("img") 			String img,
			@RequestParam(value="review", defaultValue="0") 		int review,
			@RequestParam(value="rate", defaultValue="0") 			int rate,
			@RequestParam(value="url", required=false) 			String url,
			@RequestParam(value="available",  required=false)		String available,
			@RequestParam("mcId") 			String mcId,
			@RequestParam("prdCatId") 		String prdCatId,
			@RequestParam(value="default",required=false) 		MultipartFile defaultImg,
			@RequestParam(value="relatedImgs", required=false) 	MultipartFile[] relatedImgs,
			@RequestParam("food") 			String food,
			@RequestParam("start") 			Date start,
			@RequestParam("end") 			Date end,
			@RequestParam("transport") 		String transport,
			@RequestParam("days") 			int days,
			@RequestParam("accom") 			String accom,
			@RequestParam("pickUp") 		String pickUp,
			@RequestParam("adult") 			int adult,
			@RequestParam("child") 			int child,
			@RequestParam("guide") 			String guide,
			@RequestParam("destId") 		String destId,
			@RequestParam(value="activities", required=false) String[] activities
			) throws IOException{
		String urlRoot = servletContext.getInitParameter("com.talalah.web.service.engine").trim();
		String contentPath = servletContext.getRealPath("/content");
		Travel travel = new Travel();
		travel.setId(id);
		travel.setName(name);
		travel.setShDes(shDes);
		travel.setLoDes(loDes);
		travel.setImg(img);
		travel.setReview(review);
		travel.setUrl(url);
		
		travel.setFood(food);
		travel.setStart(start);
		travel.setEnd(end);
		travel.setTransport(transport);
		travel.setEnd(end);
		travel.setTransport(transport);
		travel.setDays(days);
		travel.setAccom(accom);
		travel.setPickUp(pickUp);
		travel.setAdult(adult);
		travel.setChild(child);
		travel.setGuide(guide);
		
		String prdCatUrl 	= urlRoot+"/productCategory/get/{prdCatId}";
		String destUrl	 	= urlRoot+"/destination/get/{destId}";
		String merchantUrl 	= urlRoot+"/merchant/get/{mcId}";
		String actUrl		= urlRoot+"/activity/get/{id}";
		String prdUrl		= urlRoot+"/travel/save";
		String prdImgUrl	= urlRoot+"/productImg/save";
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("prdCatId",prdCatId);
		params.put("destId", destId);
		params.put("mcId", mcId);
		
		ResponseEntity<ProductCategory> prdCategoryRes = restTemplate.getForEntity(prdCatUrl, ProductCategory.class, params);
		ResponseEntity<Destination> destinationRes = restTemplate.getForEntity(destUrl, Destination.class, params);
		ResponseEntity<Merchant> merchantRes = restTemplate.getForEntity(merchantUrl, Merchant.class, params);
		travel.setProductCategory(prdCategoryRes.getBody());
		
		Merchant merchant = merchantRes.getBody();
		travel.setMerchant(merchant);
		// add activities list
		List<Activity> list = new ArrayList<Activity>();
		for(int i=0;i<activities.length;i++){
			String act = activities[i];
			params.put("id", act);
			ResponseEntity<Activity> actsRes = restTemplate.getForEntity(actUrl, Activity.class, params);
			Activity activity = actsRes.getBody();
			list.add(activity);
		}
		travel.setActivities(list);
		
		// image files processing
		String fileName = defaultImg.getOriginalFilename();
		String extension = "";
		int index = fileName.lastIndexOf('.');
		if (index > 0) {
		    extension = fileName.substring(index+1);
		}
		String orgName = "default."+extension;
		travel.setImg(orgName);
		defaultImageFileProcessing(orgName, contentPath, merchant, travel, defaultImg);
		
		List<String> imgFileNames = relatedImageFileProcessing(contentPath, merchant, travel, relatedImgs);
		for(String imgName : imgFileNames){
			ProductImg productImg = new ProductImg();
			productImg.setPicName(imgName);
			productImg.setProduct(travel);
			restTemplate.postForEntity(prdImgUrl, productImg, ProductImg.class);
		}
		
		// save product and its images
		ResponseEntity<Product> prdResponse = restTemplate.postForEntity(prdUrl, travel, Product.class);
		return new ResponseEntity<Product>(prdResponse.getBody(), HttpStatus.OK);
	}
	
	@RequestMapping(value="/addItem", method=RequestMethod.POST)
	@ResponseBody @Override
	public ResponseEntity<Product> addItem(
			@RequestParam("id") 		String id,
			@RequestParam("name") 		String name,
			@RequestParam("price")		float price,
			@RequestParam("shDes") 		String shDes,
			@RequestParam("loDes") 		String loDes,
			@RequestParam("img") 		String img,
			@RequestParam(value="review", defaultValue="0")		int review,
			@RequestParam(value="rate", defaultValue="0") 		int rate,
			@RequestParam(value="url", required=false) 		String url,
			@RequestParam("mcId") 		String mcId,
			@RequestParam("prdCatId")	String prdCatId,
			@RequestParam("default")		MultipartFile defaultImg,
			@RequestParam("relatedImgs") 	MultipartFile[] relatedImgs,
			@RequestParam("stock") 		int stock,
			@RequestParam("size") 		String size,
			@RequestParam("length") 	String length,
			@RequestParam("width") 		String width,
			@RequestParam("height") 	String height,
			@RequestParam("color") 		String color,
			@RequestParam(value="providers", required=false) 	String[] shippingProviders,
			@RequestParam(value="prices", required=false) 	float[] shippingPrices,
			@RequestParam(value="mins", required=false) 	int[] mins,
			@RequestParam(value="maxs", required=false) 	int[] maxs
			) throws IOException{
		String urlRoot = servletContext.getInitParameter("com.talalah.web.service.engine").trim();
		String contentPath = servletContext.getRealPath("/content");
		Item item = new Item();
		item.setId(id);
		item.setName(name);
		item.setShDes(shDes);
		item.setLoDes(loDes);
		item.setImg(img);
		item.setReview(review);
		
		item.setUrl(url);
		item.setStock(stock);
		item.setSize(size);
		item.setLenght(length);
		item.setWidth(width);
		item.setHeight(height);
		item.setColor(color);
		
		String prdCatUrl 	= urlRoot+"/productCategory/get/{prdCatId}";
		String merchantUrl 	= urlRoot+"/merchant/get/{mcId}";
		String shppvdUrl	= urlRoot+"/shippingProvider/{id}";
		String iShpPvdUrl	= urlRoot+"/itemShippingProvider/save";
		String prdUrl		= urlRoot+"/item/save";
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("prdCatId",prdCatId);
		params.put("mcId", mcId);
		
		ResponseEntity<ProductCategory> prdCategoryRes = restTemplate.getForEntity(prdCatUrl, ProductCategory.class, params);
		ResponseEntity<Merchant> merchantRes = restTemplate.getForEntity(merchantUrl, Merchant.class, params);
		item.setProductCategory(prdCategoryRes.getBody());
		Merchant merchant = merchantRes.getBody();
		item.setMerchant(merchant);
		
		contentPath = merchantRes.getBody().getMerchantCode().getMcc()+"/"+merchantRes.getBody().getMcId()+"/"+id;
		// image files processing
		String orgName = defaultImg.getOriginalFilename();
		defaultImageFileProcessing(orgName, contentPath, merchant, item, defaultImg);
		relatedImageFileProcessing(contentPath,  merchant, item, relatedImgs);
		
		// save product and its images
		restTemplate.postForEntity(prdUrl, item, Product.class);
		List<ItemShippingProvider> itemShippingProviders = new ArrayList<ItemShippingProvider>();
		if (shippingProviders != null) {
			for (int i = 0; i < shippingProviders.length; i++) {
				String shppvdId = shippingProviders[i];
				params.put("id", shppvdId);
				ResponseEntity<ShippingProvider> shppvdRes = restTemplate
						.getForEntity(shppvdUrl, ShippingProvider.class, params);
				ShippingProvider shippingProvider = shppvdRes.getBody();
				ItemShippingProviderId itemShippingProviderId = new ItemShippingProviderId(
						item, shippingProvider);
				ItemShippingProvider itemShippingProvider = new ItemShippingProvider(
						itemShippingProviderId, shippingPrices[i], mins[i],
						maxs[i]);
				restTemplate.postForEntity(iShpPvdUrl, itemShippingProvider,
						ItemShippingProvider.class);
				itemShippingProviders.add(itemShippingProvider);
			}
		}
		return new ResponseEntity<Product>(item, HttpStatus.OK);
	}
	
	@RequestMapping(value="/updateTravel", method=RequestMethod.POST)
	@ResponseBody @Override
	public ResponseEntity<Product> updateTravel(
			@RequestParam("id") 			String id,
			@RequestParam("name") 			String name,
			@RequestParam("price")			float price,
			@RequestParam("shDes") 			String shDes,
			@RequestParam("lonDes") 		String loDes,
			@RequestParam("img") 			String img,
			@RequestParam(value="review", defaultValue="0") 		int review,
			@RequestParam(value="rate", defaultValue="0") 			int rate,
			@RequestParam(value="url", required=false) 			String url,
			@RequestParam(value="available",  required=false)		String available,
			@RequestParam("mcId") 			String mcId,
			@RequestParam("prdCatId") 		String prdCatId,
			@RequestParam(value="default",required=false) 		MultipartFile defaultImg,
			@RequestParam(value="relatedImgs", required=false) 	MultipartFile[] relatedImgs,
			@RequestParam("food") 			String food,
			@RequestParam("start") 			Date start,
			@RequestParam("end") 			Date end,
			@RequestParam("transport") 		String transport,
			@RequestParam("days") 			int days,
			@RequestParam("accom") 			String accom,
			@RequestParam("pickUp") 		String pickUp,
			@RequestParam("adult") 			int adult,
			@RequestParam("child") 			int child,
			@RequestParam("guide") 			String guide,
			@RequestParam("destId") 		String destId,
			@RequestParam(value="activities", required=false) String[] activities
			)throws IOException {
		//String urlRoot = servletContext.getInitParameter("com.talalah.web.service.engine").trim();
		//String contentPath = servletContext.getRealPath("/content");
		Travel travel = new Travel();
		travel.setId(id);
		travel.setName(name);
		travel.setShDes(shDes);
		travel.setLoDes(loDes);
		travel.setImg(img);
		travel.setReview(review);
		travel.setUrl(url);
		
		travel.setFood(food);
		travel.setStart(start);
		travel.setEnd(end);
		travel.setTransport(transport);
		travel.setEnd(end);
		travel.setTransport(transport);
		travel.setDays(days);
		travel.setAccom(accom);
		travel.setPickUp(pickUp);
		travel.setAdult(adult);
		travel.setChild(child);
		travel.setGuide(guide);
		return new ResponseEntity<Product>(travel, HttpStatus.OK);
	}
	
	
	private void defaultImageFileProcessing(String name, String contentPath, Merchant merchant, Product product, MultipartFile multipartFile) throws IOException{
		try {
			String mcc = merchant.getMerchantCode().getMcc();
			String mcId = merchant.getMcId();
			String prdId = product.getId();
			File filePath01 = new File(contentPath +"/"+mcc);
			if(!filePath01.exists()) filePath01.mkdir();
			File filePath02 = new File(contentPath +"/"+mcc+"/"+mcId);
			if(!filePath02.exists()) filePath02.mkdir();
			File filePath03 = new File(contentPath +"/"+mcc+"/"+mcId+"/"+prdId);
			if(!filePath03.exists()) filePath03.mkdir();
			String filePath = contentPath +"/"+mcc+"/"+mcId+"/"+prdId+"/"+name;
			File file = new File(filePath);
			byte[] bytes;
			bytes = multipartFile.getBytes();
			FileUtils.writeByteArrayToFile(file, bytes);
		} catch (IOException e) {
			logger.debug("Exception occure while try to write merchant image file to system", e);
		}
	}
	
	private List<String> relatedImageFileProcessing(String contentPath, Merchant merchant, Product product, MultipartFile[] multipartFiles) throws IOException{
		List<String> list = new ArrayList<String>();
		for(int i=0;i<multipartFiles.length;i++){
			String fileName = multipartFiles[i].getOriginalFilename();
			String extension = "";
			int index = fileName.lastIndexOf('.');
			if (index > 0) {
			    extension = fileName.substring(index+1);
			}
			String number = String.format("%03d", i);
			String name = number+"_"+product.getId()+"."+extension;
			defaultImageFileProcessing(name, contentPath, merchant, product, multipartFiles[i]);
			list.add(name);
		}
		return list;
	}
}
