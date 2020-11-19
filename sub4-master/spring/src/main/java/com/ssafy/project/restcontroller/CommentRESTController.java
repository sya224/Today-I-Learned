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
import com.ssafy.project.service.CommentService;

import io.swagger.annotations.ApiOperation;
import lombok.Data;
import lombok.NoArgsConstructor;

@RestController
public class CommentRESTController {

	@Autowired
	private CommentService service;

	@Autowired
	public CommonHandler handler;

	@ExceptionHandler
	public ResponseEntity<Map<String, Object>> handler(Exception e) {
		return handler.fail(e.getMessage(), HttpStatus.OK);
	}

	// CREATE
	@PostMapping("/api/comment")
	@ApiOperation("comment 신규 생성, 생성 성공 시 comment_id 반환")
	public ResponseEntity<Map<String, Object>> insert(@RequestBody RequestCommentCreate rcc) {
		service.insertComment(rcc.getMem_id(), rcc.getCardlist_id(), rcc.getComment_contents(), rcc.isComment_secret(), rcc.getComment_reply());
		int comment_id = service.getMaxCommentId();
		return handler.success(comment_id);
	}
	
	@NoArgsConstructor
	@Data
	private static class RequestCommentCreate {
		private String mem_id;
		private int cardlist_id;
		private String comment_contents;
		private boolean comment_secret;
		private int comment_reply;
	}

	// READ
	@GetMapping("/api/comment/{cardlist_id}")
	@ApiOperation("카드 리스트의 코멘트들을 조회하는 기능")
	public ResponseEntity<Map<String, Object>> searchAll(@PathVariable int cardlist_id) {
		return handler.success(service.searchAll(cardlist_id));
	}

	@NoArgsConstructor
	@Data
	private static class RequestCommentUpdate {	
		private int comment_id;
		private String comment_contents;
		private boolean comment_secret;
	}
	
	// UPDATE
	@PutMapping("/api/comment")
	@ApiOperation("comment 수정")
	public ResponseEntity<Map<String, Object>> update(@RequestBody RequestCommentUpdate rcu) {
		service.updateComment(rcu.getComment_id(), rcu.getComment_contents(), rcu.isComment_secret());
		return handler.success(rcu.getComment_id() + "번 코멘트 수정 완료");
	}

	// DELETE
	@DeleteMapping("/api/comment/{comment_id}")
	@ApiOperation("comment 삭제")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable int comment_id) {
		service.deleteComment(comment_id);
		return handler.success(comment_id + "번 코멘트 삭제 완료");
	}

}
