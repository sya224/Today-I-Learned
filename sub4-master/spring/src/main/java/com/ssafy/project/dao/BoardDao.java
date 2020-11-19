package com.ssafy.project.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.ssafy.project.dto.Board;

@Mapper
public interface BoardDao {

	public void insertBoard(Board board);

	public String searchAllCardLists(int board_id);

	public void updateBoard(Board board);

	public void deleteBoard(int board_id);

	public void patchBoard(Board board);

	public int getMaxBoardId();

	public List<Board> searchUserBoardDaily(@Param("mem_id") String mem_id, @Param("from") String from, @Param("to") String to);

	public List<Board> searchUserBoardDate(@Param("mem_id") String mem_id, @Param("board_date") String board_date);

	public List<Board> boardPage(HashMap<String, Object> paramsMap);

}
