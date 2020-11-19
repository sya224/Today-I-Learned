package com.ssafy.project.restcontroller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.project.controller.CommonHandler;
import com.ssafy.project.service.MemberService;

import io.swagger.annotations.ApiOperation;
import lombok.Data;
import lombok.NoArgsConstructor;

@RestController
public class MemberRESTController {

	@Autowired
	private MemberService service;
	
	@Autowired
	public CommonHandler handler;

	@ExceptionHandler
	public ResponseEntity<Map<String, Object>> handler(Exception e) {
		return handler.fail(e.getMessage(), HttpStatus.OK);
	}

	// CREATE
	@PostMapping("/api/member")
	@ApiOperation("member 생성, id 필수입니다, 생성 성공시 mem_id 반환")
	public ResponseEntity<Map<String, Object>> insert(@RequestBody RequestMemberCreate rmc) {
		service.insertMember(rmc.getMem_id(), rmc.getMem_pw(), rmc.getMem_email(), rmc.getMem_nick());
		return handler.success(rmc.getMem_id());
	}

	@NoArgsConstructor
	@Data
	private static class RequestMemberCreate {
		private String mem_id;
		private String mem_pw;
		private String mem_email;
		private String mem_nick;
	}

	// READ
	@GetMapping("/api/member")
	@ApiOperation("(운영자) 회원 목록 9개 컬럼 조회, 아이디, 이메일, 닉네임, 권한, 가입일, 썸네일, 컬러, 폰트, 자기소개")
	public ResponseEntity<Map<String, Object>> searchAll() {
		return handler.success(service.searchAll());
	}

	@GetMapping("/api/member/searchByIdLike/{mem_id}")
	@ApiOperation("회원 아이디로 조회하는 기능, like % 사용으로 검색")
	public ResponseEntity<Map<String, Object>> searchByIdLike(@PathVariable String mem_id) {
		return handler.success(service.searchByIdLike(mem_id));
	}

	@GetMapping("/api/member/searchByNickLike/{mem_nick}")
	@ApiOperation("회원 닉네임으로 조회하는 기능, like % 사용으로 검색")
	public ResponseEntity<Map<String, Object>> searchByNickLike(@PathVariable String mem_nick) {
		return handler.success(service.searchByNickLike(mem_nick));
	}

	@GetMapping("/api/member/{mem_id}")
	@ApiOperation("회원 한명을 정확한 아이디로 조회 하는 기능")
	public ResponseEntity<Map<String, Object>> search(@PathVariable String mem_id) {
		return handler.success(service.search(mem_id));
	}

	// UPDATE
	@PutMapping("/api/member")
	@ApiOperation("member 정보 수정, 변경 가능 : nick, thumb, color, font, self_intro, post_def_secret 변경 성공시 member를 리턴합니다")
	public ResponseEntity<Map<String, Object>> update(@RequestBody RequestMemberUpdate rmu) {
		service.updateMember(rmu.getMem_id(), rmu.getMem_nick(), rmu.getMem_thumb(), rmu.getMem_color(), rmu.getMem_font(), rmu.getMem_self_intro(), rmu.isMem_post_def_secret());
		return handler.success(service.search(rmu.getMem_id()));
	}

	@NoArgsConstructor
	@Data
	private static class RequestMemberUpdate {
		private String mem_id;
		private String mem_nick;
		private String mem_thumb;
		private String mem_color;
		private int mem_font;
		private String mem_self_intro;
		private boolean mem_post_def_secret;
	}
	
	@PutMapping("/api/member/email")
	@ApiOperation("member email 정보 수정, member 리턴")
	public ResponseEntity<Map<String, Object>> updateEmail(@RequestBody RequestMemberEmail rme) {
		service.updateEmail(rme.getMem_id(), rme.getMem_email());
		return handler.success(service.search(rme.getMem_id()));
	}
	

	@NoArgsConstructor
	@Data
	private static class RequestMemberEmail {
		private String mem_id;
		private String mem_email;
	}

	// DELETE
	@DeleteMapping("/api/member/{mem_id}")
	@ApiOperation("member 정보 삭제, (1) 권한 3(탈퇴)으로 수정 (2) 전체 글 비공개 전환 ")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable String mem_id) {
		service.deleteMember(mem_id);
		service.hidecardlists(mem_id);
		return handler.success(mem_id + "의 탈퇴 처리 완료");
	}

	/**
	 * 로그인 설정 state 가 fail 이면 로그인 실패 state 가 ok 이고 data가 true면 admin, data가 false면
	 * 일반회원 아니면 data로 id를 돌려줘야 하나?
	 */
	@PostMapping("/api/member/login")
	@ApiOperation("아이디와 비밀번호를 사용해 로그인, 성공시 member 리턴")
	public ResponseEntity<Map<String, Object>> login(@RequestBody RequestMemberLogin payload) {
		return handler.success(service.login(payload.getMem_id(), payload.getMem_pw()));
	}

	@NoArgsConstructor
	@Data
	private static class RequestMemberLogin {
		private String mem_id;
		private String mem_pw;
	}

	@PatchMapping("/api/member/password/{mem_id}")
	@ApiOperation("member의 비밀번호 수정, 전달 인자 data : {\"old_pw\" : \"test\", \"new_pw\" : \"test\"} ")
	public ResponseEntity<Map<String, Object>> patchpassword(@PathVariable String mem_id, @RequestBody RequestMemberPassword payload) {
		service.patchpassword(mem_id, payload.getOld_pw(), payload.getNew_pw());
		return handler.success(service.search(mem_id));
	}

	@NoArgsConstructor
	@Data
	private static class RequestMemberPassword {
		private String old_pw;
		private String new_pw;
	}

	@PatchMapping("/api/member/{mem_id}/color/{mem_color}")
	@ApiOperation("member의 선호하는 색상 수정, 아이디와 색상만 전달")
	public ResponseEntity<Map<String, Object>> patchcolor(@PathVariable String mem_id, @PathVariable String mem_color) {
		service.patchcolor(mem_id, mem_color);
		return handler.success(mem_color);
	}

	/*
	 * 권한 설정
	 */
	@GetMapping("/api/member/auth/{mem_id}")
	@ApiOperation("회원아이디를 넣으면 권한을 확인할 수 있는 api, 0이면 운영자, 1이면 일반유저, 2면 정지, 3이면 탈퇴한 유저.")
	public ResponseEntity<Map<String, Object>> getAuth(@PathVariable String mem_id) {
		return handler.success(service.getAuth(mem_id));
	}

	@PatchMapping("/api/member/auth/{mem_id}")
	@ApiOperation("(운영자) 글쓰기 권한 설정, 회원 목록 또는 회원 관리창에서 설정할 수 있습니다." + "누를때마다 일반<->정지 회원으로 변경되도록 설정되어있습니다. 수정이 필요하면 말해주세요")
	public ResponseEntity<Map<String, Object>> patchAuth(@PathVariable String mem_id) {
		service.patchAuth(mem_id);
		return handler.success(mem_id + "의 글쓰기 권한이 " + (service.getAuth(mem_id) == 1 ? "일반" : "정지") + "회원으로 변경되었습니다.");
	}

	@GetMapping("/api/member/postdef/{mem_id}")
	@ApiOperation("회원아이디를 넣으면 앞으로 쓸 카드의 기본 비밀글 설정을 확인할 수 있는 api, isSecret? 기본적으로 공개 설정이면 false")
	public ResponseEntity<Map<String, Object>> getpostdef(@PathVariable String mem_id) {
		return handler.success(service.getpostdef(mem_id));
	}

	@PatchMapping("/api/member/postdef/{mem_id}")
	@ApiOperation("카드 공개 설정 변경 권한은 사용자가 가집니다. 권한이 1인 일반 유저만 변경 가능" + "누를때마다 기본 공개<->기본 비공개로 변경되도록 설정되어있습니다. 수정이 필요하면 말해주세요")
	public ResponseEntity<Map<String, Object>> patchpostdef(@PathVariable String mem_id) {
		service.patchpostdef(mem_id);
		return handler.success(mem_id + "의 공개 설정이 변경되었습니다.");
	}

}
