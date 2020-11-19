package com.ssafy.project;

//import java.util.Date;
import java.util.Locale;
//import java.util.TimeZone;

//import javax.annotation.PostConstruct;

import org.apache.catalina.connector.Connector;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;

import com.google.common.collect.Sets;

import io.swagger.annotations.ApiOperation;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@PropertySource("classpath:application.properties") // See here
@EnableTransactionManagement
@EnableSwagger2
public class Application implements WebMvcConfigurer {
	
//	제대로 적용되지 않아 0.2.1 에서 뺐습니다.
//	@PostConstruct
//	public void started() {
//		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
//		System.out.println("현재시작 : " + new Date());
//	}
	
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	/**
	 * Swagger 설정
	 * 
	 * @return
	 */
	
	@Bean
	public Docket createRestApi() {
	  return new Docket(DocumentationType.SWAGGER_2)
	      .produces(Sets.newHashSet("application/json"))
	      .consumes(Sets.newHashSet("application/json"))
	      .protocols(Sets.newHashSet("http", "https"))
	      .apiInfo(info())
	      .forCodeGeneration(true)
	      .useDefaultResponseMessages(false).select()
	      .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))
	      .paths(PathSelectors.any()).build();
	}
//	@Bean
//	public Docket api() {
//		return new Docket(DocumentationType.SWAGGER_2)
//				.groupName("project") // service할 project 이름
//				.apiInfo(info())
//				.select()
//				.apis(RequestHandlerSelectors.basePackage("com.ssafy.project.controller"))
//				.paths(PathSelectors.ant("/api/**")) // 서비스할 경로 phone으로 통일, 서비스 구분은 요청 method로 구분
//				// .paths(PathSelectors.any()) // 서비스할 경로를 통일하지 않고 경로명으로 구분해서 사용
//				.build();
//	}

	// 프로젝트의 정보를 만들어주는 함수
	private ApiInfo info() {
		return new ApiInfoBuilder()
				.title("TIL THE END PROJECT REST API")
				.description("프론트에서 사용할 수 있는 api입니다.")
				.license("5zo company")
				.version("0.2.8")
				.build();
	}

	/**
	 * 세션 및 쿠키 locale 설정
	 * 
	 * @return
	 */
	@Bean
	public CookieLocaleResolver localeResolver() {
//		SessionLocaleResolver localeResolver = new SessionLocaleResolver();
		CookieLocaleResolver localeResolver = new CookieLocaleResolver();
		localeResolver.setDefaultLocale(Locale.KOREA);
		return localeResolver;
	}

	/**
	 * parameter:lang 인터셉터 설정
	 * 
	 * @return
	 */
	@Bean
	public LocaleChangeInterceptor localeChangeInterceptor() {
		LocaleChangeInterceptor localeChangeInterceptor = new LocaleChangeInterceptor();
		localeChangeInterceptor.setParamName("lang");
		return localeChangeInterceptor;
	}

	/**
	 * 인터셉터 등록
	 * 
	 */
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(localeChangeInterceptor());
	}

	/**
	 * 크로스 도메인
	 */
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("*")
				.allowedMethods("GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE")
				.allowedHeaders("Content-Type"
								, "X-Requested-With"
								, "accept", "Origin"
								, "Access-Control-Request-Method"
								, "Access-Control-Request-Headers")
				.exposedHeaders("Access-Control-Allow-Origin"
								, "Access-Control-Allow-Credentials")
				.allowCredentials(true)
				.maxAge(3600);
	}		

	/* @Configuration public class MyConfiguration {
	 * 		@Bean public WebMvcConfigurer corsConfigurer() {
	 * 	 		// 개발 환경에서의 크로스 도메인 이슈를 해결하기 위한 코드로 운영 환경에 배포할 경우에는 아래행을 주석 처리합니다.
	 * 	 		// ※크로스 도메인 이슈: 브라우저에서 다른 도메인으로 URL 요청을 하는 경우 나타나는 보안문제 
	 * 			return new WebMvcConfigurer() { };
	 *  	}
	 * } 
	 */


	/*
	 * 서버 https http 연결
	 */
	@Bean
    public ServletWebServerFactory serveltContainer(){
        TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory();
        tomcat.addAdditionalTomcatConnectors(createStandardConnector());
        return tomcat;
    }

    private Connector createStandardConnector(){
        Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
        connector.setPort(8080);
        return connector;
    } //출처: https://engkimbs.tistory.com/756 [새로비]

	
}
