package com.ssafy.project.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.project.dao.HeartDao;
import com.ssafy.project.dto.CardlistSearch;
import com.ssafy.project.dto.Heart;
import com.ssafy.project.dto.HeartException;

@Service
public class HeartServiceImpl implements HeartService {

	@Autowired
	private HeartDao dao;

	@Override
	public void insertHeart(Heart heart) {
		try {
			if (dao.countHeart(heart) == 1) {
				throw new HeartException("이미 좋아요 표시한 글입니다.");
			} else {
				dao.insertHeart(heart);
			}
		} catch (Exception e) {
			e.printStackTrace();
			if (e instanceof HeartException) {
				throw (HeartException) e;
			} else {
				throw new HeartException(String.format("%s가 %d번 글에 좋아요 표시하는 중 오류 발생", heart.getMem_id(), heart.getCardlist_id()));
			}
		}

	}

	@Override
	public void deleteHeart(Heart heart) {
		try {
			dao.deleteHeart(heart);
		} catch (Exception e) {
			e.printStackTrace();
			throw new HeartException(heart.getCardlist_id() + "번 글을 좋아요 표시한 mem_id 검색 중 오류 발생");
		}

	}

	@Override
	public List<Integer> cidWhatILike(String mem_id) {
		try {
			return dao.cidWhatILike(mem_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new HeartException(mem_id + "가 좋아요 표시한 카드리스트 번호 목록 조회 중 오류 발생");
		}
	}

	@Override
	public List<CardlistSearch> searchWhatILike(String mem_id, int limit, int page) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();

			params.put("mem_id", mem_id);
			// limit * (page-1) 부터 limit 개
			// 0부터 시작한다
			params.put("start", limit * (page - 1));
			params.put("limit", limit);

			return dao.searchWhatILike(params);
		} catch (Exception e) {
			e.printStackTrace();
			throw new HeartException(mem_id + "가 좋아요 표시한 카드리스트 검색결과 반환 중 오류 발생");
		}
	}

	@Override
	public List<String> searchWhoLikeIt(int cardlist_id) {
		try {
			return dao.searchWhoLikeIt(cardlist_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new HeartException(cardlist_id + "번 글을 좋아요 표시한 mem_id 검색 중 오류 발생");
		}
	}

}
