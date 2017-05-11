package com.emc.app.controller.merchant;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;

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

import com.emc.app.controller.util.ContentFileUpload;
import com.emc.app.entity.merchant.Merchant;

@Controller
@RequestMapping("/merchant")
public class MerchantProfileControllerImp implements MerchantProfileController {
	private Logger logger = Logger.getLogger(this.getClass());
	@Autowired private RestTemplate restTemplate;
	@Autowired private ServletContext servletContext;
	@Autowired private ContentFileUpload fileUploadMerchant;
	@RequestMapping(value="/upload/img", method=RequestMethod.POST)
	@ResponseBody @Override
	public ResponseEntity<Merchant> uploadImg(@RequestParam("mcId") String mcId,
			@RequestParam("file") MultipartFile multipartFile) {
		String rootUrl = servletContext.getInitParameter("com.talalah.web.service.engine").trim();
		String uri = rootUrl + "/merchant/get/{mcId}";
		
		Map<String,Object> params = new HashMap<String,Object>();
		
		params.put("mcId", mcId);
		ResponseEntity<Merchant> resp = restTemplate.getForEntity(uri, Merchant.class, params);
		Merchant merchant = resp.getBody();
		String mcc = merchant.getMerchantCode().getMcc();
		
		remoteContentPersist(mcc,mcId,multipartFile);
		
		return new ResponseEntity<Merchant>(merchant,HttpStatus.OK);
	}
	
	private void remoteContentPersist(String mcc, String mcId, MultipartFile multipartFile){
		String url = servletContext.getInitParameter("com.talalah.web.content.merchant").trim();
		HashMap<String,String> hashMap = new HashMap<String,String>();
		hashMap.put("mcc", mcc);
		hashMap.put("mcId", mcId);
		try {
			fileUploadMerchant.imgFileUpload(url, hashMap, multipartFile);
		} catch (IOException e) {
			logger.debug("Exception occured while try to upload file to remote content server", e);
		}
	}

}
