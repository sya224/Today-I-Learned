package com.ssafy.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.project.dao.CommentDao;
import com.ssafy.project.dto.Comment;
import com.ssafy.project.dto.CommentException;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	private CommentDao dao;

	@Override
	public void insertComment(String mem_id, int cardlist_id, String comment_contents, boolean comment_secret, int comment_reply) {
		try {
			Comment comment = new Comment();
			comment.setCardlist_id(cardlist_id);
			comment.setMem_id(mem_id);
			comment.setComment_contents(comment_contents);
			comment.setComment_secret(comment_secret);
			comment.setComment_reply(comment_reply);
			dao.insertComment(comment);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CommentException("코멘트 생성 중 오류 발생");
		}

	}

	@Override
	public List<Comment> searchAll(int cardlist_id) {
		try {
			return dao.searchAll(cardlist_id);
		} catch (Exception e) {
			throw new CommentException(cardlist_id + "번 카드 리스트의 코멘트 조회 중 오류 발생");
		}
	}

	@Override
	public void updateComment(int comment_id, String comment_contents, boolean comment_secret) {
		try {
			Comment comment = new Comment();
			comment.setComment_id(comment_id);
			comment.setComment_contents(comment_contents);
			comment.setComment_secret(comment_secret);			
			dao.updateComment(comment);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CommentException(comment_id + "번 코멘트 수정 중 오류 발생");
		}

	}

	@Override
	public void deleteComment(int comment_id) {
		try {
			dao.deleteComment(comment_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CommentException(comment_id + "번 코멘트 삭제 중 오류 발생");
		}
	}
	
	@Override
	public int getMaxCommentId() {
		try {
			return dao.getMaxCommentId();
		} catch (Exception e) {
			e.printStackTrace();
			throw new CommentException("코멘트 테이블 id 조회 중 오류 발생");
		}
	}
}
