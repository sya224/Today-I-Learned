package com.ssafy.project.dto;

public class AlarmException extends RuntimeException {
	
	private static final long serialVersionUID = 8888951403747917933L;

	public AlarmException() {
		super("알람 처리 중 오류 발생");
	}

	public AlarmException(String msg) {
		super(msg);
	}
}
