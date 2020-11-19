package com.ssafy.project.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.ssafy.project.dto.Cardlist;
import com.ssafy.project.dto.CardlistSearch;

@Mapper
public interface CardlistDao {

	public void insertCardlist(Cardlist cardlist);

	public Cardlist search(int cardlist_id);

	public void updateCardlist(Cardlist cardlist);

	public void deleteCardlist(int cardlist_id);

	public int getMaxCardlistId();

	public void patch(Cardlist cardlist);

	public List<CardlistSearch> searchPrivateCardlist(Map<String, Object> params);

	public List<CardlistSearch> searchPublicCardlist(Map<String, Object> params);

	public List<CardlistSearch> searchGlobalCardlist(Map<String, Object> params);

	public void movecardlist(@Param("cardlist_id")int cardlist_id, @Param("board_id")int board_id);

	public void cardlistcolorpatch(Map<String, Object> params);
}
