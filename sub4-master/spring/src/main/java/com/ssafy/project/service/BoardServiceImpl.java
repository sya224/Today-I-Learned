package com.ssafy.project.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.project.dao.BoardDao;
import com.ssafy.project.dto.Board;
import com.ssafy.project.dto.BoardException;

@Service
public class BoardServiceImpl implements BoardService {

	@Autowired
	private BoardDao dao;

	@Override
	public void insertBoard(Board board) {
		try {			
			dao.insertBoard(board);			
		} catch (Exception e) {
			e.printStackTrace();
			throw new BoardException("보드 생성 중 오류 발생, board_lists의 json 형식은 [\"1\",2] 또는 {\"key\" : \"value\"}입니다.");
		}
	}

	@Override
	public List<Board> searchUserBoardDaily(String mem_id, String from, String to) {
		try {
			return dao.searchUserBoardDaily(mem_id, from, to);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BoardException(from + "에서 " + to + "까지의 보드 목록 조회 중 오류가 발생하였습니다.");			
		}
		
	}
	
	@Override
	public List<Board> searchUserBoardDate(String mem_id, String board_date) {
		try {
			return dao.searchUserBoardDate(mem_id, board_date);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BoardException(board_date + "날짜 보드 조회 중 오류가 발생하였습니다.");			
		}
	}
	
	@Override
	public String searchAllCardLists(int board_id) {
		try {
			// null로 존재여부를 거를 수 없어서 부득이하게 exception을 던짐
			String lists = dao.searchAllCardLists(board_id);
			if(lists == null) {
				throw new BoardException();
			}
			return lists;
		} catch (Exception e) {
			e.printStackTrace();
			throw new BoardException(board_id + "번 보드가 없습니다.");
		}
	}

	@Override
	public void patchBoard(Board board) {
		try {
			dao.patchBoard(board);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BoardException("보드 패치 중 오류 발생");
		}
		
	}
	
	@Override
	public void updateBoard(Board board) {
		try {
			dao.updateBoard(board);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BoardException(board.getBoard_id() + "번 보드 업데이트 중 오류 발생");
		}

	}

	@Override
	public void deleteBoard(int board_id) {
		try {
			dao.deleteBoard(board_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BoardException(board_id + "번 보드 삭제 중 오류 발생");
		}
	}


	@Override
	public int getMaxBoardId() {
		try {
			return dao.getMaxBoardId();
		} catch (Exception e) {
			e.printStackTrace();
			throw new BoardException("보드 테이블 id 조회 중 오류 발생");
		}
	}
	
	
	@Override
	public List<Board> boardPage(String mem_id, int page_number) {
		try {
			if(page_number < 1) {
				throw new BoardException("page_number는 0 이하일 수 없습니다.");
			}
			int start_page = (page_number*5)-5;
			HashMap<String, Object> paramsMap = new HashMap<String, Object>();
			paramsMap.put("mem_id", mem_id);
			paramsMap.put("start_page", start_page);			
			return dao.boardPage(paramsMap);
		} catch (Exception e) {
			e.printStackTrace();
			if (e instanceof BoardException) {
				throw (BoardException) e;
			}else {
				throw new BoardException("보드 " + page_number + "페이지 조회 중 오류 발생");				
			}
		}
	}

}
