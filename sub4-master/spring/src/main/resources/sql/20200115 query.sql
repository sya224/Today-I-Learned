-- 20200115 mysql 설치 후 환경설정 

-- 1. root 에서 유저 생성

-- 프로그램 설치시에 ssafy 계정 생성하신 분은 주석 처리 바랍니다.

create user 'ssafy'@'%' identified by 'ssafy';

grant all privileges on *.* to 'ssafy'@'%';

-- 2. ssafy 로 접속

create database project;

use project;

-- 3. 테이블 생성 

-- https://www.erdcloud.com/d/dH7iYqxNrRuj3TZCh

-- export mysql sql

CREATE TABLE `member` (
	`user_id`	varchar(255)	NOT NULL	COMMENT '중복체크를 위해 Pk',
	`email`	varchar(255)	NULL	COMMENT '중복체크를 위해 유니크',
	`password`	varchar(255)	NULL	COMMENT '공백, 정규문, 쿼리 등은 프론트에서 체크',
	`nickname`	varchar(30)	NULL	COMMENT '이메일 아이디는 노출x 닉네임을 외부로',
	`reg_date`	date	NULL	COMMENT '가입날짜'
);

CREATE TABLE `task` (
	`task_id`	int	NOT NULL,
	`list_id`	int	NOT NULL	COMMENT 'list_id',
	`task_title`	varchar(255)	NULL,
	`task_desc`	text	NULL,
	`task_date`	date	NULL
);

CREATE TABLE `list` (
	`list_id`	int	NOT NULL,
	`user_id`	varchar(255)	NOT NULL	COMMENT '중복체크를 위해 Pk',
	`list_title`	varchar(255)	NOT NULL,
	`list_property`	varchar(255)	NULL	COMMENT '일(day) / 테스크 그룹'
);

CREATE TABLE `tag` (
	`tag_id`	int	NOT NULL	COMMENT '태그이름이 아닌 숫자로 관리',
	`tag_name`	varchar(255)	NULL
);

CREATE TABLE `task_tag` (
	`task_tag_id`	int	NOT NULL	COMMENT 'PK',
	`tag_id`	int	NOT NULL	COMMENT '태그이름이 아닌 숫자로 관리',
	`task_id`	int	NOT NULL
);

CREATE TABLE `user_tag` (
	`user_tag_id`	int	NOT NULL	COMMENT '태그이름이 아닌 숫자로 관리',
	`tag_id`	int	NOT NULL	COMMENT '태그이름이 아닌 숫자로 관리',
	`user_id`	varchar(255)	NOT NULL	COMMENT '중복체크를 위해 Pk',
	`user_tag_count`	int	NULL	COMMENT '유저별 총 테그 개수'
);

CREATE TABLE `comment` (
	`comment_id`	int	NOT NULL	COMMENT '댓글PK',
	`list_id`	int	NOT NULL,
	`user_id`	varchar(255)	NOT NULL	COMMENT '중복체크를 위해 Pk',
	`comment_text`	text	NOT NULL	COMMENT '댓글 내용',
	`comment_date`	date	NOT NULL	COMMENT '시간'
);

ALTER TABLE `member` ADD CONSTRAINT `PK_MEMBER` PRIMARY KEY (
	`user_id`
);

ALTER TABLE `task` ADD CONSTRAINT `PK_TASK` PRIMARY KEY (
	`task_id`,
	`list_id`
);

ALTER TABLE `list` ADD CONSTRAINT `PK_LIST` PRIMARY KEY (
	`list_id`,
	`user_id`
);

ALTER TABLE `tag` ADD CONSTRAINT `PK_TAG` PRIMARY KEY (
	`tag_id`
);

ALTER TABLE `task_tag` ADD CONSTRAINT `PK_TASK_TAG` PRIMARY KEY (
	`task_tag_id`,
	`tag_id`,
	`task_id`
);

ALTER TABLE `user_tag` ADD CONSTRAINT `PK_USER_TAG` PRIMARY KEY (
	`user_tag_id`,
	`tag_id`,
	`user_id`
);

ALTER TABLE `comment` ADD CONSTRAINT `PK_COMMENT` PRIMARY KEY (
	`comment_id`,
	`list_id`,
	`user_id`
);

ALTER TABLE `task` ADD CONSTRAINT `FK_list_TO_task_1` FOREIGN KEY (
	`list_id`
)
REFERENCES `list` (
	`list_id`
);

ALTER TABLE `list` ADD CONSTRAINT `FK_member_TO_list_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `member` (
	`user_id`
);

ALTER TABLE `task_tag` ADD CONSTRAINT `FK_tag_TO_task_tag_1` FOREIGN KEY (
	`tag_id`
)
REFERENCES `tag` (
	`tag_id`
);

ALTER TABLE `task_tag` ADD CONSTRAINT `FK_task_TO_task_tag_1` FOREIGN KEY (
	`task_id`
)
REFERENCES `task` (
	`task_id`
);

ALTER TABLE `user_tag` ADD CONSTRAINT `FK_tag_TO_user_tag_1` FOREIGN KEY (
	`tag_id`
)
REFERENCES `tag` (
	`tag_id`
);

ALTER TABLE `user_tag` ADD CONSTRAINT `FK_member_TO_user_tag_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `member` (
	`user_id`
);

ALTER TABLE `comment` ADD CONSTRAINT `FK_list_TO_comment_1` FOREIGN KEY (
	`list_id`
)
REFERENCES `list` (
	`list_id`
);

ALTER TABLE `comment` ADD CONSTRAINT `FK_member_TO_comment_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `member` (
	`user_id`
);



select * from member;

-- 4. 테스트 데이터 입력

insert into member(user_id, email, password, nickname, reg_date)
values ('ssafy', 'ssafy@ssafy.com', 'ssafy', 'ssafy', now());

insert into member(user_id, email, password, nickname, reg_date)
values ('test', 'test@test.com', 'test', 'test', now());


