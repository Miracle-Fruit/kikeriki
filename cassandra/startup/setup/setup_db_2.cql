CREATE TABLE twitter.user(
user_id_x int,
follower_id int,
name text,
author text,
content text,
country text,
date_time timestamp,
id text,
language text,
latitude double,
longitude double,
number_of_likes int,
number_of_shares int,
user_id_y int,
PRIMARY KEY((user_id_x,follower_id,id))
) WITH compaction = {'class' : 'LeveledCompactionStrategy'};


CREATE TABLE twitter.user_stats(
user_id bigint,
follower_len counter,
follows_len counter,
tweet_len counter,
PRIMARY KEY(user_id)
) WITH compaction = {'class' : 'LeveledCompactionStrategy'};

COPY twitter.user_stats (user_id,follower_len,follows_len,tweet_len) FROM '/tmp/startup/data/user_stats.txt' WITH DELIMITER=',' AND HEADER=TRUE;
