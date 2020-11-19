package com.ssafy.project.service;

import java.util.List;

import com.ssafy.project.dto.Board;

public interface BoardService {

	void insertBoard(Board board);

	int getMaxBoardId();

	List<Board> searchUserBoardDate(String mem_id, String board_date);

	List<Board> searchUserBoardDaily(String mem_id, String from, String to);

	String searchAllCardLists(int board_id);

	void patchBoard(Board board);

	void updateBoard(Board board);

	void deleteBoard(int board_id);

	List<Board> boardPage(String mem_id, int page_number);
	
}
