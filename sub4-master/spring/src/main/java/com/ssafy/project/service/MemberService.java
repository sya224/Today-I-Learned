package com.ssafy.project.service;

import java.util.List;

import com.ssafy.project.dto.Member;

public interface MemberService {

	public void insertMember(String mem_id, String mem_pw, String mem_email, String mem_nick);

	public List<Member> searchAll();

	public List<Member> searchByIdLike(String mem_id);

	public List<Member> searchByNickLike(String mem_nick);

	public Member search(String mem_id);

	public void updateMember(String mem_id, String mem_email, String mem_nick, String mem_thumb, int mem_font, String mem_self_intro, boolean mem_post_def_secret);

	public void deleteMember(String mem_id);

	public void hidecardlists(String mem_id);

	public Member login(String mem_id, String mem_pw);

	public void patchpassword(String mem_id, String old_pw, String new_pw);

	public void patchcolor(String mem_id, String mem_color);

	public int getAuth(String mem_id);

	public void patchAuth(String mem_id);

	public boolean getpostdef(String mem_id);

	public void patchpostdef(String mem_id);

	public Member naverLogin(Member naver);

	public void updateEmail(String mem_id, String mem_email);

}
