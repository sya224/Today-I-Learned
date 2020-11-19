package com.ssafy.project.service;

import java.security.MessageDigest;
import java.util.Random;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.ssafy.project.dao.MemberDao;
import com.ssafy.project.dto.MailException;
import com.ssafy.project.dto.MemberException;

@Service
public class MailServiceImpl implements MailService {

	// org.springframework.mail.javamail.JavaMailSender
	@Autowired
	private JavaMailSender javaMailSender;

	@Autowired
	private MemberDao dao;

	private static final String ADMIN_MAIL = "refresh6724.dev@gmail.com";

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

	public void setJavaMailSender(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}

	@Override
	public void sendAuth(String mem_id, String mem_email) {
		// javax.mail.internet.MimeMessage
//		MimeMessage message = javaMailSender.createMimeMessage();
		SimpleMailMessage message = new SimpleMailMessage();
		try {
			if (!dao.search(mem_id).getMem_email().equals(mem_email)) {
				throw new MemberException(mem_email + "은 " + mem_id + "에 등록된 이메일이 아닙니다.");
			}

			dao.deletePrevAuth(mem_id);

			String subject = "Til the end 이메일 인증 코드 발급 안내 입니다.";
			int ran = new Random().nextInt(900000000) + 100000000;
			String authCode = String.valueOf(ran);
			dao.insertEmailAuth(mem_id, authCode);

			StringBuilder sb = new StringBuilder();
			sb.append(" 'Til the end' 에 가입하신것을 환영합니다.\n\n");
			sb.append("귀하의 인증 코드는 " + authCode + "입니다.\n\n");
			sb.append("http://www.endtil.p-e.kr에 가입하신 적이 없는 경우 refresh6724.dev@gmail.com 으로 문의바랍니다.\n\n");

			// org.springframework.mail.javamail.MimeMessageHelper
//			MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
			message.setSubject(subject);
			message.setText(sb.toString());
//			helper.setFrom("refresh6724.dev@gmail.com");
			message.setTo(mem_email);

			// 첨부 파일 처리
//			if (filePath != null) {
//				File file = new File(filePath);
//				if (file.exists()) {
//					helper.addAttachment(file.getName(), new File(filePath));
//				}
//			}
			// 첨부 파일 처리 다른방법(이건 확인함)
			// FileSystemResource file = new FileSystemResource(new File("D:/load.gif"));
			// helper.addAttachment("load.gif", file);
			// 메일에 이미지 심어서 보낸는 방법(한글파일은 안됨)
			// String contents = text + "<br><br><img src=\"cid:emailPic.png \">";
			// helper.setText(contents, true);
			// FileSystemResource file = new FileSystemResource(new
			// File("D:/emailPic.png"));
			// helper.addInline("emailPic.png", file);
			javaMailSender.send(message);
		} catch (Exception e) {
			e.printStackTrace();
			if (e instanceof MemberException) {
				throw (MemberException) e;
			} else if (e instanceof MessagingException) {
//				throw (MessagingException)e;
			} else {
				throw new MailException("메일 발송에 실패하였습니다");
			}
		}
	}

	@Override
	public void postAuth(String mem_id, String mem_email, String authCode) {
		try {
			if (dao.postAuth(mem_id, mem_email, authCode) == 0)
				throw new Exception();
		} catch (Exception e) {
			e.printStackTrace();
			if (e instanceof MemberException) {
				throw (MemberException) e;
			} else {
				throw new MailException("이메일 인증에 실패하였습니다. 코드를 다시 확인해주세요.");
			}
		}

	}

	@Override
	public void emailask(String mem_id, String ask_contents) {
		try {
			SimpleMailMessage message = new SimpleMailMessage();
			String subject = "Til the end 문의가 등록되었습니다.";
			String mem_email = dao.search(mem_id).getMem_email();
			StringBuilder sb = new StringBuilder();
			sb.append(mem_id + "(" + mem_email + ")의 문의입니다.\n\n");
			sb.append(ask_contents + "\n\n");
			message.setSubject(subject);
			message.setText(sb.toString());
			message.setTo(ADMIN_MAIL);
			javaMailSender.send(message);
		} catch (Exception e) {
			e.printStackTrace();
			throw new MailException("이메일 문의 발송에 실패하였습니다. 잠시 후 다시 시도해주시기 바랍니다.");
		}
	}

	@Override
	public int countEmail(String mem_email) {
		try {
			return dao.countEmail(mem_email);
		} catch (Exception e) {
			e.printStackTrace();
			throw new MailException("메일 확인에 실패하였습니다");
		}
	}
	
	@Override
	public void findId(String mem_email) {
		try {
			if (dao.countEmail(mem_email) == 0)
				throw new MailException("해당 이메일로 등록된 계정이 없습니다.");
			SimpleMailMessage message = new SimpleMailMessage();
			String subject = "Til the end 아이디 찾기 안내입니다.";
			String mem_id = dao.searchIdByEmail(mem_email);
			StringBuilder sb = new StringBuilder();
			sb.append("귀하의 아이디는 " + mem_id + "입니다.\n\n");
			sb.append("http://www.endtil.p-e.kr에 가입하신 적이 없는 경우 refresh6724.dev@gmail.com 으로 문의바랍니다.\n\n");

			message.setSubject(subject);
			message.setText(sb.toString());
			message.setTo(mem_email);
			javaMailSender.send(message);

		} catch (Exception e) {
			if (e instanceof MemberException) {
				throw (MemberException) e;
			} else if (e instanceof MailException) {
				throw (MailException) e;
			} else {
				e.printStackTrace();
				throw new MailException("아이디 찾기 메일 발송에 실패하였습니다");
			}
		}
	}

	@Override
	public void findPw(String mem_id, String mem_email) {
		try {
			if (dao.countEmail(mem_email) == 0)
				throw new MailException("해당 이메일로 등록된 계정이 없습니다.");
			if (dao.countId(mem_id) == 0)
				throw new MailException("해당 아이디는 존재하지 않습니다.");
			if (!dao.search(mem_id).getMem_email().equals(mem_email)) {
				throw new MemberException(mem_email + "은 " + mem_id + "에 등록된 이메일이 아닙니다.");
			}
			SimpleMailMessage message = new SimpleMailMessage();
			String subject = "Til the end 임시비밀번호 발급 안내입니다.";
			StringBuilder sb = new StringBuilder();

			int ran = new Random().nextInt(900000000) + 100000000;
			String authCode = String.valueOf(ran);

			dao.setPw(mem_id, pwdEncrypt(authCode));

			sb.append("귀하의 임시비밀번호는 " + authCode + "입니다.\n\n");

			sb.append("임시비밀번호로 로그인 하신 후 반드시 비밀번호를 변경해주세요. \n\n");

			sb.append("http://www.endtil.p-e.kr에 가입하신 적이 없는 경우 refresh6724.dev@gmail.com 으로 문의바랍니다.\n\n");

			message.setSubject(subject);
			message.setText(sb.toString());
			message.setTo(mem_email);
			javaMailSender.send(message);

		} catch (Exception e) {
			if (e instanceof MemberException) {
				throw (MemberException) e;
			} else if (e instanceof MailException) {
				throw (MailException) e;
			} else {
				e.printStackTrace();
				throw new MailException("비밀번호 찾기 메일 발송에 실패하였습니다");
			}
		}

	}

}
