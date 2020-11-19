package com.ssafy.project.dto;

public class FollowException extends RuntimeException {
	
	private static final long serialVersionUID = -3142142448341181786L;

	public FollowException() {
		super("팔로우 처리 중 오류 발생");
	}

	public FollowException(String msg) {
		super(msg);
	}
}
