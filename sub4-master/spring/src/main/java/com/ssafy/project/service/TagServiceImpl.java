package com.ssafy.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.project.dao.TagDao;
import com.ssafy.project.dto.Cardlist_TagException;
import com.ssafy.project.dto.Tag;
import com.ssafy.project.dto.TagException;

@Service
public class TagServiceImpl implements TagService {

	@Autowired
	private TagDao dao;

	@Override
	public void insertTag(Tag tag) {
		try {
			dao.insertTag(tag);
		} catch (Exception e) {
			e.printStackTrace();
			throw new TagException("태그 생성 중 오류 발생");
		}
	}

	@Override
	public List<Tag> searchAll() {
		try {
			return dao.searchAll();
		} catch (Exception e) {
			throw new TagException("태그 리스트 조회 중 오류 발생");
		}
	}

	@Override
	public Tag search(int tag_id) {
		try {
			Tag tag = dao.search(tag_id);
			if (tag == null) {
				throw new TagException("존재하지 않는 태그 번호입니다");
			}
			return tag;
		} catch (Exception e) {
			e.printStackTrace();
			if (e instanceof TagException) {
				throw (TagException) e;
			} else {
				throw new TagException(tag_id + "번 태그 조회 중 오류 발생");
			}
		}
	}

	@Override
	public void updateTag(Tag tag) {
		try {
			dao.updateTag(tag);
		} catch (Exception e) {
			e.printStackTrace();
			throw new TagException(tag.getTag_id() + "번 태그 수정 중 오류 발생");
		}

	}

	@Override
	public void deleteTag(int tag_id) {
		try {
			dao.deleteTag(tag_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new TagException(tag_id + "번 태그 삭제 중 오류 발생");
		}
	}

	@Override
	public List<Tag> privatetagcloud(String mem_id, String from, String to) {
		try {
			return dao.privatetagcloud(mem_id, from, to);
		} catch (Exception e) {
			e.printStackTrace();
			throw new Cardlist_TagException(mem_id + "의 " + from + " ~ " + to + "간의 private 태그 조회 중 오류 발생");
		}
	}

	@Override
	public List<Tag> publictagcloud(String mem_id, String from, String to) {
		try {
			return dao.publictagcloud(mem_id, from, to);
		} catch (Exception e) {
			e.printStackTrace();
			throw new Cardlist_TagException(mem_id + "의 " + from + " ~ " + to + "간의 public 태그 조회 중 오류 발생");
		}
	}
	

	@Override
	public List<Tag> searchPrivateTag(String mem_id, String keyword) {
		try {
			return dao.searchPrivateTag(mem_id, keyword);
		} catch (Exception e) {
			e.printStackTrace();
			throw new TagException(mem_id + "의 전체 태그 검색 중 오류 발생");
		}
	}
	
	@Override
	public List<Tag> searchPublicTag(String mem_id, String keyword) {
		try {
			return dao.searchPublicTag(mem_id, keyword);
		} catch (Exception e) {
			e.printStackTrace();
			throw new TagException(mem_id + "의 공개된 태그 검색 중 오류 발생");
		}
	}
	
	@Override
	public List<Tag> searchGlobalTag(String keyword) {
		try {
			return dao.searchGlobalTag(keyword);
		} catch (Exception e) {
			e.printStackTrace();
			throw new TagException("공개된 전체 태그 검색 중 오류 발생");
		}
	}
	
	@Override
	public List<Tag> globalTag() {
		try {
			return dao.globalTag();
		} catch (Exception e) {
			e.printStackTrace();
			throw new TagException("전체 태그 조회 중 오류 발생");
		}
	}

}
