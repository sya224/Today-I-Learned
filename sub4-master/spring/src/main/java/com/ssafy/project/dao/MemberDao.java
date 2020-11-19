package com.ssafy.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.ssafy.project.dto.Member;
import com.ssafy.project.dto.SNS;

@Mapper
public interface MemberDao {

	public void insertMember(Member member);
	
	public List<Member> searchAll();

	public List<Member> searchByIdLike(String mem_id);

	public List<Member> searchByNickLike(String mem_nick);

	public Member search(String mem_id);
	
	public void updateMember(Member member);	
	
	public void deleteMember(String mem_id);	

	public void hidecardlists(String mem_id);
	
	public String findpw(String mem_id);
	
	public void patchpassword(@Param("mem_id") String mem_id, @Param("new_pw") String new_pw);

	public void patchcolor(@Param("mem_id")String mem_id, @Param("mem_color")String mem_color);

	public int getAuth(String mem_id);

	public void patchAuth(String mem_id);

	public int getpostdef(String mem_id);

	public void patchpostdef(String mem_id);
		
	public int countEmail(String mem_email);
	
	public void insertSNS(SNS sns);

	public int countSNSByEmail(String mem_email);

	public String searchSNSIdByEmail(String mem_email);

	
	
	
	
	
	
	

	public int countId(String mem_id);	

	public void insertEmailAuth(@Param("mem_id") String mem_id, @Param("authCode") String authCode);

	public void deletePrevAuth(@Param("mem_id") String mem_id);

	public int postAuth(@Param("mem_id") String mem_id, @Param("mem_email") String mem_email,
			@Param("authCode") String authCode);

	public String searchIdByEmail(String mem_email);

	public void setPw(@Param("mem_id") String mem_id,  @Param("authCode") String authCode);

	public void updateEmail(@Param("mem_id")String mem_id, @Param("mem_email")String mem_email);

	

}
