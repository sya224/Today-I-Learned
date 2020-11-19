package com.ssafy.project.dto;

public class CommentException extends RuntimeException {
	
	private static final long serialVersionUID = 6270360115126103023L;

	public CommentException() {
		super("댓글 처리 중 오류 발생");
	}

	public CommentException(String msg) {
		super(msg);
	}
}
