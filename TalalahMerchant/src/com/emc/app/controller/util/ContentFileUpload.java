package com.emc.app.controller.util;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;

import org.apache.http.client.ClientProtocolException;
import org.springframework.web.multipart.MultipartFile;

public interface ContentFileUpload {
	public boolean imgFileUpload(String url, HashMap<String, String> hashMap, MultipartFile multipartFile)
			throws ClientProtocolException, IOException;
	public boolean imgFileUpload(String url, HashMap<String, String> hashMap, String type, File file)
			throws ClientProtocolException, IOException;
}
