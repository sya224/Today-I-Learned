package com.ssafy.project.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class Cardlist implements Serializable {
	private static final long serialVersionUID = -1744318816011216745L;
	
	private int cardlist_id; // 보드와 1:N 매칭이고 auto_increment 입니다. 생성자에서 사용하지 않습니다
	
	private int board_id; // fk
	
	private String cardlist_name; // 카드 리스트 전체의 주제가 될 이름입니다
	
	private String cardlist_cards; // 카드리스트 내부 카드들을 [] json 형식으로 보관한 것입니다
	
	private boolean cardlist_secret; // 비밀글 여부
	
	private int cardlist_heart; // 좋아요 받은 수
	
	private String cardlist_color; // 카드리스트 색상 
	
}
