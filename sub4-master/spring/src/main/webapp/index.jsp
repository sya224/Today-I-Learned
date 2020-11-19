<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">

<title>Naver Login Test</title>
<script type="text/javascript" src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js" charset="utf-8"></script>
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
<script type="text/javascript">
	$(function() {
		$.ajax({ //axios // baseURL / api/naver/login 
			url : 'https://i02a101.p.ssafy.io:8443/spring/api/naver/login',			
			success : function(data) {
				url = data.data;
				$("#naver_id_login").html('<a href=\"' + url + '\"><img width="300" alt="네이버 아이디로 로그인" src="https://developers.naver.com/doc/review_201802/CK_bEFnWMeEBjXpQ5o8N_20180202_7aot50.png" /></a> ');
			}
		});
	});
</script>
</head>
<body>
	
	<!-- 네이버아이디로로그인 버튼 노출 영역 -->
	<div id="naver_id_login" style="text-align: center"></div>
	<!-- //네이버아이디로로그인 버튼 노출 영역 -->

</body>
</html>
