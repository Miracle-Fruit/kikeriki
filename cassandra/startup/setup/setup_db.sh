# setup keyspace and table
cqlsh -f /tmp/startup/setup/setup_db.cql 172.20.0.6 9042 -u cassandra -p cassandra

# execute some queries
cqlsh -f /tmp/startup/queries/twitter_queries.cql 172.20.0.6 9042 -u cassandra -p cassandra