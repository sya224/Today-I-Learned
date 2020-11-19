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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.project.controller.CommonHandler;
import com.ssafy.project.dto.Board;
import com.ssafy.project.service.BoardService;

import io.swagger.annotations.ApiOperation;

@RestController
public class BoardRESTController {

	@Autowired
	private BoardService service;
	
	@Autowired
	public CommonHandler handler;

	@ExceptionHandler
	public ResponseEntity<Map<String, Object>> handler(Exception e) {
		return handler.fail(e.getMessage(), HttpStatus.OK);
	}

	// CREATE
	@PostMapping("/api/board")
	@ApiOperation("board 신규 생성, 사용자 사용 불가, 개발시에만 사용해 주세요, board_id 이외 전체 지정 가능, 생성 성공시 board_id 반환")
	public ResponseEntity<Map<String, Object>> insert(@RequestBody Board board) {
		service.insertBoard(board);
		int board_id = service.getMaxBoardId();
		return handler.success(board_id);
	}

	// READ
	@GetMapping("/api/board/member/{mem_id}/date/{board_date}")
	@ApiOperation("보드 유저 - 특정 날짜 조회 (오늘 이전 날짜, 오늘 날짜, 이후 날짜 (9999-12-31) 이 셋만 가능합니다")
	public ResponseEntity<Map<String, Object>> searchUserBoardDate(@PathVariable String mem_id, @PathVariable String board_date) {
		return handler.success(service.searchUserBoardDate(mem_id, board_date));
	}

	@GetMapping("/api/board/member/{mem_id}/from/{from}/to/{to}")
	@ApiOperation("보드 유저 - 날짜 조회")
	public ResponseEntity<Map<String, Object>> searchUserBoardDaily(@PathVariable String mem_id, @PathVariable String from, @PathVariable String to) {
		return handler.success(service.searchUserBoardDaily(mem_id, from, to));
	}

	@GetMapping("/api/board/member/{mem_id}/page/{page_number}")
	@ApiOperation("최신 날짜 기준 보드 5개 리턴")
	public ResponseEntity<Map<String, Object>> boardPage(@PathVariable String mem_id, @PathVariable int page_number) {
		return handler.success(service.boardPage(mem_id, page_number));
	}

	@GetMapping("/api/board/{board_id}")
	@ApiOperation("보드의 카드 리스트 조회")
	@ResponseBody
	public ResponseEntity<Map<String, Object>> searchAllCardLists(@PathVariable int board_id) {
		return handler.success(service.searchAllCardLists(board_id));
	}

	// UPDATE
	@PatchMapping("/api/board/{board_id}")
	@ApiOperation("board 정보 수정, board_lists 만 패치 가능, RequestParam이라서 주소에 lists가 노출됩니다")
	public ResponseEntity<Map<String, Object>> patch(@PathVariable("board_id") int board_id, @RequestParam("board_lists") String lists) {
		Board board = new Board();
		board.setBoard_id(board_id);
		board.setBoard_lists(lists);
		service.patchBoard(board);
		return handler.success(board_id + "번 보드 수정 완료");
	}

	/* 사용자 사용 불가 */
	@PutMapping("/api/board/")
	@ApiOperation("board 업데이트, 사용자 사용 불가, 개발시에만 사용해 주세요")
	public ResponseEntity<Map<String, Object>> updateBoard(@RequestBody Board board) {
		service.updateBoard(board);
		return handler.success(board.getBoard_id() + "번 보드 수정 완료");
	}

	@DeleteMapping("/api/board/{board_id}")
	@ApiOperation("board 정보 삭제, 사용자 사용 불가, 개발시에만 사용해 주세요")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable int board_id) {
		service.deleteBoard(board_id);
		return handler.success(board_id + "번 보드 삭제 완료");
	}

}
