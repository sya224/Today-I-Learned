
-- mysql 설치 후 mysqld.cnf 파일 변경
-- default charset utf8
drop database if exists til;
create database til;
use til;

CREATE TABLE `mem_info` (
	`mem_id`	varchar(30)	NOT NULL primary key,
	`mem_pw`	varchar(255)	NULL,
	`mem_email`	varchar(100)	NOT NULL,
	`mem_nick`	varchar(30)	NULL,
	`mem_reg_date`	date	NULL
);

CREATE TABLE `mem_option` (
	`mem_id`	varchar(30)	NOT NULL,
	`mem_auth`	boolean	NULL,
	`mem_post_def`	boolean	NULL,
	`mem_secret`	boolean	NULL
);

CREATE TABLE `cardlist` (
	`cardlist_id`	int	NOT NULL primary key auto_increment,
	`cardlist_name`	varchar(50)	NULL,
	`cardlist_cards`	varchar(255)	NULL
);

alter table `cardlist` 
add column `board_id` INT NOT NULL AFTER `cardlist_id`;

ALTER TABLE `cardlist` ADD CONSTRAINT `FK_board_TO_cardlist_1` FOREIGN KEY (
	`board_id`
)
REFERENCES `board` (
	`board_id`
);


CREATE TABLE `card` (
	`card_id`	int	NOT NULL primary key auto_increment,
	`card_name`	varchar(50)	NULL,
	`card_contents`	text	NULL,
	`card_secret`	boolean	NULL
);


alter table `card` 
add column `cardlist_id` INT NOT NULL AFTER `card_id`;

ALTER TABLE `card` ADD CONSTRAINT `FK_cardlist_TO_card_1` FOREIGN KEY (
	`cardlist_id`
)
REFERENCES `cardlist` (
	`cardlist_id`
);

CREATE TABLE `comment` (
	`comment_id`	int	NOT NULL primary key auto_increment,
	`mem_id`	varchar(30)	NOT NULL,
	`cardlist_id`	int	NOT NULL,
	`comment_author`	varchar(30)	NULL,
	`comment_time`	datetime	NULL,
	`comment_contents`	text	NULL,
	`comment_modified`	boolean	NULL,
	`comment_deleted`	boolean	NULL
);

CREATE TABLE `tag` (
	`tag_id`	int	NOT NULL primary key auto_increment,
	`tag_name`	varchar(255)	NULL
);

CREATE TABLE `card_tag` (
	`card_tag_id`	int	NOT NULL primary key auto_increment,
	`card_id`	int	NOT NULL,
	`tag_id`	int	NOT NULL
);

CREATE TABLE `board` (
	`board_id`	int	NOT NULL primary key auto_increment,
	`mem_id`	varchar(30)	NOT NULL,
	`board_type`	varchar(20)	NULL,
	`board_date`	datetime	NULL,
	`board_lists`	varchar(255)	NULL
);

ALTER TABLE `til`.`board` 
CHANGE COLUMN `board_date` `board_date` DATE NULL DEFAULT NULL ;


ALTER TABLE `mem_option` ADD CONSTRAINT `FK_mem_info_TO_mem_option_1` FOREIGN KEY (
	`mem_id`
)
REFERENCES `mem_info` (
	`mem_id`
);

ALTER TABLE `comment` ADD CONSTRAINT `FK_mem_info_TO_comment_1` FOREIGN KEY (
	`mem_id`
)
REFERENCES `mem_info` (
	`mem_id`
);

ALTER TABLE `comment` ADD CONSTRAINT `FK_cardlist_TO_comment_1` FOREIGN KEY (
	`cardlist_id`
)
REFERENCES `cardlist` (
	`cardlist_id`
);

ALTER TABLE `card_tag` ADD CONSTRAINT `FK_card_TO_card_tag_1` FOREIGN KEY (
	`card_id`
)
REFERENCES `card` (
	`card_id`
);

ALTER TABLE `card_tag` ADD CONSTRAINT `FK_tag_TO_card_tag_1` FOREIGN KEY (
	`tag_id`
)
REFERENCES `tag` (
	`tag_id`
);

ALTER TABLE `board` ADD CONSTRAINT `FK_mem_info_TO_board_1` FOREIGN KEY (
	`mem_id`
)
REFERENCES `mem_info` (
	`mem_id`
);
