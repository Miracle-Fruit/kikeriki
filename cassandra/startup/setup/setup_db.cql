CREATE KEYSPACE twitter WITH replication = {'class':'NetworkTopologyStrategy', 'replication_factor' : 3};

CREATE TABLE twitter.tweets(
author text, 
content text, 
country text, 
date_time timestamp, 
id text, 
language text, 
latitude text, 
longitude text, 
number_of_likes text, 
number_of_shares text,
author_id bigint,
PRIMARY KEY ((id),author_id,date_time)) WITH compaction = {'class' : 'LeveledCompactionStrategy'} AND CLUSTERING ORDER BY (number_of_likes ASC);

COPY twitter.tweets (author,content,country,date_time,id,language,latitude,longitude,number_of_likes,number_of_shares, author_id) FROM '/tmp/startup/data/tweets.csv' WITH DELIMITER=',' AND HEADER=TRUE;

CREATE TABLE twitter.user(
user_id bigint,
follows set<bigint>,
follower set<bigint>,
name text,
PRIMARY KEY(user_id)
) WITH compaction = {'class' : 'LeveledCompactionStrategy'} AND CLUSTERING ORDER BY (follower ASC);

COPY twitter.user (user_id,follows,follower,name) FROM '/tmp/startup/data/twitter_combined.txt' WITH DELIMITER=',' AND HEADER=TRUE;
