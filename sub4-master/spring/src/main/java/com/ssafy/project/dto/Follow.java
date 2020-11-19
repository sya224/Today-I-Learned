package com.ssafy.project.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class Follow implements Serializable {

	private static final long serialVersionUID = 1289440348277350051L;	
	private int follow_id;
	private String mem_from;
	private String mem_to;

}
