CREATE KEYSPACE twitter WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};

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
PRIMARY KEY ((id),author,date_time));

COPY twitter.tweets (author,content,country,date_time,id,language,latitude,longitude,number_of_likes,number_of_shares) FROM '/tmp/startup/data/tweets.csv' WITH DELIMITER=',' AND HEADER=TRUE;