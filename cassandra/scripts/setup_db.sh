#!/usr/bin/env bash

# copy data to docker container
docker cp data/tweets.csv cass1:/tweets.csv

# setup keyspace and table
docker exec -it cass1 cqlsh -f /cassandra/scripts/setup_db.cql

# execute some queries
docker exec -it cass1 cqlsh -f /cassandra/scripts/queries/twitter_queries.cql