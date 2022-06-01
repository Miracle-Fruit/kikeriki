CREATE KEYSPACE twitter WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};

CREATE TABLE twitter.tweets1(author text, 
content text, 
country text, 
date_time text, 
id text PRIMARY KEY, 
language text, 
latitude text, 
longitude text, 
number_of_likes text, 
number_of_shares text);

COPY twitter.tweets (author,content,country,date_time,id,language,latitude,longitude,number_of_likes,number_of_shares) FROM 'tweets.csv' WITH DELIMITER=',' AND HEADER=TRUE;