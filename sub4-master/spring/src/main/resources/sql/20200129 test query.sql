# 테스트 계정 생성

insert into mem_info(mem_id, mem_pw, mem_email, mem_nick, mem_reg_date)
values 
('admin', 'admin', 'admin@admin.com', 'admin', now()),
('test', 'test', 'test@test.com', 'test', now()),
('ssafy','ssafy','ssafy@ssafy.com','ssafy',now()),
('aaa','aaa','aaa@aaa.com','aaa',now());

select * from mem_info;


# 계정 강제 삭제시 사용

# SET FOREIGN_KEY_CHECKS = 0;
# truncate mem_info;
# SET FOREIGN_KEY_CHECKS = 1;


# 관리기능1) 회원가입시 회원 권한이 자동으로 부여된다
insert into mem_option(mem_id, mem_auth, mem_post_def_secret)
values
('admin', 0, true), -- admin 계정은 글 발행이 가능하고 운영자 계정이며 기본 카드리스트 설정은 비공개이다.
('test', 1, true), -- test 계정은 글 발행이 가능하고 일반회원이며 기본 카드리스트 설정은 비공개이다.
('ssafy', 1, false), -- ssafy 계정은 글 발행이 가능하고 카드리스트 생성시 기본적으로 공개로 설정된다.
('aaa', 2, true); -- aaa 계정은 글 쓰기가 불가능하고 삭제와 비공개만 각 글에서 버튼을 눌러 사용가능하다.


select * from mem_option;

# test member 의 board 가 자동으로 생성

insert into board(mem_id, board_date)
values
('admin',  now()), ('admin', '9999-12-31'),
('test',  now()), ('test', '9999-12-31'),
('ssafy',  now()), ('ssafy', '9999-12-31'),
('aaa',  now()), ('aaa', '9999-12-31');

select * from board;


# test 멤버의 cardlist 생성 

insert into cardlist(board_id, cardlist_name, cardlist_secret)
values
(1, 'admin의 오늘 날짜 보드', true),
(2, 'admin의 todo  보드', true),
(3, 'test의 오늘 날짜 보드', true),
(4, 'test의 todo  보드', true),
(5, 'ssafy의 오늘 날짜 보드', true),
(6, 'ssafy의 todo  보드', true),
(7, 'aaa의 오늘 날짜 보드', true),
(8, 'aaa의 todo  보드', true);

select * from cardlist;

update board
set
board_lists = '[1]'
where board_id = 1;
update board
set
board_lists = '[2]'
where board_id = 2;
update board
set
board_lists = '[3]'
where board_id = 3;
update board
set
board_lists = '[4]'
where board_id = 4;
update board
set
board_lists = '[5]'
where board_id = 5;
update board
set
board_lists = '[6]'
where board_id = 6;
update board
set
board_lists = '[7]'
where board_id = 7;
update board
set
board_lists = '[8]'
where board_id = 8;

select * from board;

# test 멤버의 cardlist에 카드를 추가  

insert into card(cardlist_id, card_name, card_contents, card_secret)
values
(1, '카드 1번', '내용 1번', true),
(2, '카드 2번', '내용 2번', true),
(3, '카드 3번', '내용 3번', true),
(4, '카드 4번', '내용 4번', true),
(5, '카드 5번', '내용 5번', true),
(6, '카드 6번', '내용 6번', true),
(7, '카드 7번', '내용 7번', true),
(8, '카드 8번', '내용 8번', true);

update cardlist
set 
cardlist_cards = '[1]'
where cardlist_id = 1;
update cardlist
set 
cardlist_cards = '[2]'
where cardlist_id = 2;
update cardlist
set 
cardlist_cards = '[3]'
where cardlist_id = 3;
update cardlist
set 
cardlist_cards = '[4]'
where cardlist_id = 4;
update cardlist
set 
cardlist_cards = '[5]'
where cardlist_id = 5;
update cardlist
set 
cardlist_cards = '[6]'
where cardlist_id = 6;
update cardlist
set 
cardlist_cards = '[7]'
where cardlist_id = 7;
update cardlist
set 
cardlist_cards = '[8]'
where cardlist_id = 8;


select * from cardlist;

select * from card;



# 태그 추가

# 카드에서 tag 입력시 태그 테이블에 존재하는 지 확인한 뒤 
# 그 태그가 존재하지 않는다면 새로 생성 
# insert into tag(tag_id (auto_increment), tag_name)

insert into tag(tag_id, tag_name)
values(1, "mysql"), (2, "spring"), (3, "react"), (4, "aws");

select * from tag;

# 카드리스트 태그 추가

insert into cardlist_tag(cardlist_id, tag_id)
values
(1,1), (1,2), (1,3), (1,4),
(2,1), (2,2), (2,3), (2,4),
(3,1), (3,2), (3,3), (3,4),
(4,1), (4,2), (4,3), (4,4),
(5,1), (5,2), (5,3), (5,4),
(6,1), (6,2), (6,3), (6,4),
(7,1), (7,2), (7,3), (7,4),
(8,1), (8,2), (8,3), (8,4);

select * from cardlist_tag;



# 댓글 추가

# comment_id 는 auto increment, comment_time은 최종 수정 시간으로, 수정 로그는 나중에 추가 테이블을 만들어 작업할 것
#  modified가 true 이면 front에서 '수정됨' 표시를 해주고 deleted = true 일 경우, 삭제된 코멘트라는 표시를 띄워줄것
insert into comment(mem_id, cardlist_id, comment_time, comment_contents, comment_modified, comment_deleted, comment_secret)
values
("admin", 1, now(), "댓글 1번 테스트입니다",  false, false, false),
("admin", 2, now(), "댓글 2번 테스트입니다",  false, false, false),
("admin", 3, now(), "댓글 3번 테스트입니다",  false, false, false),
("admin", 4, now(), "댓글 4번 테스트입니다",  false, false, false),
("admin", 5, now(), "댓글 5번 테스트입니다",  false, false, false),
("admin", 6, now(), "댓글 6번 테스트입니다",  false, false, false),
("admin", 7, now(), "댓글 7번 테스트입니다",  false, false, false),
("admin", 8, now(), "댓글 8번 테스트입니다",  false, false, false),
("test", 1, now(), "댓글 9번 테스트입니다",  false, false, false),
("test", 2, now(), "댓글 10번 테스트입니다",  false, false, false),
("test", 3, now(), "댓글 11번 테스트입니다",  false, false, false),
("test", 4, now(), "댓글 12번 테스트입니다",  false, false, false),
("test", 5, now(), "댓글 13번 테스트입니다",  false, false, false),
("test", 6, now(), "댓글 14번 테스트입니다",  false, false, false),
("test", 7, now(), "댓글 15번 테스트입니다",  false, false, false),
("test", 8, now(), "댓글 16번 테스트입니다",  false, false, false),
("ssafy", 1, now(), "댓글 17번 테스트입니다",  false, false, false),
("ssafy", 2, now(), "댓글 18번 테스트입니다",  false, false, false),
("ssafy", 3, now(), "댓글 19번 테스트입니다",  false, false, false),
("ssafy", 4, now(), "댓글 20번 테스트입니다",  false, false, false),
("ssafy", 5, now(), "댓글 21번 테스트입니다",  false, false, false),
("ssafy", 6, now(), "댓글 22번 테스트입니다",  false, false, false),
("ssafy", 7, now(), "댓글 23번 테스트입니다",  false, false, false),
("ssafy", 8, now(), "댓글 24번 테스트입니다",  false, false, false),
("aaa", 1, now(), "댓글 25번 테스트입니다",  false, false, false),
("aaa", 2, now(), "댓글 26번 테스트입니다",  false, false, false),
("aaa", 3, now(), "댓글 27번 테스트입니다",  false, false, false),
("aaa", 4, now(), "댓글 28번 테스트입니다",  false, false, false),
("aaa", 5, now(), "댓글 29번 테스트입니다",  false, false, false),
("aaa", 6, now(), "댓글 30번 테스트입니다",  false, false, false),
("aaa", 7, now(), "댓글 31번 테스트입니다",  false, false, false),
("aaa", 8, now(), "댓글 32번 테스트입니다",  false, false, false);

select * from comment;

