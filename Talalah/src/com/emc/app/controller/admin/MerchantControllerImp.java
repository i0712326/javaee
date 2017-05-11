package com.emc.app.controller.admin;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
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
import com.emc.app.entity.merchant.MerchantCode;
import com.emc.app.entity.shipping.Address;
import com.emc.app.entity.shipping.District;

@Controller
@RequestMapping("/merchant")
public class MerchantControllerImp implements MerchantController {
	private Logger logger = Logger.getLogger(getClass());
	@Autowired private ServletContext servletContext;
	@Autowired private RestTemplate restTemplate;
	public void setRestTemplate(RestTemplate restTemplate){
		this.restTemplate = restTemplate;
	}
	@RequestMapping(value="/save",method=RequestMethod.POST)
	@ResponseBody @Override
	public ResponseEntity<Merchant> addMerchant(
			@RequestParam(value = "id") String id,
			@RequestParam(value = "mcc") String mcc,
			@RequestParam(value = "file") MultipartFile file,
			@RequestParam(value = "name") String name,
			@RequestParam(value = "url") String url,
			@RequestParam(value = "country") String country,
			@RequestParam(value = "pvId") String pvId,
			@RequestParam(value = "postal") String postal,
			@RequestParam(value = "addr1") String addr1,
			@RequestParam(value = "addr2") String addr2,
			@RequestParam(value = "addr3") String addr3,
			@RequestParam(value = "tel") String tel,
			@RequestParam(value = "email") String email,
			@RequestParam(value = "fax") String fax) {
		String path = servletContext.getRealPath("/content");
		String rootUrl = servletContext.getInitParameter("com.talalah.web.service.engine").trim();
		String uri = rootUrl + "/merchantCode/get/{mcc}";
		Merchant merchant = new Merchant();
		Address address = new Address();
		
		address.setCountry(country);
		address.setDistrict(new District(pvId));
		address.setPostal(postal);
		address.setAddress1(addr1);
		address.setAddress2(addr2);
		address.setAddress3(addr3);
		address.setTel(tel);
		address.setFax(fax);
		address.setEmail(email);
		
		merchant.setMcId(id);
		merchant.setName(name);
		merchant.setUrl(url);
		merchant.setLogo("default.png");
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("mcc", mcc);
		ResponseEntity<MerchantCode> response01 = restTemplate.getForEntity(uri,
				MerchantCode.class, params);
		MerchantCode merchantCode = response01.getBody();
		merchant.setMerchantCode(merchantCode);
		uri = rootUrl+"/address/save";
		ResponseEntity<Address> response02 = restTemplate.postForEntity(uri, address, Address.class);
		merchant.setAddress(response02.getBody());
		
		if(file!=null) filePersistence(path, mcc,id,file);
		
		uri = rootUrl + "/merchant/save";
		ResponseEntity<Merchant> response03 = restTemplate.postForEntity(uri, merchant, Merchant.class);
		return new ResponseEntity<Merchant>(response03.getBody(), HttpStatus.OK);
	}
	
	@RequestMapping(value="/update", method=RequestMethod.POST)
	@ResponseBody @Override
	public ResponseEntity<Merchant> updateMerchant(
			@RequestParam("id") String id, 
			@RequestParam("mcc") String mcc,
			@RequestParam(value="file", required=false) MultipartFile file, 
			@RequestParam("name") String name, 
			@RequestParam("url") String url, 
			@RequestParam("addrId") int addrId,
			@RequestParam(value="country",defaultValue="LAOS") String country,
			@RequestParam("pvId") String pvId, 
			@RequestParam("postal") String postal, 
			@RequestParam("addr1") String addr1, 
			@RequestParam("addr2") String addr2,
			@RequestParam("addr3") String addr3, 
			@RequestParam("tel") String tel, 
			@RequestParam("email") String email, 
			@RequestParam("fax") String fax) 
	{
		String path = servletContext.getRealPath("/content");
		String rootUrl = servletContext.getInitParameter("com.talalah.web.service.engine").trim();
		String uri = rootUrl + "/merchantCode/get/{mcc}";
		Merchant merchant = new Merchant();
		Address address = new Address();
		address.setAddrId(addrId);
		address.setCountry(country);
		address.setDistrict(new District(pvId));
		address.setPostal(postal);
		address.setAddress1(addr1);
		address.setAddress2(addr2);
		address.setAddress3(addr3);
		address.setTel(tel);
		address.setFax(fax);
		address.setEmail(email);
		
		merchant.setMcId(id);
		merchant.setName(name);
		merchant.setUrl(url);
		merchant.setLogo("default.png");
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("mcc", mcc);
		ResponseEntity<MerchantCode> response01 = restTemplate.getForEntity(uri,
				MerchantCode.class, params);
		MerchantCode merchantCode = response01.getBody();
		merchant.setMerchantCode(merchantCode);
		uri = rootUrl+"/address/update";
		restTemplate.put(uri, address);
		merchant.setAddress(address);
		
		if(file!=null) filePersistence(path, mcc,id,file);
		
		uri = rootUrl + "/merchant/update";
		restTemplate.put(uri, merchant);
		return new ResponseEntity<Merchant>(HttpStatus.OK);
	}
	
	private void filePersistence(String contentPath, String mcc, String id,MultipartFile multipartFile) {
		try {
			File filePath01 = new File(contentPath +"/"+mcc);
			if(!filePath01.exists()) filePath01.mkdir();
			File filePath02 = new File(contentPath +"/"+mcc+"/"+id);
			if(!filePath02.exists()) filePath02.mkdir();
			String filePath = contentPath +"/"+mcc+"/"+id+"/"+"default.png";
			File file = new File(filePath);
			byte[] bytes;
			bytes = multipartFile.getBytes();
			FileUtils.writeByteArrayToFile(file, bytes);
		} catch (IOException e) {
			logger.debug("Exception occure while try to write merchant image file to system", e);
		}
	}
}
