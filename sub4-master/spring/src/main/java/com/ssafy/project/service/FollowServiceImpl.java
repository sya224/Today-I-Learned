package com.ssafy.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.project.dao.FollowDao;
import com.ssafy.project.dto.Follow;
import com.ssafy.project.dto.FollowException;

@Service
public class FollowServiceImpl implements FollowService {

	@Autowired
	private FollowDao dao;

	@Override
	public void deleteFollow(Follow follow) {
		try {
			dao.deleteFollow(follow);
		} catch (Exception e) {
			e.printStackTrace();
			throw new FollowException(String.format("%s의 %s 팔로우 취소 중 오류 발생", follow.getMem_from(), follow.getMem_to()));
		}
	}

	@Override
	public void insertFollow(Follow follow) {
		try {
			if (dao.countFollow(follow) == 1) {
				throw new FollowException("이미 팔로우 되어있습니다.");
			}
			dao.insertFollow(follow);
		} catch (Exception e) {
			e.printStackTrace();
			if (e instanceof FollowException) {
				throw (FollowException) e;
			} else {
				throw new FollowException(String.format("%s의 %s 팔로우 중 오류 발생", follow.getMem_from(), follow.getMem_to()));
			}
		}
	}

	@Override
	public List<String> searchWhoFollowMe(String mem_id) {
		try {
			return dao.searchWhoFollowMe(mem_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new FollowException(mem_id + "의 팔로워 목록 조회 중 오류 발생");
		}
	}

	@Override
	public List<String> searchWhoIFollow(String mem_id) {
		try {
			return dao.searchWhoIFollow(mem_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new FollowException(mem_id + "가 팔로우 한 아이디 조회 중 오류 발생");
		}
	}
}