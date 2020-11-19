package com.ssafy.project.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class Card implements Serializable {
	
	private static final long serialVersionUID = -442908003210933313L;

	private int card_id; // 카드 리스트와 1:N 매칭이고 auto increment 속성입니다
	
	private int cardlist_id; // fk
	
	private String card_name; // 카드의 제목으로 소제목에 해당합니다
	
	private String card_contents; // 카드의 내용입니다. db가 longtext로 되어있습니다. 이미지를 encoding해서 저장합니다
	
	private boolean card_secret; // 카드의 개별 공개 여부입니다. 비공개일경우 true 입니다
		
	private String card_upload; // 첨부파일, 현재 미사용중	
}
