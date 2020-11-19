create database til;

use til;

CREATE TABLE `mem_info` (
	`mem_id`	varchar(30)	NOT NULL primary key,
	`mem_pw`	varchar(255)	NOT NULL,
	`mem_email`	varchar(100)	NOT NULL UNIQUE,
	`mem_nick`	varchar(30)	NULL UNIQUE,
	`mem_reg_date`	date	NULL
);

CREATE TABLE `mem_option` (
	`mem_id`	varchar(30)	NOT NULL,
	`mem_auth`	tinyint(1)	NOT NULL,
	`mem_post_def_secret`	boolean	NOT NULL
);

CREATE TABLE `cardlist` (
	`cardlist_id`	int	NOT NULL primary key auto_increment,
	`board_id`	int	NOT NULL,
	`cardlist_name`	varchar(50)	NULL,
	`cardlist_cards`	varchar(3000)	NULL,
	`cardlist_secret`	boolean	NULL,
	`cardlist_heart`	int	NULL
);

CREATE TABLE `card` (
	`card_id`	int	NOT NULL primary key auto_increment,
	`cardlist_id`	int	NOT NULL,
	`card_name`	varchar(50)	NULL,
	`card_contents`	text	NULL,
	`card_secret`	boolean	NULL
);

CREATE TABLE `comment` (
	`comment_id`	int	NOT NULL primary key auto_increment,
	`mem_id`	varchar(30)	NOT NULL,
	`cardlist_id`	int	NOT NULL,
	`comment_time`	datetime	NULL,
	`comment_contents`	text	NULL,
	`comment_modified`	boolean	NULL,
	`comment_deleted`	boolean	NULL,
	`comment_secret`	boolean	NULL
);

CREATE TABLE `tag` (
	`tag_id`	int	NOT NULL primary key auto_increment,
	`tag_name`	varchar(255)	NULL
);

CREATE TABLE `cardlist_tag` (
	`cardlist_tag_id`	int	NOT NULL primary key auto_increment,
	`tag_id`	int	NOT NULL,
	`cardlist_id`	int	NOT NULL
);

CREATE TABLE `board` (
	`board_id`	int	NOT NULL primary key auto_increment,
	`mem_id`	varchar(30)	NOT NULL,
	`board_date`	date	NULL,
	`board_lists`	varchar(3000)	NULL
);


ALTER TABLE `mem_option` ADD CONSTRAINT `FK_mem_info_TO_mem_option_1` FOREIGN KEY (
	`mem_id`
)
REFERENCES `mem_info` (
	`mem_id`
)on delete cascade on update cascade;

ALTER TABLE `cardlist` ADD CONSTRAINT `FK_board_TO_cardlist_1` FOREIGN KEY (
	`board_id`
)
REFERENCES `board` (
	`board_id`
)on delete cascade on update cascade;

ALTER TABLE `card` ADD CONSTRAINT `FK_cardlist_TO_card_1` FOREIGN KEY (
	`cardlist_id`
)
REFERENCES `cardlist` (
	`cardlist_id`
)on delete cascade on update cascade;

ALTER TABLE `comment` ADD CONSTRAINT `FK_mem_info_TO_comment_1` FOREIGN KEY (
	`mem_id`
)
REFERENCES `mem_info` (
	`mem_id`
)on delete cascade on update cascade;

ALTER TABLE `comment` ADD CONSTRAINT `FK_cardlist_TO_comment_1` FOREIGN KEY (
	`cardlist_id`
)
REFERENCES `cardlist` (
	`cardlist_id`
)on delete cascade on update cascade;

ALTER TABLE `cardlist_tag` ADD CONSTRAINT `FK_tag_TO_cardlist_tag_1` FOREIGN KEY (
	`tag_id`
)
REFERENCES `tag` (
	`tag_id`
)on delete cascade on update cascade;

ALTER TABLE `cardlist_tag` ADD CONSTRAINT `FK_cardlist_TO_cardlist_tag_1` FOREIGN KEY (
	`cardlist_id`
)
REFERENCES `cardlist` (
	`cardlist_id`
)on delete cascade on update cascade;

ALTER TABLE `board` ADD CONSTRAINT `FK_mem_info_TO_board_1` FOREIGN KEY (
	`mem_id`
)
REFERENCES `mem_info` (
	`mem_id`
)on delete cascade on update cascade;

