package com.ssafy.project.restcontroller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.project.controller.CommonHandler;
import com.ssafy.project.dto.Tag;
import com.ssafy.project.service.TagService;

import io.swagger.annotations.ApiOperation;

@RestController
public class TagRESTController {

	@Autowired
	private TagService service;
	
	@Autowired
	public CommonHandler handler;

	@ExceptionHandler
	public ResponseEntity<Map<String, Object>> handler(Exception e) {
		return handler.fail(e.getMessage(), HttpStatus.OK);
	}

	// CREATE
	@PostMapping("/api/tag")
	@ApiOperation("(개발자가 강제로 수정시키는 용도)tag 신규 생성, 개발용입니다, 카드리스트에 태그를 추가하는 기능은 cardlist-tag-rest-api를 사용해주세요")
	public ResponseEntity<Map<String, Object>> insert(@RequestBody Tag tag) {
		service.insertTag(tag);
		return handler.success(tag.getTag_id());
	}

	// READ
	@GetMapping("/api/tag")
	@ApiOperation("공개 게시글의 태그를 전부 조회하는 기능")
	public ResponseEntity<Map<String, Object>> searchAll() {
		return handler.success(service.searchAll());
	}

	@GetMapping("/api/tag/{tag_id}")
	@ApiOperation("태그 하나를 조회하는 기능")
	public ResponseEntity<Map<String, Object>> search(@PathVariable int tag_id) {
		return handler.success(service.search(tag_id));
	}

	// UPDATE
	@PutMapping("/api/tag")
	@ApiOperation("(개발자가 강제로 수정시키는 용도)tag 정보 수정, 수정가능한 정보는 이름뿐이다")
	public ResponseEntity<Map<String, Object>> update(@RequestBody Tag tag) {
		service.updateTag(tag);
		return handler.success("수정 완료");
	}

	// DELETE
	@DeleteMapping("/api/tag/{tag_id}")
	@ApiOperation("(개발자가 강제로 수정시키는 용도)tag 정보 삭제")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable int tag_id) {
		service.deleteTag(tag_id);
		return handler.success("삭제 완료");
	}

	@GetMapping("/api/tag/private/{mem_id}/from/{from}/to/{to}")
	@ApiOperation("로그인한 본인이 자신의 태그를 목록으로 조회하는 기능, *주의* tag_id가 카드리스트에서의 태그 사용횟수입니다")
	public ResponseEntity<Map<String, Object>> privatetagcloud(@PathVariable String mem_id, @PathVariable String from, @PathVariable String to) {
		return handler.success(service.privatetagcloud(mem_id, from, to));
	}

	@GetMapping("/api/tag/public/{mem_id}/from/{from}/to/{to}")
	@ApiOperation("공개된 회원의 태그를 목록으로 조회하는 기능, *주의* tag_id가 공개된 카드리스트에서의 태그 사용횟수입니다")
	public ResponseEntity<Map<String, Object>> publictagcloud(@PathVariable String mem_id, @PathVariable String from, @PathVariable String to) {
		return handler.success(service.publictagcloud(mem_id, from, to));
	}

	@GetMapping("/api/search/public/tag/{mem_id}/by/{keyword}")
	@ApiOperation("A유저가 B유저를 검색) 특정문자열을 tag_name 에서 포함여부를 찾아서 tag 배열 반환하는 쿼리문")
	public ResponseEntity<Map<String, Object>> searchPublicTag(@PathVariable String mem_id, @PathVariable String keyword) {
		return handler.success(service.searchPublicTag(mem_id, keyword));
	}

	@GetMapping("/api/search/private/tag/{mem_id}/by/{keyword}")
	@ApiOperation("A유저가 A유저를 검색) 특정문자열을 tag_name 에서 포함여부를 찾아서 tag 배열 반환하는 쿼리문")
	public ResponseEntity<Map<String, Object>> searchPrivateTag(@PathVariable String mem_id, @PathVariable String keyword) {
		return handler.success(service.searchPrivateTag(mem_id, keyword));
	}

	@GetMapping("/api/search/global/tag/by/{keyword}")
	@ApiOperation("키워드로 카드 전체 검색) 특정문자열을 tag_name 에서 포함여부를 찾아서 tag 배열 반환하는 쿼리문")
	public ResponseEntity<Map<String, Object>> searchGlobalTag(@PathVariable String keyword) {
		return handler.success(service.searchGlobalTag(keyword));
	}

	@GetMapping("/api/search/global/tag/")
	@ApiOperation("공개된 전체 tag 배열을 반환하는 쿼리문")
	public ResponseEntity<Map<String, Object>> globalTag() {
		return handler.success(service.globalTag());
	}

}
