package com.ssafy.project.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.project.dto.CardlistSearch;
import com.ssafy.project.dto.Heart;

@Mapper
public interface HeartDao {

	public void insertHeart(Heart heart);

	public void deleteHeart(Heart heart);

	public List<Integer> cidWhatILike(String mem_id);
	
	public List<CardlistSearch> searchWhatILike(Map<String, Object> params);

	public List<String> searchWhoLikeIt(int cardlist_id);

	public int countHeart(Heart heart);

}
