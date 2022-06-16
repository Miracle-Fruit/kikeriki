# ScyllaDB Setup

* Use ```make scylla``` to start the ScyllaDB Cluster

* Use ```docker exec -it scylla-node1 nodetool status <KEYSPACE>``` to check Cluster status

* Use ```docker exec -it scylla-node1 cqlsh``` to enter CQL Shell

### Copy commands:
```
docker cp ./cassandra/startup/data/twitter_combined.txt scylla-node1:twitter_combined.csv

docker cp ./cassandra/startup/data/tweets.csv scylla-node1:tweets.csv
```

```
CREATE KEYSPACE twitter WITH replication = {'class':'NetworkTopologyStrategy', 'replication_factor' : 3};

USE twitter;
```
### Tweets Table
```

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
PRIMARY KEY ((id,author_id),date_time)) WITH compaction = {'class' : 'LeveledCompactionStrategy'};

COPY twitter.tweets (author,content,country,date_time,id,language,latitude,longitude,number_of_likes,number_of_shares, author_id) FROM 'tweets.csv' WITH DELIMITER=',' AND HEADER=TRUE;
```

### User Table
```
CREATE TABLE twitter.user(
user_id bigint,
follower_id bigint,
name text,
PRIMARY KEY(user_id,follower_id)
) WITH compaction = {'class' : 'LeveledCompactionStrategy'};


COPY twitter.user (user_id,follower_id,name) FROM 'twitter_combined.csv' WITH DELIMITER=',' AND HEADER=TRUE;
```