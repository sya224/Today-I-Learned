package com.ssafy.project.restcontroller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.project.controller.CommonHandler;
import com.ssafy.project.service.MailService;

import io.swagger.annotations.ApiOperation;
import lombok.Data;
import lombok.NoArgsConstructor;

@RestController
public class MailRESTController {

	@Autowired
	private MailService service;

	@Autowired
	public CommonHandler handler;

	@ExceptionHandler
	public ResponseEntity<Map<String, Object>> handler(Exception e) {
		return handler.fail(e.getMessage(), HttpStatus.OK);
	}

	@GetMapping("/api/email/{mem_id}/{mem_email}")
	@ApiOperation("mem_id의 mem_email의 중복 여부를 확인하고 갱신하며, 인증 번호가 담긴 메일을 발송")
	public ResponseEntity<Map<String, Object>> sendAuth(@PathVariable String mem_id, @PathVariable String mem_email) {
		// mem_id의 mem_email에 대해 email_key를 생성해서 메일에 담아 발송하고 email_auth를 false로 생성
		// email_key를 입력하면 email_auth를 true로 전환
		// 비밀번호 찾기 역시 임시 비밀번호를 발급해 이메일로 전송하는 것으로 대체

		service.sendAuth(mem_id, mem_email);
		return handler.success("인증메일을 발송하였습니다.");
	}

	@NoArgsConstructor
	@Data
	private static class RequestEmailAuth {

		private String mem_id;
		private String mem_email;
		private String authCode;
	}

	@PostMapping("/api/email")
	@ApiOperation("이메일 인증번호를 받는 api 입니다")
	public ResponseEntity<Map<String, Object>> postAuth(@RequestBody RequestEmailAuth rea) {
		service.postAuth(rea.getMem_id(), rea.getMem_email(), rea.getAuthCode());
		return handler.success("이메일 인증이 완료되었습니다.");
	}
	
	@NoArgsConstructor
	@Data
	private static class RequestEmailAsk {
		private String mem_id;
		private String ask_contents;
	}
	
	@PostMapping("/api/email/ask")
	@ApiOperation("운영자에게 문의 보내기 기능입니다")
	public ResponseEntity<Map<String, Object>> emailask(@RequestBody RequestEmailAsk rea) {
		service.emailask(rea.getMem_id(), rea.getAsk_contents());
		return handler.success("이메일로 문의사항이 전달되었습니다. 불편을 드려 죄송합니다.");
	}

	@GetMapping("/api/email/countEmail/{mem_email}")
	@ApiOperation("mem_email로 등록된 아이디가 있는지 확인하는 api 입니다. 있으면 1을 반환합니다")
	public ResponseEntity<Map<String, Object>> countEmail(@PathVariable String mem_email) {		
		return handler.success(service.countEmail(mem_email));
	}
	
	@GetMapping("/api/email/findId/{mem_email}")
	@ApiOperation("mem_email로 등록된 이메일로 아이디를 발송")
	public ResponseEntity<Map<String, Object>> findId(@PathVariable String mem_email) {
		service.findId(mem_email);
		return handler.success("등록된 이메일로 아이디를 발송하였습니다.");
	}

	@GetMapping("/api/email/findPw/{mem_id}/{mem_email}")
	@ApiOperation("mem_email로 등록된 이메일로 임시 비밀번호를 발송")
	public ResponseEntity<Map<String, Object>> findPw(@PathVariable String mem_id, @PathVariable String mem_email) {
		service.findPw(mem_id, mem_email);
		return handler.success("등록된 이메일로 임시 비밀번호를 발송하였습니다.");
	}

}
