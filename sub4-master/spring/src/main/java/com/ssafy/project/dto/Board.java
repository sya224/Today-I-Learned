package com.ssafy.project.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class Board implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 3032753027843591018L;
	
	private int board_id;
	
	private String mem_id;

	private String board_date; // date, 일 단위까지만 표시
	
	private String board_lists; // [] 형태, list_id를 string으로 보유
}
