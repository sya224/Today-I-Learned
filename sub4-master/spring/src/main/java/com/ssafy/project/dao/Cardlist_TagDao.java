package com.ssafy.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.project.dto.Cardlist_Tag;
import com.ssafy.project.dto.Tag;

@Mapper
public interface Cardlist_TagDao {

	public void insertCardlist_Tag(Cardlist_Tag cardlist_tag);

	public List<Tag> searchAll(int cardlist_id);

	public void deleteCardlist_Tag(int cardlist_tag_id);

	public List<Tag> tagcloud(String mem_id);

	public int getMaxCardlistTagId();

	public int existsTagId(String tag_name);

	public int getTagId(String tag_name);

	public void createTag(String tag_name);
}
