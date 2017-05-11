package com.emc.app.controller.util;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component("contentFileUpload")
public class ContentFileUploadImp implements ContentFileUpload {
	@Override
	public boolean imgFileUpload(String url, HashMap<String,String> hashMap, MultipartFile multipartFile)
			throws ClientProtocolException, IOException {
		HttpPost request = new HttpPost(url);
		HttpClient client = HttpClientBuilder.create().build();
		
		String contentType = multipartFile.getContentType();
		byte[] bytes = multipartFile.getBytes();
		String fileName = multipartFile.getOriginalFilename();
		
		MultipartEntityBuilder builder = MultipartEntityBuilder.create();
		builder.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);
		
		builder.addBinaryBody("file", bytes, ContentType.create(contentType), fileName);
		
		for(Map.Entry<String, String> e : hashMap.entrySet()) {
			String key = e.getKey();
			String value = e.getValue();
			builder.addTextBody(key, value, ContentType.TEXT_PLAIN);
		}
		
		HttpEntity entity = builder.build();
		
		request.setEntity(entity);
		HttpResponse response = client.execute(request);
		int status = response.getStatusLine().getStatusCode();
		
		if(status == 200)
			return true;
		
		return false;
	}

	@Override
	public boolean imgFileUpload(String url, HashMap<String, String> hashMap, String contentType, File file)
			throws ClientProtocolException, IOException {
		HttpPost request = new HttpPost(url);
		HttpClient client = HttpClientBuilder.create().build();
		String fileName = file.getName();
		
		MultipartEntityBuilder builder = MultipartEntityBuilder.create();
		builder.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);
		builder.addBinaryBody("file", file, ContentType.create(contentType), fileName);
		
		for(Map.Entry<String, String> e : hashMap.entrySet()) {
			String key = e.getKey();
			String value = e.getValue();
			builder.addTextBody(key, value, ContentType.TEXT_PLAIN);
		}
		
		HttpEntity entity = builder.build();
		
		request.setEntity(entity);
		HttpResponse response = client.execute(request);
		int status = response.getStatusLine().getStatusCode();
		
		if(status == 200)
			return true;
		
		return false;
	}
	
	
}
