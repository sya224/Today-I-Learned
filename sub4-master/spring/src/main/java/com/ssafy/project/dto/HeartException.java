package com.ssafy.project.dto;

public class HeartException extends RuntimeException {
	
	private static final long serialVersionUID = 7237237742052825004L;

	public HeartException() {
		super("좋아요 처리 중 오류 발생");
	}

	public HeartException(String msg) {
		super(msg);
	}
}
