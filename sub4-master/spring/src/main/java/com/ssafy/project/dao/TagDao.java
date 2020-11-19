package com.ssafy.project.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.ssafy.project.dto.Tag;

@Mapper
public interface TagDao {

	public void insertTag(Tag tag);

	public List<Tag> searchAll();

	public Tag search(int tag_id);

	public void updateTag(Tag tag);

	public void deleteTag(int tag_id);

	public List<Tag> privatetagcloud(@Param("mem_id") String mem_id, @Param("from") String from, @Param("to") String to);

	public List<Tag> publictagcloud(@Param("mem_id") String mem_id, @Param("from") String from, @Param("to") String to);

	public List<Tag> searchPrivateTag(@Param("mem_id")String mem_id, @Param("keyword")String keyword);

	public List<Tag> searchPublicTag(@Param("mem_id")String mem_id, @Param("keyword")String keyword);

	public List<Tag> searchGlobalTag(String keyword);
	
	public List<Tag> globalTag();

}
