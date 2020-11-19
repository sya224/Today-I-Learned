package com.ssafy.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.project.dao.AlarmDao;
import com.ssafy.project.dao.MemberDao;
import com.ssafy.project.dto.Alarm;
import com.ssafy.project.dto.AlarmException;
import com.ssafy.project.dto.MemberException;

@Service
public class AlarmServiceImpl implements AlarmService {

	@Autowired
	private AlarmDao dao;

	@Autowired
	private MemberDao mdao;

	@Override
	public void insertAlarm(String mem_id, String alarm_text, String alarm_url) {
		try {
			if (mdao.countId(mem_id) == 0) {
				throw new MemberException(mem_id + "를 찾을 수 없습니다.");
			}
			Alarm alarm = new Alarm();
			alarm.setMem_id(mem_id);
			alarm.setAlarm_text(alarm_text);
			alarm.setAlarm_url(alarm_url);
			dao.insertAlarm(alarm);
		} catch (Exception e) {
			if (e instanceof MemberException) {
				throw (MemberException) e;
			} else {
				e.printStackTrace();
				throw new AlarmException("알람 생성 중 오류 발생");
			}

		}
	}

	@Override
	public void deleteAlarm(int alarm_id) {
		try {
			dao.deleteAlarm(alarm_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new AlarmException(alarm_id + "번 알람 삭제 중 오류 발생");
		}

	}

	@Override
	public void deleteAll(String mem_id) {
		try {
			if (mdao.countId(mem_id) == 0) {
				throw new MemberException(mem_id + "를 찾을 수 없습니다.");
			}
			dao.deleteAll(mem_id);
		} catch (Exception e) {
			if (e instanceof MemberException) {
				throw (MemberException) e;
			} else {
				e.printStackTrace();
				throw new AlarmException(mem_id + "의 알람 전체 삭제 중 오류 발생");
			}
		}
	}

	@Override
	public List<Alarm> searchAll(String mem_id) {
		try {
			if (mdao.countId(mem_id) == 0) {
				throw new MemberException(mem_id + "를 찾을 수 없습니다.");
			}
			return dao.searchAll(mem_id);
		} catch (Exception e) {
			if (e instanceof MemberException) {
				throw (MemberException) e;
			} else {
				e.printStackTrace();
				throw new AlarmException(mem_id + "의 알람 조회 중 오류 발생");
			}
		}
	}
}
