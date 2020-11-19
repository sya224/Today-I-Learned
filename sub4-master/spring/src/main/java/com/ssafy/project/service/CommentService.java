package com.ssafy.project.service;

import java.util.List;

import com.ssafy.project.dto.Comment;

public interface CommentService {

	List<Comment> searchAll(int cardlist_id);

	void deleteComment(int comment_id);

	int getMaxCommentId();

	void insertComment(String mem_id, int cardlist_id, String comment_contents, boolean comment_secret, int comment_reply);

	void updateComment(int comment_id, String comment_contents, boolean comment_secret);

}
