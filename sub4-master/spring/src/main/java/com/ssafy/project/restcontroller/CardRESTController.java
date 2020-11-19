package com.ssafy.project.restcontroller;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.project.controller.CommonHandler;
import com.ssafy.project.dto.Card;
import com.ssafy.project.service.CardService;

import io.swagger.annotations.ApiOperation;
import lombok.Data;
import lombok.NoArgsConstructor;

@RestController
public class CardRESTController {

	@Autowired
	private CardService service;
	
	@Autowired
	public CommonHandler handler;

	@ExceptionHandler
	public ResponseEntity<Map<String, Object>> handler(Exception e) {
		return handler.fail(e.getMessage(), HttpStatus.OK);
	}

	// CREATE
	@PostMapping("/api/card")
	@ApiOperation("card 신규 생성, cardlist_id 필수, 권한에 따라 비공개 설정이 기본일 경우 true를 주어야 함")
	public ResponseEntity<Map<String, Object>> insert(@RequestBody Card card) {
		service.insertCard(card);
		int card_id = service.getMaxCardId();
		return handler.success(card_id);
	}

	// READ
	@GetMapping("/api/card/{card_id}")
	@ApiOperation("카드 하나를 조회하는 기능")
	public ResponseEntity<Map<String, Object>> search(@PathVariable int card_id) {
		return handler.success(service.search(card_id));
	}

	// UPDATE
	@PutMapping("/api/card")
	@ApiOperation("card 정보 수정, 수정이 가능한 정보는 name, contents, secret, cardlist_id 네가지입니다")
	public ResponseEntity<Map<String, Object>> update(@RequestBody Card card) {
		service.updateCard(card);
		return handler.success("수정 완료");
	}

	@PatchMapping("/api/card/{card_id}/to/{cardlist_id}")
	@ApiOperation("card를 이동할 때 카드의 외래키를 바꾸는 api 입니다")
	public ResponseEntity<Map<String, Object>> movecard(@PathVariable int card_id, @PathVariable int cardlist_id) {
		service.movecard(card_id, cardlist_id);
		return handler.success("이동 완료");
	}

	@PostMapping("/api/file/upload/{card_id}")
	@ApiOperation("card에 파일 추가, 파일은 서버의 upload 폴더에 카드번호 + _ + original 파일 이름으로 들어갑니다")
	public ResponseEntity<Map<String, Object>> uploadFile(@PathVariable int card_id, @RequestParam("sourceFile") MultipartFile sourceFile) throws IOException {
		String sourceFileName = sourceFile.getOriginalFilename();
//		System.out.println(sourceFileName);
//        String sourceFileNameExtension = FilenameUtils.getExtension(sourceFileName).toLowerCase();

		String storedFileName = service.getFileName(card_id);
		if (storedFileName != null) {
			File file = new File("/home/ubuntu/upload/" + storedFileName);
			if (file.exists()) {
				if (file.delete()) {
					System.out.println("기존 파일 삭제 성공");
				} else {
					System.out.println("기존 파일 삭제 실패");
				}
			} else {
				System.out.println("기존 파일이 존재하지 않습니다.");
			}
		}

		File destinationFile;
		String destinationFileName;
		do {
			destinationFileName = card_id + "_" + sourceFileName;
			destinationFile = new File("/home/ubuntu/upload/" + destinationFileName);
			System.out.println(destinationFile);
//            destinationFile = new File("C:/uploads/" + destinationFileName);
		} while (destinationFile.exists());
		destinationFile.getParentFile().mkdirs();
		sourceFile.transferTo(destinationFile);

		service.uploadFile(card_id, destinationFileName);

		ResponseCardAttachmentFileUpload response = new ResponseCardAttachmentFileUpload();
		response.setFileName(sourceFile.getOriginalFilename());
		response.setFileSize(sourceFile.getSize());
		response.setFileContentType(sourceFile.getContentType());
		return handler.success(response);
	}

	@GetMapping("/api/file/download/{card_id}")
	@ApiOperation("카드에 첨부된 파일 다운로드")
	public ResponseEntity<Map<String, Object>> downloadFile(@PathVariable int card_id, HttpServletResponse response) throws Exception {

		// 카드 번호에 저장된 파일 이름을 불러온다
		String storedFileName = service.getFileName(card_id);
		byte fileByte[] = FileUtils.readFileToByteArray(new File("/home/ubuntu/upload/" + storedFileName));

		response.setContentType("application/octet-stream");
		response.setContentLength(fileByte.length);
		response.setHeader("Content-Disposition", "attachment; fileName=\"" + URLEncoder.encode(storedFileName.split("_")[1], "UTF-8") + "\";");
		response.setHeader("Content-Transfer-Encoding", "binary");
		response.getOutputStream().write(fileByte);
		response.getOutputStream().flush();
		response.getOutputStream().close();

		return handler.success("파일 다운로드 완료 테스트");
	}

	@NoArgsConstructor
	@Data
	private static class ResponseCardAttachmentFileUpload {
		private String fileName;
		private String fileContentType;
		private long fileSize;
	}

	// DELETE
	@DeleteMapping("/api/card/{card_id}")
	@ApiOperation("card 정보 전체 삭제")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable int card_id) {

		String storedFileName = service.getFileName(card_id);
		if (storedFileName != null) {
			File file = new File("/home/ubuntu/upload/" + storedFileName);
			if (file.exists()) {
				if (file.delete()) {
					System.out.println("기존 파일 삭제 성공");
				} else {
					System.out.println("기존 파일 삭제 실패");
				}
			} else {
				System.out.println("기존 파일이 존재하지 않습니다.");
			}
		}

		service.deleteCard(card_id);
		return handler.success("삭제 완료");
	}

	@DeleteMapping("/api/file/delete/{card_id}")
	@ApiOperation("card 첨부 파일만 삭제")
	public ResponseEntity<Map<String, Object>> deleteFile(@PathVariable int card_id) {

		String storedFileName = service.getFileName(card_id);
		if (storedFileName != null) {
			File file = new File("/home/ubuntu/upload/" + storedFileName);
			if (file.exists()) {
				if (file.delete()) {
					System.out.println("기존 파일 삭제 성공");
				} else {
					System.out.println("기존 파일 삭제 실패");
				}
			} else {
				System.out.println("기존 파일이 존재하지 않습니다.");
			}
		}

		service.deleteFile(card_id);
		return handler.success("삭제 완료");
	}

	// 기타 기능

	@GetMapping("/api/card/daily/public/{mem_id}/from/{from}/to/{to}")
	@ApiOperation("사용자 아이디를 통해 날짜별로 공개된 카드의 개수를 구하는 기능, 날짜가 board_date, 개수가 board_id로 출력됩니다.")
	public ResponseEntity<Map<String, Object>> countPublicDailyCard(@PathVariable String mem_id, @PathVariable String from, @PathVariable String to) {
		return handler.success(service.countPublicDailyCard(mem_id, from, to));
	}

	@GetMapping("/api/card/daily/private/{mem_id}/from/{from}/to/{to}")
	@ApiOperation("사용자 아이디를 통해 날짜별로 전체(비공개 포함) 카드의 개수를 구하는 기능, 날짜가 board_date, 개수가 board_id로 출력됩니다.")
	public ResponseEntity<Map<String, Object>> countAllDailyCard(@PathVariable String mem_id, @PathVariable String from, @PathVariable String to) {
		return handler.success(service.countAllDailyCard(mem_id, from, to));
	}
//
//	@GetMapping("/api/search/public/card/{mem_id}/by/{keyword}")
//	@ApiOperation("A유저가 B유저를 검색) 특정문자열을 card title, desc 에서 포함여부를 찾아서 card 배열 반환하는 쿼리문")
//	public ResponseEntity<Map<String, Object>> searchPublicCard(@PathVariable String mem_id, @PathVariable String keyword) {
//		return handler.success(service.searchPublicCard(mem_id, keyword));
//	}
//
//	@GetMapping("/api/search/private/card/{mem_id}/by/{keyword}")
//	@ApiOperation("A유저가 A유저를 검색) 특정문자열을 card title, desc 에서 포함여부를 찾아서 card 배열 반환하는 쿼리문")
//	public ResponseEntity<Map<String, Object>> searchPrivateCard(@PathVariable String mem_id, @PathVariable String keyword) {
//		return handler.success(service.searchPrivateCard(mem_id, keyword));
//	}
//
//	@GetMapping("/api/search/global/card/by/{keyword}")
//	@ApiOperation("키워드로 카드 전체 검색) 특정문자열을 card title, desc 에서 포함여부를 찾아서 card 배열 반환하는 쿼리문")
//	public ResponseEntity<Map<String, Object>> searchGlobalCard(@PathVariable String keyword) {
//		return handler.success(service.searchGlobalCard(keyword));
//	}

}
