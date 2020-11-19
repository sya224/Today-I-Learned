
# root에서 유저 생성후 
# 유저로 접속하여 진행하기 바랍니다

# create user 'ssafy'@'%' identified by 'ssafy';​
# grant all privileges on *.* to 'ssafy'@'%';

drop database if exists til;

create database til;

use til;

CREATE TABLE `mem_info` (
	`mem_id`				varchar(255)	NOT NULL		primary key,
	`mem_pw`				varchar(255)	NULL,
	`mem_email`				varchar(255)	NULL,
	`mem_nick`				varchar(255)	NULL,
	`mem_reg_date`			date			NULL,
	`mem_thumb`				text			NULL,
	`mem_color`				varchar(255)	NULL,
	`mem_font`				int				NULL,
	`mem_auth`				int				NULL,
	`mem_post_def_secret`	boolean			NULL,
	`mem_self_intro`		varchar(3000)	DEFAULT 		'자기소개를 입력해주세요'	
);

CREATE TABLE `font` (
	`font_id`				int				NOT NULL		primary key 	auto_increment,
	`font_name`				varchar(255)	NOT NULL
);

CREATE TABLE `cardlist` (
	`cardlist_id`			int				NOT NULL		primary key 	auto_increment,
	`board_id`				int				NOT NULL,
	`cardlist_name`			varchar(255)	NULL,
	`cardlist_cards`		varchar(3000)	NULL,
	`cardlist_secret`		boolean			NULL,
	`cardlist_heart`		int				NULL,
	`cardlist_color`		varchar(255)	NULL
);

CREATE TABLE `card` (
	`card_id`				int				NOT NULL 		primary key 	auto_increment,
	`cardlist_id`			int				NOT NULL,
	`card_name`				varchar(255)	NULL,
	`card_contents`			longtext		NULL,
	`card_secret`			boolean			NULL,
	`card_upload`			varchar(255)	NULL
);

CREATE TABLE `comment` (
	`comment_id`			int				NOT NULL 		primary key		auto_increment,
	`cardlist_id`			int				NOT NULL,
	`mem_id`				varchar(255)	NOT NULL,
	`comment_time`			datetime		NULL,
	`comment_contents`		text			NULL,
	`comment_modified`		boolean			DEFAULT			false,
	`comment_modified_time` datetime		NULL,
	`comment_deleted`		boolean			DEFAULT			false,
	`comment_secret`		boolean			DEFAULT			false,
	`comment_reply` 		int				DEFAULT			0
);

CREATE TABLE `tag` (
	`tag_id`				int				NOT NULL		primary key		auto_increment,
	`tag_name`				varchar(255)	NULL
);

CREATE TABLE `cardlist_tag` (
	`cardlist_tag_id`		int				NOT NULL 		primary key		auto_increment,
	`tag_id`				int				NOT NULL,
	`cardlist_id`			int				NOT NULL
);

CREATE TABLE `board` (
	`board_id`				int				NOT NULL		primary key		auto_increment,
	`mem_id`				varchar(255)	NOT NULL,
	`board_date`			date			NULL,
	`board_lists`			varchar(3000)	NULL
);

CREATE TABLE `sns` (
	`id`					int				NOT NULL		primary key		auto_increment,
	`mem_id`				varchar(255)	NOT NULL,
	`sns_nid`				int				NULL,
	`mem_email`				varchar(255)	NULL,
	`access_token`			varchar(255)	NULL,
	`provider`				varchar(255)	NULL
);

CREATE TABLE `confirm_email` (
	`id`					int				NOT NULL		primary key		auto_increment,
	`mem_id`				varchar(255)	NOT NULL,
	`email_auth`			boolean			NULL,
	`email_key`				varchar(255)	NULL
);



ALTER TABLE `cardlist` 
ADD CONSTRAINT `FK_board_TO_cardlist_1` 
FOREIGN KEY (`board_id`)
REFERENCES `board` (`board_id`)
ON DELETE CASCADE;

ALTER TABLE `card` 
ADD CONSTRAINT `FK_cardlist_TO_card_1` 
FOREIGN KEY (`cardlist_id`)
REFERENCES `cardlist` (`cardlist_id`)
ON DELETE CASCADE;

ALTER TABLE `comment` 
ADD CONSTRAINT `FK_cardlist_TO_comment_1` 
FOREIGN KEY (`cardlist_id`)
REFERENCES `cardlist` (`cardlist_id`)
ON DELETE CASCADE;

ALTER TABLE `cardlist_tag` 
ADD CONSTRAINT `FK_tag_TO_cardlist_tag_1` 
FOREIGN KEY (`tag_id`)
REFERENCES `tag` (`tag_id`)
ON DELETE CASCADE;

ALTER TABLE `cardlist_tag`
ADD CONSTRAINT `FK_cardlist_TO_cardlist_tag_1` 
FOREIGN KEY (`cardlist_id`)
REFERENCES `cardlist` (`cardlist_id`)
ON DELETE CASCADE;

ALTER TABLE `board`
ADD CONSTRAINT `FK_mem_info_TO_board_1` 
FOREIGN KEY (`mem_id`)
REFERENCES `mem_info` (`mem_id`);

ALTER TABLE `sns` 
ADD CONSTRAINT `FK_mem_info_TO_sns_1` 
FOREIGN KEY (`mem_id`)
REFERENCES `mem_info` (`mem_id`);

ALTER TABLE `confirm_email` 
ADD CONSTRAINT `FK_mem_info_TO_confirm_email_1` 
FOREIGN KEY (`mem_id`)
REFERENCES `mem_info` (`mem_id`);

