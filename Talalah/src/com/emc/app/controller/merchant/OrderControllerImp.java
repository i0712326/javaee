package com.emc.app.controller.merchant;

import java.io.File;
import java.io.IOException;

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
import org.springframework.web.multipart.MultipartFile;

import com.emc.app.entity.Entity;

@Controller("orderController")
@RequestMapping("/merchant/order")
public class OrderControllerImp implements OrderController {
	private Logger logger = Logger.getLogger(getClass());
	@Autowired private ServletContext servletContext;
	@RequestMapping(value="/item/update",method=RequestMethod.POST)
	@ResponseBody @Override
	public ResponseEntity<Entity> updateOrderItem(@RequestParam("mcc") String mcc, @RequestParam("mcId") String mcId, @RequestParam("id")  String id,
			@RequestParam("fileName") String fileName, @RequestParam("file") MultipartFile multipartFile) {
		String contentPath = servletContext.getRealPath("/content");
		File filePath01 = new File(contentPath +"/"+mcc);
		if(!filePath01.exists()) filePath01.mkdir();
		File filePath02 = new File(contentPath +"/"+mcc+"/"+mcId);
		if(!filePath02.exists()) filePath02.mkdir();
		File filePath03 = new File(contentPath +"/"+mcc+"/"+mcId+"/"+id);
		if(!filePath03.exists()) filePath03.mkdir();
		String filePath = contentPath +"/"+mcc+"/"+mcId+"/"+id+"/"+fileName;
		File file = new File(filePath);
		try {
			byte[] bytes = multipartFile.getBytes();
			FileUtils.writeByteArrayToFile(file, bytes);
			return new ResponseEntity<Entity>(new Entity("200","OK"), HttpStatus.OK);
		} catch (IOException e) {
			logger.debug("Exception occure while try to write merchant image file to system", e);
			return new ResponseEntity<Entity>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
