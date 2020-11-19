package com.ssafy.project.dto;

public class TagException extends RuntimeException {
	
	private static final long serialVersionUID = 8595084946183318939L;

	public TagException() {
		super("태그 처리 중 오류 발생");
	}

	public TagException(String msg) {
		super(msg);
	}
}
