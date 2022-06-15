CREATE KEYSPACE twitter WITH replication = {'class':'NetworkTopologyStrategy', 'replication_factor' : 3};

CREATE TYPE twitter.tweet(
content text, 
country text, 
date_time timestamp, 
id text, 
language text, 
latitude text, 
longitude text, 
number_of_likes bigint, 
number_of_shares bigint,
user_id bigint
);

CREATE TABLE twitter.user(
user_id bigint,
follows set<bigint>,
follower set<bigint>,
name text,
tweets set<FROZEN<tweet>>,
PRIMARY KEY(user_id)
) WITH compaction = {'class' : 'LeveledCompactionStrategy'};

COPY twitter.user (user_id,follows,follower,name,tweets) FROM '/tmp/startup/data/twitter_combined_UDTs.txt' WITH DELIMITER='|' AND HEADER=TRUE;
