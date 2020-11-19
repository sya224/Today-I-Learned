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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.project.controller.CommonHandler;
import com.ssafy.project.service.Cardlist_TagService;

import io.swagger.annotations.ApiOperation;
import lombok.Data;
import lombok.NoArgsConstructor;

@RestController
public class Cardlist_TagRESTController {

	@Autowired
	private Cardlist_TagService service;

	@Autowired
	public CommonHandler handler;

	@ExceptionHandler
	public ResponseEntity<Map<String, Object>> handler(Exception e) {
		return handler.fail(e.getMessage(), HttpStatus.OK);
	}

//	// CREATE
//	@PostMapping("/api/cardlist_tag")
//	@ApiOperation("cardtag 신규 생성, card_id와, tag_id가 있어야 한다, 생성 성공시 card_tag_id 반환")
//	public ResponseEntity<Map<String, Object>> insert(@RequestBody Cardlist_Tag cardlist_tag) {
//		service.insertCardlist_Tag(cardlist_tag);
//		int cardlist_tag_id = service.getMaxCardlistTagId();
//		return handler.success(cardlist_tag_id);
//	}

	@NoArgsConstructor
	@Data
	private static class RequestCardlistTag {
		private int cardlist_id;
		private String tag_name;
	}

	@PostMapping("/api/cardlist_tag/")
	@ApiOperation("cardlist_tag 관계 신규 생성, 생성 성공시 cardlist_tag_id 반환, 태그가 없으면 만들고 있으면 그 태그를 사용한다, 대소문자 구별 있음")
	public ResponseEntity<Map<String, Object>> insertcardlisttag(@RequestBody RequestCardlistTag request) {
		service.insertCardlist_Tag(request.cardlist_id, request.tag_name);
		int cardlist_tag_id = service.getMaxCardlistTagId();
		return handler.success(cardlist_tag_id);
	}

	// READ
	@GetMapping("/api/cardlist_tag/{cardlist_id}")
	@ApiOperation("카드리스트 하나의 태그들을 조회하는 기능, 리턴되는 tag_id는 cardlist_tag_id이므로 카드리스트에서 태그 삭제시 tag api를 사용하지 않도록 주의바랍니다")
	public ResponseEntity<Map<String, Object>> searchAll(@PathVariable int cardlist_id) {
		return handler.success(service.searchAll(cardlist_id));
	}

	// DELETE
	@DeleteMapping("/api/cardlist_tag/{cardlist_tag_id}")
	@ApiOperation("cardlist_tag 정보 삭제")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable int cardlist_tag_id) {
		service.deleteCardlist_Tag(cardlist_tag_id);
		return handler.success(cardlist_tag_id + "번 카드-태그 삭제 완료");
	}

}
