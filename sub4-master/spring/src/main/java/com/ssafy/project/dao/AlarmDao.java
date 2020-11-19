package com.ssafy.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.project.dto.Alarm;

@Mapper
public interface AlarmDao {

	void insertAlarm(Alarm alarm);

	void deleteAlarm(int alarm_id);

	List<Alarm> searchAll(String mem_id);

	void deleteAll(String mem_id);

}
