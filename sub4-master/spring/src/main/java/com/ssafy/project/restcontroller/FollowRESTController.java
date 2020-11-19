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
import com.ssafy.project.dto.Follow;
import com.ssafy.project.service.FollowService;

import io.swagger.annotations.ApiOperation;

@RestController
public class FollowRESTController {

	@Autowired
	private FollowService service;

	@Autowired
	public CommonHandler handler;

	@ExceptionHandler
	public ResponseEntity<Map<String, Object>> handler(Exception e) {
		return handler.fail(e.getMessage(), HttpStatus.OK);
	}

	@PostMapping("/api/follow")
	@ApiOperation("팔로우 추가")
	public ResponseEntity<Map<String, Object>> insertFollow(@RequestBody Follow follow) {
		service.insertFollow(follow);
		return handler.success(follow.getMem_to() + "님을 팔로우하였습니다.");
	}

	@DeleteMapping("/api/follow")
	@ApiOperation("팔로우 취소")
	public ResponseEntity<Map<String, Object>> deleteFollow(@RequestBody Follow follow) {
		service.deleteFollow(follow);
		return handler.success(follow.getMem_to() + "님 팔로우를 취소하였습니다.");
	}

	@GetMapping("/api/follow/whoifollow/{mem_id}")
	@ApiOperation("mem_id가 팔로우 하고 있는 mem_id의 목록을 반환합니다")
	public ResponseEntity<Map<String, Object>> searchWhoIFollow(@PathVariable String mem_id) {
		return handler.success(service.searchWhoIFollow(mem_id));
	}
	@GetMapping("/api/follow/whofollowme/{mem_id}")
	@ApiOperation("mem_id를 팔로우 하고 있는 mem_id의 목록을 반환합니다")
	public ResponseEntity<Map<String, Object>> searchWhoFollowMe(@PathVariable String mem_id) {
		return handler.success(service.searchWhoFollowMe(mem_id));
	}
	
}
