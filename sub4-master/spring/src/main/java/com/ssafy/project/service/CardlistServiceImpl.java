package com.ssafy.project.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.project.dao.CardlistDao;
import com.ssafy.project.dto.CardException;
import com.ssafy.project.dto.Cardlist;
import com.ssafy.project.dto.CardlistException;
import com.ssafy.project.dto.CardlistSearch;

@Service
public class CardlistServiceImpl implements CardlistService {

	@Autowired
	private CardlistDao dao;

	@Override
	public void insertCardlist(Cardlist cardlist) {
		try {
			dao.insertCardlist(cardlist);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardlistException("카드 리스트 생성 중 오류 발생");
		}

	}

	@Override
	public Cardlist search(int cardlist_id) {
		try {
			Cardlist cardlist = dao.search(cardlist_id);
			if (cardlist == null) {
				throw new CardlistException(cardlist_id + "번 카드 리스트는 존재하지 않습니다.");
			}
			return cardlist;
		} catch (Exception e) {
			e.printStackTrace();
			if (e instanceof CardlistException) {
				throw (CardlistException) e;
			} else {
				throw new CardlistException(cardlist_id + "번 카드 리스트 조회 중 오류 발생");
			}
		}
	}

	@Override
	public void updateCardlist(Cardlist cardlist) {
		try {
			dao.updateCardlist(cardlist);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardlistException(cardlist.getCardlist_id() + "번 카드 리스트 수정 중 오류 발생");
		}

	}

	@Override
	public void patch(Cardlist cardlist) {
		try {
			dao.patch(cardlist);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardlistException(cardlist.getCardlist_id() + "번 카드 리스트 패치 중 오류 발생");
		}
	}

	@Override
	public void deleteCardlist(int cardlist_id) {
		try {
			dao.deleteCardlist(cardlist_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardlistException(cardlist_id + "번 카드 리스트 삭제 중 오류 발생");
		}
	}

	@Override
	public int getMaxCardlistId() {
		try {
			return dao.getMaxCardlistId();
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardlistException("카드 리스트 id 조회 중 오류 발생.");
		}
	}

	@Override
	public List<CardlistSearch> searchPrivateCardlist(String mem_id, String keyword, int limit, int page) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("mem_id", mem_id);

			String[] list = keyword.split(",");
			List<String> keywordlist = new ArrayList<String>();
			List<String> taglist = new ArrayList<String>();
			for (int i = 0; i < list.length; i++) {
//				if (list[i].equals("")) {
//					continue;
//				} else 

				if (list[i].startsWith("#")) {
					taglist.add(list[i].substring(1));
				} else {
					keywordlist.add(list[i]);
				}
			}

			params.put("keywordlist", keywordlist); // map에 list를 넣는다.
			params.put("taglist", taglist); // map에 list를 넣는다.
			params.put("start", limit * (page - 1));
			params.put("limit", limit);

			return dao.searchPrivateCardlist(params);
		} catch (Exception e) {
			throw new CardException(mem_id + "의 공개된 카드list 검색 중 오류 발생");
		}
	}

	@Override
	public List<CardlistSearch> searchPublicCardlist(String mem_id, String keyword, int limit, int page) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("mem_id", mem_id);

			String[] list = keyword.split(",");
			List<String> keywordlist = new ArrayList<String>();
			List<String> taglist = new ArrayList<String>();
			for (int i = 0; i < list.length; i++) {
//		    	if(list[i].equals("")) {
//					continue;
//		    	} else

				if (list[i].startsWith("#")) {
					taglist.add(list[i].substring(1));
				} else {
					keywordlist.add(list[i]);
				}
			}

			params.put("keywordlist", keywordlist); // map에 list를 넣는다.
			params.put("taglist", taglist); // map에 list를 넣는다.
			params.put("start", limit * (page - 1));
			params.put("limit", limit);

			return dao.searchPublicCardlist(params);
		} catch (Exception e) {
			throw new CardException(mem_id + "의 전체 카드list 검색 중 오류 발생");
		}
	}

	@Override
	public List<CardlistSearch> searchGlobalCardlist(String keyword, int limit, int page) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
//			System.out.println(keyword);
			String[] list = keyword.split(",");
			List<String> keywordlist = new ArrayList<String>();
			List<String> taglist = new ArrayList<String>();
			String mem_id = null;
			for (int i = 0; i < list.length; i++) {
//				if (list[i].equals("")) {
//					continue;
//				} else 

				if (list[i].startsWith("#")) {
					taglist.add(list[i].substring(1));
				} else if (list[i].startsWith("@")) {
					mem_id = list[i].substring(1);
				} else {
					keywordlist.add(list[i]);
				}
			}
//		    System.out.println(keywordlist);
//		    System.out.println(taglist);

			params.put("keywordlist", keywordlist); // map에 list를 넣는다.
			params.put("taglist", taglist); // map에 list를 넣는다.
			params.put("mem_id", mem_id);
			// limit * (page-1) 부터 limit 개
			// 0부터 시작한다
			params.put("start", limit * (page - 1));
			params.put("limit", limit);

			return dao.searchGlobalCardlist(params);
		} catch (Exception e) {
			throw new CardException("전체 카드list 검색 중 오류 발생");
		}
	}

	@Override
	public void movecardlist(int cardlist_id, int board_id) {
		try {
			dao.movecardlist(cardlist_id, board_id);
		} catch (Exception e) {
			throw new CardException("전체 카드list 이동 중 오류 발생");
		}
	}

	@Override
	public void cardlistcolorpatch(int cardlist_id, String cardlist_color) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			System.out.println(cardlist_id);
			System.out.println(cardlist_color);
			params.put("cardlist_id", cardlist_id);
			params.put("cardlist_color", cardlist_color);
			dao.cardlistcolorpatch(params);
		} catch (Exception e) {
			throw new CardException(cardlist_id + "번 카드리스트 색상 변경 오류");
		}

	}
}
