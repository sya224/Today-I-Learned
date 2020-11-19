package com.ssafy.project.dto;

public class MailException extends RuntimeException {
	
	private static final long serialVersionUID = -189788176423209086L;

	public MailException() {
		super("메일 처리 중 오류 발생");
	}

	public MailException(String msg) {
		super(msg);
	}
}
