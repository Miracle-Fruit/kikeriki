CREATE TABLE twitter.user(
user_id bigint,
follows set<bigint>,
follower set<bigint>,
name text,
tweet_ids set<text>,
PRIMARY KEY(user_id)
) WITH compaction = {'class' : 'LeveledCompactionStrategy'};

COPY twitter.user (user_id,follows,follower,name,tweet_ids) FROM '/tmp/startup/data/twitter_combined.txt' WITH DELIMITER=',' AND HEADER=TRUE;