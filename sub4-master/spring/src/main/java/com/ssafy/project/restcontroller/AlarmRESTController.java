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
import com.ssafy.project.service.AlarmService;

import io.swagger.annotations.ApiOperation;
import lombok.Data;
import lombok.NoArgsConstructor;

@RestController
public class AlarmRESTController {

	@Autowired
	private AlarmService service;

	@Autowired
	public CommonHandler handler;

	@ExceptionHandler
	public ResponseEntity<Map<String, Object>> handler(Exception e) {
		return handler.fail(e.getMessage(), HttpStatus.OK);
	}

	@NoArgsConstructor
	@Data
	private static class RequestAlarmBody {
		private String mem_id;
		private String alarm_text;
		private String alarm_url;
	}
	
	@PostMapping("/api/alarm")
	@ApiOperation("알람 추가, mem_id는 알람을 받을 사람, alarm_text는 보여줄 내용, alarm_url은 알람 발생 장소")
	public ResponseEntity<Map<String, Object>> insertAlarm(@RequestBody RequestAlarmBody rab) {
		service.insertAlarm(rab.getMem_id(), rab.getAlarm_text(), rab.getAlarm_url());
		return handler.success(rab.getMem_id() + "에게 전달될 알람이 생성되었습니다.");
	}

	@DeleteMapping("/api/alarm/{alarm_id}")
	@ApiOperation("알람 삭제, 알람을 받는 대상인 사용자가 삭제하는 기능")
	public ResponseEntity<Map<String, Object>> deleteAlarm(@PathVariable int alarm_id) {
		service.deleteAlarm(alarm_id);
		return handler.success(alarm_id + "번 알람이 정상적으로 삭제되었습니다.");
	}
	
	@DeleteMapping("/api/alarm/deleteAll/{mem_id}")
	@ApiOperation("mem_id의 알람 전체 삭제")
	public ResponseEntity<Map<String, Object>> deleteAll(@PathVariable String mem_id) {
		service.deleteAll(mem_id);
		return handler.success(mem_id + "의 알람이 정상적으로 삭제되었습니다.");
	}

	@GetMapping("/api/alarm/{mem_id}")
	@ApiOperation("mem_id의 알람 목록을 리턴합니다")
	public ResponseEntity<Map<String, Object>> searchAll(@PathVariable String mem_id) {
		return handler.success(service.searchAll(mem_id));
	}
	
}
