package com.ssafy.project.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class Tag implements Serializable {

	
	private static final long serialVersionUID = -5006745647015539101L;
	
	private int tag_id; // pk, ai 조회 조건 fk
	
	private String tag_name; //  카드에서 태그 입력시 태그 테이블에서 조회한 뒤 없다면 새로 생성

	
}
