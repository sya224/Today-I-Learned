package com.ssafy.project.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class CardlistSearch implements Serializable {
	
	private static final long serialVersionUID = 5042250024636098173L;
	
	private String mem_id;
	private String mem_thumb;
	private int board_id;
	private String board_date;
	private int cardlist_id;
	private String cardlist_name;
	private String tag_name;	
}
