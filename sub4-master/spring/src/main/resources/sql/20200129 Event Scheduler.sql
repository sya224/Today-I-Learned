# 전체 
# root에서 유저 생성후 
# 유저로 접속하여 진행하기 바랍니다

create user 'ssafy'@'%' identified by 'ssafy';​
grant all privileges on *.* to 'ssafy'@'%';

# DB database 이름은 til 입니다
drop database til;
create database til;
use til;


# 백엔드) member 가입이 이루어질 때 
# insert into board(mem_id, board_date)
# values(mem_id,  now()), (mem_id, 9999-12-31); 이 실행된다.

# 매일 0시 정각에 아무것도 작성되지 않은 어제의 보드가 삭제되고 오늘 날짜의 보드가 새로 생성된다
# mysql procedure 사용

# delete 
# from board
# where 
# board_date = now()-1 and board_lists = null

# insert into board( all_member , board_date )
# values(all _member, now())


# 테스트 문장 

# delete from board where board_date < now() and if(board_lists='', 1, ifnull(board_lists, 1));

# insert into board (mem_id, board_date)
# values('aaa', now());

# update board
# set 
# board_lists = ''
# where board_id = 11;

# select * from board;
	

# Event Scheduler
# procedure

Set @@global.event_scheduler = on;


create event if not exists e1
	on schedule
		every 1 day
        starts '2020-01-30 00:00:00'
    do delete from board where board_date < now() and if(board_lists='', 1, ifnull(board_lists, 1));
	

create event if not exists e2
	on schedule
		every 1 day
		starts '2020-01-30 00:00:01'
	do insert into board(mem_id, board_date)
		select mem_id, now() as board_date
		from mem_option
		where mem_auth < 3;
		

show events;
