package com.emc.app.controller.merchant;

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

@Controller
@RequestMapping("/merchant")
public class MerchantProfileControllerImp implements MerchantProfileController {
	private Logger logger = Logger.getLogger(this.getClass());
	@Autowired private RestTemplate restTemplate;
	@Autowired private ServletContext servletContext;
	@RequestMapping(value="/upload/img", method=RequestMethod.POST)
	@ResponseBody @Override
	public ResponseEntity<Merchant> uploadImg(@RequestParam("mcId") String mcId,
			@RequestParam("file") MultipartFile multipartFile) {
		String path = servletContext.getRealPath("/content");
		String rootUrl = servletContext.getInitParameter("com.talalah.web.service.engine").trim();
		String uri = rootUrl + "/merchant/get/{mcId}";
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("mcId", mcId);
		ResponseEntity<Merchant> resp = restTemplate.getForEntity(uri, Merchant.class, params);
		Merchant merchant = resp.getBody();
		String mcc = merchant.getMerchantCode().getMcc();
		filePersistence(path,mcc,mcId,multipartFile);
		return new ResponseEntity<Merchant>(merchant,HttpStatus.OK);
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
