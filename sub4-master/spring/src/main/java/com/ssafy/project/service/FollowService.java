package com.ssafy.project.service;

import java.util.List;

import com.ssafy.project.dto.Follow;

public interface FollowService {

	void insertFollow(Follow follow);

	void deleteFollow(Follow follow);

	List<String> searchWhoIFollow(String mem_id);

	List<String> searchWhoFollowMe(String mem_id);

}
