package com.ssafy.project.dto;

public class CardlistException extends RuntimeException {
	
	private static final long serialVersionUID = -8508166478790615560L;

	public CardlistException() {
		super("카드 리스트 처리 중 오류 발생");
	}

	public CardlistException(String msg) {
		super(msg);
	}
}
