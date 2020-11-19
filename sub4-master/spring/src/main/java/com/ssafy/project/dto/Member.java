package com.ssafy.project.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class Member implements Serializable {

	private static final long serialVersionUID = 1264392908608406523L;
	
	private String mem_id;
	private String mem_email;
	private String mem_pw;
	private String mem_nick;
	private String mem_reg_date;
	private String mem_thumb;
	private String mem_color;
	private int mem_font;
	private int mem_auth;
	private boolean mem_post_def_secret;
	private String mem_self_intro;

}
