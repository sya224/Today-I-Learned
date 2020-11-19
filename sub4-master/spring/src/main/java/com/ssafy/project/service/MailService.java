package com.ssafy.project.service;


public interface MailService {
	public void sendAuth(String mem_id, String mem_email);

	public void postAuth(String mem_id, String mem_email, String authCode);

	public void findId(String mem_email);

	public void findPw(String mem_id, String mem_email);

	public void emailask(String mem_id, String ask_contents);

	public int countEmail(String mem_email);
}
