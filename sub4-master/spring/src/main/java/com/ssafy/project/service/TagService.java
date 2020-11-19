package com.ssafy.project.service;

import java.util.List;

import com.ssafy.project.dto.Tag;

public interface TagService {

	void insertTag(Tag tag);

	List<Tag> searchAll();

	Tag search(int tag_id);

	void updateTag(Tag tag);

	void deleteTag(int tag_id);

	List<Tag> privatetagcloud(String mem_id, String from, String to);

	List<Tag> publictagcloud(String mem_id, String from, String to);

	List<Tag> searchPublicTag(String mem_id, String keyword);

	List<Tag> searchPrivateTag(String mem_id, String keyword);

	List<Tag> searchGlobalTag(String keyword);
	
	List<Tag> globalTag();
}
