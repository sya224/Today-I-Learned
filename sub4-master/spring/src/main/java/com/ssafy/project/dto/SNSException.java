package com.ssafy.project.dto;

public class SNSException extends RuntimeException {
	
	private static final long serialVersionUID = 9072256218594806836L;

	public SNSException() {
		super("소셜 로그인 정보 처리 중 오류 발생");
	}

	public SNSException(String msg) {
		super(msg);
	}
}
