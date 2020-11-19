CREATE TABLE `follow` (
	`follow_id`	int	NOT NULL primary key auto_increment,
	`mem_from`	varchar(255)	NOT NULL,
	`mem_to`	varchar(255)	NOT NULL
);

ALTER TABLE `follow` 
ADD CONSTRAINT `FK_mem_info_TO_follow_1` 
FOREIGN KEY (`mem_from`)
REFERENCES `mem_info` (`mem_id`)
ON DELETE CASCADE;

ALTER TABLE `follow` 
ADD CONSTRAINT `FK_mem_info_TO_follow_2` 
FOREIGN KEY (`mem_to`)
REFERENCES `mem_info` (`mem_id`)
ON DELETE CASCADE;

CREATE TABLE `heart` (
	`heart_id`	int	NOT NULL primary key auto_increment,
	`mem_id`	varchar(255)	NOT NULL,
	`cardlist_id`	int	NOT NULL
);

ALTER TABLE `heart` 
ADD CONSTRAINT `FK_mem_info_TO_heart_1` 
FOREIGN KEY (`mem_id`)
REFERENCES `mem_info` (`mem_id`)
ON DELETE CASCADE;

ALTER TABLE `heart` 
ADD CONSTRAINT `FK_cardlist_TO_heart_1` 
FOREIGN KEY (`cardlist_id`)
REFERENCES `cardlist` (`cardlist_id`)
ON DELETE CASCADE;



CREATE TABLE `alarm_id` (
	`alarm_id`		int				NOT NULL	primary key auto_increment,
	`mem_id`		varchar(255)	NOT NULL,
	`alarm_text`	varchar(3000)	NULL,
	`alarm_url`		varchar(255)	NULL
);
ALTER TABLE `alarm_id`
ADD CONSTRAINT `FK_mem_info_TO_alarm_id_1` 
FOREIGN KEY (`mem_id`)
REFERENCES `mem_info` (`mem_id`);