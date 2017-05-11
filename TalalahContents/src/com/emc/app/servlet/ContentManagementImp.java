package com.emc.app.servlet;

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
import org.springframework.web.multipart.MultipartFile;

import com.emc.app.controller.admin.MimeTypes;
import com.emc.app.entity.Entity;


@Controller("fileUploadController")
@RequestMapping("/fileUploadService")
public class ContentManagementImp implements ContentManagement {
	private static Logger logger = Logger.getLogger(ContentManagementImp.class);
	@Autowired
	private ServletContext servletContext;

	@RequestMapping(value="/productImg", method=RequestMethod.POST)
	@Override
	public ResponseEntity<Entity> uploadPrdImg(
			@RequestParam("mcc") String mcc,
			@RequestParam("mcId") String mcId, @RequestParam("id") String prdId,
			@RequestParam("file") MultipartFile multipartFile) {
		String contentPath = servletContext.getRealPath("/content/merchant");
		try {
			File filePath01 = new File(contentPath +"/"+mcc);
			if(!filePath01.exists()) filePath01.mkdir();
			File filePath02 = new File(contentPath +"/"+mcc+"/"+mcId);
			if(!filePath02.exists()) filePath02.mkdir();
			File filePath03 = new File(contentPath +"/"+mcc+"/"+mcId+"/"+prdId);
			if(!filePath03.exists()) filePath03.mkdir();
			
			String contentType = multipartFile.getContentType();
			String ext = MimeTypes.getMimeTypeExt(contentType);
			String fname = prdId+"."+ext;
			
			String filePath = contentPath +"/"+mcc+"/"+mcId+"/"+prdId+"/"+fname;
			
			File file = new File(filePath);
			
			byte[] bytes = multipartFile.getBytes();
			
			FileUtils.writeByteArrayToFile(file, bytes);
			
			return new ResponseEntity<Entity>(HttpStatus.OK);
		} catch (IOException e) {
			logger.debug("Exception occure while try to write merchant image file to system", e);
			return new ResponseEntity<Entity>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value="/productRelateimg", method=RequestMethod.POST)
	@Override
	public ResponseEntity<Entity> uploadPrdRelImg(
			@RequestParam("name") String name, @RequestParam("mcc") String mcc, @RequestParam("mcId") String mcId, 
			@RequestParam("prdId") String prdId, @RequestParam("file") MultipartFile multipartFile) {
		String contentPath = servletContext.getRealPath("/content/merchant");
		try {
			
			String path01 = contentPath + "/" +mcc;
			File dirPath01 = new File(path01);
			if(!dirPath01.exists()) dirPath01.mkdir();
			String path02 =  path01 + "/" +mcId;
			File dirPath02 = new File(path02);
			if(!dirPath02.exists()) dirPath02.mkdir();
			String path03 = path02 + "/" +prdId;
			File dirPath03 = new File(path03);
			if(!dirPath03.exists()) dirPath03.mkdir();
			String path04 = path03 + "/" + prdId;
			File dirPath04 = new File(path04);
			if(!dirPath04.exists()) dirPath04.mkdir();
			
			String contentType = multipartFile.getContentType();
			String ext = MimeTypes.getMimeTypeExt(contentType);
			
			String fname = name+"."+ext;
			
			String filePath = dirPath04+"/"+fname;
			
			File file = new File(filePath);
			
			byte[] bytes = multipartFile.getBytes();
			
			FileUtils.writeByteArrayToFile(file, bytes);
			
			return new ResponseEntity<Entity>(HttpStatus.OK);
			
		} catch (IOException e) {
			logger.debug("Exception occure while try to write merchant image file to system", e);
			return new ResponseEntity<Entity>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	
	@RequestMapping(value="/userImg", method=RequestMethod.POST)
	@Override
	public ResponseEntity<Entity> uploadUsrImg(
			@RequestParam("usrId") String usrId,
			@RequestParam("file") MultipartFile multipartFile) {
		String contentPath = servletContext.getRealPath("/content");
		try {
			String dirPath = contentPath + "/user/" + usrId;
			File dir = new File(dirPath);
			if (!dir.exists())
				dir.mkdir();
			String type = multipartFile.getContentType();
			String ext = MimeTypes.getMimeTypeExt(type);
			String filePath = dirPath + "/" + usrId + "." + ext;
			File file = new File(filePath);

			byte[] bytes;
			bytes = multipartFile.getBytes();
			FileUtils.writeByteArrayToFile(file, bytes);
			
			// update image name in database
			String img = usrId+"."+ext;
			
			
			return new ResponseEntity<Entity>(HttpStatus.OK);
		} catch (IOException e) {
			logger.debug("Exception occured while try to write file to destination", e);
			return new ResponseEntity<Entity>(HttpStatus.EXPECTATION_FAILED);
		}			
		
	}

	@RequestMapping(value="/merchantImg", method=RequestMethod.POST)
	@Override
	public ResponseEntity<Entity> uploadMcImg(@RequestParam("mcc") String mcc, @RequestParam("mcId") String mcId,
			@RequestParam("file") MultipartFile multipartFile) {
		String contentPath = servletContext.getRealPath("/content");
		String path01 = contentPath+ "/merchant/" +mcc;
		File dirPath01 = new File(path01);
		if(!dirPath01.exists()) dirPath01.mkdir();
		String path02 = path01 + "/" + mcId;
		File dirPath02 = new File(path02);
		if (!dirPath02.exists()) dirPath02.mkdirs();
		String type = multipartFile.getContentType();
		String ext = MimeTypes.getMimeTypeExt(type);
		String fileName = path02 + "/" + mcId + "." + ext;
		File file = new File(fileName);
		byte[] bytes;
		try {
			bytes = multipartFile.getBytes();
			FileUtils.writeByteArrayToFile(file, bytes);
			return new ResponseEntity<Entity>(HttpStatus.OK);
		} catch (IOException e) {
			logger.debug("Exception occured while try to write file to destination",e);
			return new ResponseEntity<Entity>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}

}
