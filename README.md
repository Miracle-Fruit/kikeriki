# distributed-nosqldb

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/Miracle-Fruit/distributed-nosqldb)

## Ideation

* Neo4j clustering is only avavilable in the enterprise edition (30 day trial available). Documentation for Docker Compose with enterprise edition: https://neo4j.com/docs/operations-manual/current/docker/clustering/
* Alternativley we can use ONgDB: https://www.graphfoundation.org/ongdb/ (a fork from the old Neo4j enterprise edition) or Casandra?

## Run

The Makefile allows to run different setups:

```bash
# Run Neo4j enterprise edition with cluster setup
make neo4j-ent

# Run Neo4j community edition (single instance)
make neo4j-com

# Run Cassandra Cluster with thrre nodes
make cass

```

# Cassandra

Cassandra Cluster with three nodes can be accssed via web interface at http://localhost:3000/

*Note: health checks are not working corrtly at the moment, may be necessary to reboot containers manually!*

![](cassandra-web.png)

```bash
docker cp data/tweets.csv cass1:/tweets.csv
cqlsh
CREATE TABLE twitter.tweetsss(author text, content text, country text, date_time text, id bigint PRIMARY KEY, language text, latitude text, longitude text, number_of_likes text, number_of_shares text);
COPY twitter.tweetsss (author,content,country,date_time,id,language,latitude,longitude,number_of_likes,number_of_shares) FROM 'tweets.csv' WITH DELIMITER=',' AND HEADER=TRUE;
```

ID cannot be imported as number, the following error occours:

```bash
Failed to import 1 rows: ParseError - Failed to parse 5.34896E+17 : invalid literal for int() with base 10: '5.34896E+17',  given up without retries
'builtin_function_or_method' object has no attribute 'error'
```