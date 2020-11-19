package com.ssafy.project.service;

import java.security.MessageDigest;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.project.dao.MemberDao;
import com.ssafy.project.dto.Member;
import com.ssafy.project.dto.MemberException;
import com.ssafy.project.dto.SNS;

@Service
public class MemberServiceImpl implements MemberService {

	public static String pwdEncrypt(String pwd) {
		StringBuffer hexString = new StringBuffer();

		try {
			MessageDigest digest = MessageDigest.getInstance("SHA-256");
			byte[] hash = digest.digest(pwd.getBytes("UTF-8"));

			for (int i = 0; i < hash.length; i++) {
				String hex = Integer.toHexString(0xff & hash[i]);

				if (hex.length() == 1) {
					hexString.append('0');
				}
				hexString.append(hex);
			}
		} catch (Exception ex) {
			throw new RuntimeException(ex);
		}
		return hexString.toString();
	}

	@Autowired
	private MemberDao dao;

	@Override
	public void insertMember(String id, String pw, String email, String nick) {
		try {
			if (dao.countId(id) == 1) {
				throw new MemberException("동일한 아이디가 존재합니다");
			} else if (dao.countEmail(email) == 1) {
				throw new MemberException("동일한 이메일이 존재합니다");
			} else {
				Member member = new Member();
				member.setMem_id(id);
				member.setMem_pw(pwdEncrypt(pw));
				member.setMem_email(email);
				member.setMem_nick(nick);
				dao.insertMember(member);
			}
		} catch (Exception e) {
			if (e instanceof MemberException) {
				throw (MemberException) e;
			} else {
				e.printStackTrace();
				throw new MemberException("회원 가입 중 오류 발생");
			}
		}

	}

	@Override
	public List<Member> searchAll() {
		try {
			return dao.searchAll();
		} catch (Exception e) {
			throw new MemberException("회원 목록 조회 중 오류 발생");
		}
	}

	@Override
	public List<Member> searchByIdLike(String mem_id) {
		try {
			return dao.searchByIdLike(mem_id);
		} catch (Exception e) {
			throw new MemberException("회원 아이디 검색 중 오류 발생");
		}
	}

	@Override
	public List<Member> searchByNickLike(String mem_nick) {
		try {
			return dao.searchByNickLike(mem_nick);
		} catch (Exception e) {
			throw new MemberException("회원 닉네임 검색 중 오류 발생");
		}
	}

	@Override
	public Member search(String mem_id) {
		try {
			Member member = dao.search(mem_id);
			if (member == null) {
				throw new MemberException("등록되지 않은 회원입니다.");
			}
			return member;
		} catch (Exception e) {
			if (e instanceof MemberException) {
				throw (MemberException) e;
			} else {
				e.printStackTrace();
				throw new MemberException("회원 정보 조회 중 오류 발생");
			}
		}
	}

	@Override
	public void updateMember(String id, String nick, String thumb, String color, int font, String mem_self_intro, boolean mem_post_def_secret) {
		try {
			Member member = new Member();
			member.setMem_id(id);
			member.setMem_nick(nick);
			member.setMem_thumb(thumb);
			member.setMem_color(color);
			member.setMem_font(font);
			member.setMem_self_intro(mem_self_intro);
			member.setMem_post_def_secret(mem_post_def_secret);
			dao.updateMember(member);

		} catch (Exception e) {
			if (e instanceof MemberException) {
				throw (MemberException) e;
			} else {
				e.printStackTrace();
				throw new MemberException("회원 정보 수정 중 오류 발생");
			}
		}

	}
	
	@Override
	public void updateEmail(String mem_id, String mem_email) {
		try {
		
			if(dao.countSNSByEmail(mem_email) != 0) {
				throw new MemberException("sns 회원은 이메일 변경이 불가능합니다");
			} else if(dao.countEmail(mem_email) != 0) {
				throw new MemberException("해당 이메일은 사용중입니다");
			} else {
				dao.updateEmail(mem_id, mem_email);
			}

		} catch (Exception e) {
			if (e instanceof MemberException) {
				throw (MemberException) e;
			} else {
				e.printStackTrace();
				throw new MemberException("회원 이메일 수정 중 오류 발생");
			}
		}
	}

	@Override
	public void deleteMember(String mem_id) {
		try {
			dao.deleteMember(mem_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new MemberException("회원 탈퇴 전환 중 오류 발생");
		}
	}

	@Override
	public void hidecardlists(String mem_id) {
		try {
			dao.hidecardlists(mem_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new MemberException("글 비공개 전환 실패");
		}
	}

	@Override
	public Member login(String mem_id, String mem_pw) {
		try {
			Member member = dao.search(mem_id);
			if (member.getMem_id() == null) {
				throw new MemberException("등록되지 않은 회원입니다.");
			} else if (dao.getAuth(mem_id) == 3) {
				throw new MemberException("탈퇴한 회원입니다.");
			} else if (!dao.findpw(mem_id).equals(pwdEncrypt(mem_pw))) {
				throw new MemberException("잘못된 비밀번호입니다.");
			} else {
				return member;
			}
		} catch (Exception e) {
			if (e instanceof MemberException) {
				throw (MemberException) e;
			} else {
				e.printStackTrace();
				throw new MemberException("회원 로그인 중 오류 발생");
			}
		}
	}

	@Override
	public void patchpassword(String mem_id, String old_pw, String new_pw) {
		try {

			if (!dao.findpw(mem_id).equals(pwdEncrypt(old_pw))) {
				throw new MemberException("현재 비밀번호가 틀립니다");
			}
			dao.patchpassword(mem_id, pwdEncrypt(new_pw));
		} catch (Exception e) {
			if (e instanceof MemberException) {
				throw (MemberException) e;
			} else {
				e.printStackTrace();
				throw new MemberException("회원 비밀번호 수정 중 오류 발생");
			}
		}
	}

	@Override
	public void patchcolor(String mem_id, String mem_color) {
		try {
			dao.patchcolor(mem_id, mem_color);
		} catch (Exception e) {
			e.printStackTrace();
			throw new MemberException("멤버 색상 변경 중 오류 발생");
		}
	}

	@Override
	public int getAuth(String mem_id) {
		try {
			return dao.getAuth(mem_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new MemberException(mem_id + "의 회원 권한 조회 중 오류 발생");
		}
	}

	@Override
	public void patchAuth(String mem_id) {
		try {
			dao.patchAuth(mem_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new MemberException(mem_id + "의 회원 권한 변경 중 오류 발생");
		}

	}

	@Override
	public boolean getpostdef(String mem_id) {
		try {
			return dao.getpostdef(mem_id) == 1;
		} catch (Exception e) {
			e.printStackTrace();
			throw new MemberException(mem_id + "의 글쓰기 기본 설정 조회 중 오류 발생");
		}
	}

	@Override
	public void patchpostdef(String mem_id) {
		try {
			dao.patchpostdef(mem_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new MemberException(mem_id + "의 글쓰기 기본 설정 변경 중 오류 발생");
		}
	}

	@Override
	public Member naverLogin(Member naver) {
		try {
			// 경우의 수 1 : 네이버 이메일로 가입된 아이디가 없다면 멤버 신규 생성 sns 신규 생성 연결 및 리턴
			if (dao.countEmail(naver.getMem_email()) == 0) {
				// id, nick, email 세가지만 가지고 있다
				dao.insertMember(naver);
				SNS sns = new SNS();
				sns.setMem_id(naver.getMem_id());
				sns.setSns_nid(Integer.parseInt(naver.getMem_id().split("_")[1]));
				sns.setMem_email(naver.getMem_email());
				sns.setProvider("NAVER");
				dao.insertSNS(sns);
				return naver;

				// 경우의 수 2 : 네이버 이메일로 가입된 아이디가 있지만 sns 테이블에 없다면 sns 생성 후 연결 리턴
			} else if (dao.countSNSByEmail(naver.getMem_email()) == 0) {
				SNS sns = new SNS();
				String mem_email = naver.getMem_email();
				String mem_id = dao.searchIdByEmail(mem_email);
				sns.setMem_id(mem_id);
				sns.setSns_nid(Integer.parseInt(naver.getMem_id().split("_")[1]));
				sns.setMem_email(naver.getMem_email());
				sns.setProvider("NAVER");
				dao.insertSNS(sns);
				return dao.search(mem_id);

				// 경우의 수 3 : 네이버 이메일로 가입된 아이디가 있고 sns 테이블을 확인해 있다면 바로 리턴
			} else {
				return dao.search(dao.searchSNSIdByEmail(naver.getMem_email()));
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new MemberException("네이버 아이디 로그인 중 오류 발생");
		}
	}

}
