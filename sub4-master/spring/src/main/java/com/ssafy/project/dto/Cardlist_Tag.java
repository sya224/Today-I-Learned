package com.ssafy.project.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class Cardlist_Tag implements Serializable {
	
	private static final long serialVersionUID = -8434972316659287062L;
	
	private int cardlist_tag_id; //  N:M 관계입니다 auto increment 속성입니다
	
	private int cardlist_id; // 리스트와 1:N 매칭입니다
	
	private int tag_id; // 태그와 1:1 매칭입니다


}
