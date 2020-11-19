package com.ssafy.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.project.dao.CardDao;
import com.ssafy.project.dto.Board;
import com.ssafy.project.dto.Card;
import com.ssafy.project.dto.CardException;

@Service
public class CardServiceImpl implements CardService {

	@Autowired
	private CardDao dao;

	@Override
	public void insertCard(Card card) {
		try {
			dao.insertCard(card);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardException("카드 생성 중 오류 발생");
		}
	}

	@Override
	public Card search(int card_id) {
		try {
			Card card = dao.search(card_id);
			if (card == null) {
				throw new CardException(card_id + "번 카드는 존재하지 않습니다.");
			}
			return card;
		} catch (Exception e) {
			e.printStackTrace();
			if (e instanceof CardException) {
				throw (CardException) e;
			} else {
				throw new CardException(card_id + "번 카드 조회 중 오류 발생");
			}
		}
	}

	@Override
	public void updateCard(Card card) {
		try {
			dao.updateCard(card);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardException(card.getCard_id() + "번 카드 수정 중 오류 발생");
		}

	}

	@Override
	public void deleteCard(int card_id) {
		try {
			dao.deleteCard(card_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardException(card_id + "번 카드 삭제 중 오류 발생");
		}
	}

	@Override
	public int getMaxCardId() {
		try {
			return dao.getMaxCardId();
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardException("카드 테이블 id 조회 중 오류 발생");
		}
	}

	@Override
	public List<Board> countAllDailyCard(String mem_id, String from, String to) {
		try {
			return dao.countAllDailyCard(mem_id, from, to);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardException(mem_id + "의 전체 카드 조회 중 오류 발생");
		}
	}

	@Override
	public List<Board> countPublicDailyCard(String mem_id, String from, String to) {
		try {
			return dao.countPublicDailyCard(mem_id, from, to);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardException(mem_id + "의 공개된 카드 조회 중 오류 발생");
		}
	}

	@Override
	public List<Card> searchPrivateCard(String mem_id, String keyword) {
		try {
			return dao.searchPrivateCard(mem_id, keyword);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardException(mem_id + "의 공개된 카드 검색 중 오류 발생");
		}
	}

	@Override
	public List<Card> searchPublicCard(String mem_id, String keyword) {
		try {
			return dao.searchPublicCard(mem_id, keyword);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardException(mem_id + "의 전체 카드 검색 중 오류 발생");
		}
	}

	@Override
	public List<Card> searchGlobalCard(String keyword) {
		try {
			return dao.searchGlobalCard(keyword);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardException("전체 카드 검색 중 오류 발생");
		}
	}

	@Override
	public void movecard(int card_id, int cardlist_id) {
		try {
			dao.movecard(card_id, cardlist_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardException("전체 카드 이동 중 오류 발생");
		}
	}

	@Override
	public void deleteFile(int card_id) {
		try {
			dao.deleteFile(card_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardException("카드 첨부 파일 삭제 중 오류 발생");
		}

	}

	@Override
	public void uploadFile(int card_id, String card_upload) {
		try {
			dao.uploadFile(card_id, card_upload);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardException("카드 첨부 파일 업로드 중 오류 발생");
		}
	}

	@Override
	public String getFileName(int card_id) {
		try {
			return dao.getFileName(card_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardException("카드 첨부 파일 이름 조회 중 오류 발생");
		}
	}

}
