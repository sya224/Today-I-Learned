package com.ssafy.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.ssafy.project.dto.Follow;

@Mapper
public interface FollowDao {

	public void insertFollow(Follow follow);

	public void deleteFollow(Follow follow);

	public List<String> searchWhoIFollow(@Param("mem_from") String mem_from);

	public List<String> searchWhoFollowMe(@Param("mem_to") String mem_to);

	public int countFollow(Follow follow);

}
