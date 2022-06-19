CREATE KEYSPACE twitter WITH replication = {'class':'NetworkTopologyStrategy', 'replication_factor' : 3};

CREATE TABLE twitter.tweets(
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
author_id bigint,
PRIMARY KEY ((author_id), date_time, id)
) WITH compaction = {'class' : 'LeveledCompactionStrategy'};

CREATE TABLE twitter.follower_relation(
user_id int,
follower_id int,
PRIMARY KEY (user_id,follower_id)
) WITH compaction = {'class' : 'LeveledCompactionStrategy'};

COPY twitter.tweets (author,content,country,date_time,id,language,latitude,longitude,number_of_likes,number_of_shares, author_id) FROM '/tmp/startup/data/tweets.csv' WITH DELIMITER=',' AND HEADER=TRUE;
COPY twitter.follower_relation (user_id,follower_id) FROM '/tmp/startup/data/user_follower_relation.csv' WITH DELIMITER=',' AND HEADER=TRUE;
