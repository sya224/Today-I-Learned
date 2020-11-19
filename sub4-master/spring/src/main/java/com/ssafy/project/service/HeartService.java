package com.ssafy.project.service;

import java.util.List;

import com.ssafy.project.dto.CardlistSearch;
import com.ssafy.project.dto.Heart;

public interface HeartService {

	void insertHeart(Heart heart);

	void deleteHeart(Heart heart);

	List<Integer> cidWhatILike(String mem_id);
	
	List<CardlistSearch> searchWhatILike(String mem_id, int limit, int page);

	List<String> searchWhoLikeIt(int cardlist_id);

}
