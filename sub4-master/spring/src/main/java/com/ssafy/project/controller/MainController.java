package com.ssafy.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.ssafy.project.service.MemberService;

@Controller
public class MainController {

	@Autowired
	MemberService service;

	@GetMapping("/")
	public String index() {
		return "index";
	}
}
