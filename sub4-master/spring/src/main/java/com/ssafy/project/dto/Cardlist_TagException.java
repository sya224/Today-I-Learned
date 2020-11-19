package com.ssafy.project.dto;

public class Cardlist_TagException extends RuntimeException {

	private static final long serialVersionUID = -3067624518233220327L;

	public Cardlist_TagException() {
		super("카드 태그 처리 중 오류 발생");
	}

	public Cardlist_TagException(String msg) {
		super(msg);
	}
}
