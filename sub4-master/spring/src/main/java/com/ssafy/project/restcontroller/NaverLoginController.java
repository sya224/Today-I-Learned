package com.ssafy.project.restcontroller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.scribejava.core.model.OAuth2AccessToken;
import com.ssafy.project.controller.CommonHandler;
import com.ssafy.project.dto.Member;
import com.ssafy.project.oauth.bo.JsonParser;
import com.ssafy.project.oauth.bo.NaverLoginBO;
import com.ssafy.project.service.MemberService;

import io.swagger.annotations.ApiOperation;

@RestController
public class NaverLoginController {

	@Autowired
	private MemberService service;

	NaverLoginBO naverLoginBO = new NaverLoginBO();

	@Autowired
	public CommonHandler handler;

	@ExceptionHandler
	public ResponseEntity<Map<String, Object>> handler(Exception e) {
		return handler.fail(e.getMessage(), HttpStatus.OK);
	}

	@GetMapping("/api/naver/login")
	@ApiOperation("네이버 로그인")
	public ResponseEntity<Map<String, Object>> naverlogin(HttpSession session) throws Exception {
		System.out.println("로그인 버튼에 url 부여");
		return handler.success(naverLoginBO.getAuthorizationUrl(session));
	}

	@GetMapping("/api/naver/callback")
	@ApiOperation("네이버 로그인 리다이렉트")
	public ResponseEntity<Map<String, Object>> callback(@RequestParam String code, @RequestParam String state, HttpSession session) throws Exception {
		/* 네이버 로그인, 인증이 성공적으로 완료되면 code 파라미터가 전달되며 이를 통해 access token을 발급 */
		System.out.println("네이버 로그인 성공");
		JsonParser jp = new JsonParser();
		OAuth2AccessToken oauthToken = naverLoginBO.getAccessToken(session, code, state);
		String apiResult = naverLoginBO.getUserProfile(oauthToken);
		Member naver = jp.changeJson(apiResult);
		// 경우의 수 1 : 네이버 이메일로 가입된 아이디가 없다면 멤버 신규 생성 sns 신규 생성 연결 및 리턴
		// 경우의 수 2 : 네이버 이메일로 가입된 아이디가 있다면 sns 테이블을 확인해 있다면 바로 리턴
		// 경우의 수 3 : 네이버 이메일로 가입된 아이디가 있지만 sns 테이블에 없다면 sns 생성 후 연결 리턴
		return handler.success(service.naverLogin(naver));
	}
}
