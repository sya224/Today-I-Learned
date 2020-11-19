package com.ssafy.project.service;

import java.util.List;

import com.ssafy.project.dto.Board;
import com.ssafy.project.dto.Card;

public interface CardService {

	void insertCard(Card card);

	Card search(int card_id);

	void updateCard(Card card);

	void deleteCard(int card_id);

	int getMaxCardId();
	
	public List<Board> countPublicDailyCard(String mem_id, String from, String to);
	
	public List<Board> countAllDailyCard(String mem_id, String from, String to);

	List<Card> searchPublicCard(String mem_id, String keyword);

	List<Card> searchPrivateCard(String mem_id, String keyword);

	List<Card> searchGlobalCard(String keyword);

	void movecard(int card_id, int cardlist_id);

	void deleteFile(int card_id);

	void uploadFile(int card_id, String destinationFileName);

	String getFileName(int card_id);

}
