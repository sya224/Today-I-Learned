package com.ssafy.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.project.dto.Comment;

@Mapper
public interface CommentDao {

	void insertComment(Comment comment);

	List<Comment> searchAll(int cardlist_id);

	void updateComment(Comment comment);

	void deleteComment(int comment_id);

	int getMaxCommentId();

}
