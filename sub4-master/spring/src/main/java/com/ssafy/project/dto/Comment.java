package com.ssafy.project.dto;

import java.io.Serializable;

import lombok.Data;


@Data
public class Comment implements Serializable {

	private static final long serialVersionUID = -4838604711530045434L;
	
	private int comment_id; // pk, ai
	private String mem_id; // 코멘트를 쓴 사람
	private String mem_nick; // 반환에만 사용됨
	private String mem_thumb;
	private int cardlist_id; // 글 번호
	private String comment_time; // 코멘트가 쓰인 시간
	private String comment_contents; // 코멘트 내용
	private boolean comment_modified; // 수정 여부
	private String comment_modified_time; // 수정 여부
	private boolean comment_deleted; // 삭제 여부
	private boolean comment_secret; // 비밀 댓글 여부
	private int comment_reply; // 대댓글 번호
	
}
