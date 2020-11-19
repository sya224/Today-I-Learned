package com.ssafy.project.oauth.bo;

import java.io.IOException;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth20Service;
import com.ssafy.project.oauth.model.NaverLoginApi;

@Component
public class NaverLoginBO {
	/* 인증 요청문을 구성하는 파라미터 */
	// client_id : 애플리케이션 등록 후 발급받은 아이디
	// response_type : 인증 과정에 대한 구분값, code로 값이 고정되어 있음
	// redirect_uri : 네이버 로그인 인증의 결과를 전달받을 콜백 URL(인코딩), 
	//				애플리케이션을 등록할 때 callback URL에 설정한 정보
	// state : 애플리케이션이 생성한 상태 토큰
	private final static String CLIENT_ID = "XtTlOwc7r_f9dechTz4P"; // developers.naver.com
	private final static String CLIENT_SECRET = "KTH0iuyQHM";	// refresh6724@naver.com
	private final static String REDIRECT_URI = "https://i02a101.p.ssafy.io:8443/spring/api/naver/callback";
	private final static String SESSION_STATE = "oauth_state";
	private final static String PROFILE_API_URL= "https://openapi.naver.com/v1/nid/me";
	
	/* 네이버 아이디로 인증 URL 생성 */
	public String getAuthorizationUrl(HttpSession session) {
		/* 세션 유효성 검증을 위해 난수를 생성 */
		String state = generateRandomString();
		System.out.println("난수 state 생성 : " + state);
		/* 생성한 난수 값을 session에 저장 */
		setSession(session, state);
		
		/* Scribe 에서 제공하는 인증 URL 생성 기능을 이용하여 네아로 인증 URL 생성 */
		OAuth20Service oauthService = new ServiceBuilder()
				.apiKey(CLIENT_ID)
				.apiSecret(CLIENT_SECRET)
				.callback(REDIRECT_URI)				
				.state(state) // 앞서 생성한 난수 값을 인증 URL 생성시 사용
				.build(NaverLoginApi.instance());
		
		return oauthService.getAuthorizationUrl();			
	}
	
	/* 네이버아이디로 callback 처리 및 accesstoken 획득 */
	public OAuth2AccessToken getAccessToken(HttpSession session, String code, String state) throws IOException {
		 
		/* callback으로 전달받은 세션 검증을 난수값과 세션에 저장되어 있는 값이 일치하는지 확인 */
		String sessionState = getSession(session);
		System.out.println("저장 state : " + state);
		System.out.println("세션 state : " + sessionState);
		if(StringUtils.pathEquals(sessionState, state)) {
			OAuth20Service oauthService = new ServiceBuilder()
					.apiKey(CLIENT_ID)
					.apiSecret(CLIENT_SECRET)
					.callback(REDIRECT_URI)
					.state(state)
					.build(NaverLoginApi.instance());
			
			/* Scribe 에서 제공하는 AccessToken 획득 기능으로 네아로 Access Token 획득 */
			OAuth2AccessToken accessToken = oauthService.getAccessToken(code);
			System.out.println("획득한 access token : " + accessToken);
			return accessToken;
		}
		return null;
	}
	
	/* 세션 유효성 검증을 위한 난수 생성기 */
		private String generateRandomString() {
			return UUID.randomUUID().toString();
		}
	/* http session에 데이터 저장 */
	private void setSession(HttpSession session, String state) {
		session.setAttribute(SESSION_STATE, state);
	}
	/* http session에서 데이터 가져오기 */
	private String getSession(HttpSession session) {
		return (String) session.getAttribute(SESSION_STATE);
	}
	/* access token을 이용하여 네이버 사용자 프로필 api를 호출 */
	public String getUserProfile(OAuth2AccessToken oauthToken) throws IOException {
		OAuth20Service oauthService = new ServiceBuilder()
				.apiKey(CLIENT_ID)
				.apiSecret(CLIENT_SECRET)
				.callback(REDIRECT_URI)
				.build(NaverLoginApi.instance());
		OAuthRequest request = new OAuthRequest(Verb.GET, PROFILE_API_URL, oauthService);
		oauthService.signRequest(oauthToken, request);
		Response response = request.send();
		return response.getBody();
	}
	//
}
