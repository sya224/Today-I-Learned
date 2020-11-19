package com.ssafy.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.ssafy.project.dto.Board;
import com.ssafy.project.dto.Card;

@Mapper
public interface CardDao {

	public void insertCard(Card card);

	public Card search(int card_id);

	public void updateCard(Card card);

	public void deleteCard(int card_id);

	public int getMaxCardId();
	
	public List<Board> countPublicDailyCard(@Param("mem_id") String mem_id, @Param("from") String from, @Param("to") String to);
	
	public List<Board> countAllDailyCard(@Param("mem_id") String mem_id, @Param("from") String from, @Param("to") String to);

	public List<Card> searchPrivateCard(@Param("mem_id")String mem_id, @Param("keyword")String keyword);

	public List<Card> searchPublicCard(@Param("mem_id")String mem_id, @Param("keyword")String keyword);

	public List<Card> searchGlobalCard(String keyword);

	public void movecard(@Param("card_id")int card_id, @Param("cardlist_id")int cardlist_id);

	public void deleteFile(int card_id);

	public void uploadFile(@Param("card_id")int card_id, @Param("card_upload")String card_upload);

	public String getFileName(int card_id);

}
