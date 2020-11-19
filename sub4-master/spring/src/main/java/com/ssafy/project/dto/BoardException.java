package com.ssafy.project.dto;

public class BoardException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1019819380525374095L;

	public BoardException() {
		super("보드 처리 중 오류 발생");
	}

	public BoardException(String msg) {
		super(msg);
	}
}
