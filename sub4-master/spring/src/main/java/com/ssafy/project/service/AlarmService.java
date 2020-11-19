package com.ssafy.project.service;

import java.util.List;

import com.ssafy.project.dto.Alarm;

public interface AlarmService {

	public void deleteAll(String mem_id);
	
	public void deleteAlarm(int alarm_id);

	public List<Alarm> searchAll(String mem_id);

	public void insertAlarm(String mem_id, String alarm_text, String alarm_url);

}
