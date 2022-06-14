CREATE TABLE twitter.user(
user_id bigint,
follower_id bigint,
name text,
PRIMARY KEY(user_id,follower_id)
) WITH compaction = {'class' : 'LeveledCompactionStrategy'};

COPY twitter.user (user_id,follower_id,name) FROM '/tmp/startup/data/twitter_combined.txt' WITH DELIMITER=',' AND HEADER=TRUE;