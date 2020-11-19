package com.ssafy.project.dto;

public class CardException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = -3595103292519224343L;

	public CardException() {
		super("카드 처리 중 오류 발생");
	}

	public CardException(String msg) {
		super(msg);
	}
}
