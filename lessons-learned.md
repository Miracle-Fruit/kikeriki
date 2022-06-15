# Lessons Learned

Lessons learned from installing Cassandra DB with Docker Compose to run a social network which loads data from Twitter.

## Infrastructure

* Neo4j community version does not support clustering and further Neo4j enterprise is complex to setup in docker, still we were able to make it run but didn't end up using it and instead using Cassandra.
* Single Cassandra Docker container need a long time to startup and load the configuration (depending on the host system), to make sure it runs everywhere without crashing we implemented a health check in Docker Compose, this was not very easy as we had to determine the right parameters through trial and error. Additionally the containers have a restart always policy in case the crash.
```yaml
healthcheck:
        test: ["CMD", "cqlsh", "-e", "describe keyspaces" ]
        interval: 10s
        timeout: 10s
        start_period: 50s
        retries: 10
```
* Cassandra dos not offer a web interface but luckily the open source community implemented one called [cassandra-web](https://github.com/avalanche123/cassandra-web). Cassandra web requires IPs to be set static as it tries to connect to them and does not work with Docker DNS.
  * cassandra-web requires an older Ruby version (a version > 3 causes problems).
* Cassandra requires a certain [configuration](https://cassandra.apache.org/doc/latest/cassandra/getting_started/configuring.html) to work, this configuration can be set using environment variables and configuration files. The following information is required and can be set as environment variables in Docker Compose:
  * CASSANDRA_SEEDS: "cass1,cass2"
  * CASSANDRA_CLUSTER_NAME: SolarSystem
  * CASSANDRA_DC: Mars
  * CASSANDRA_RACK: West
  * CASSANDRA_ENDPOINT_SNITCH: GossipingPropertyFileSnitch
  * CASSANDRA_NUM_TOKENS: 128
  * In our case we additionally set the following parameters to not overload the system:
    *  MAX_HEAP_SIZE: 1024M
    * HEAP_NEWSIZE: 1024M
  * Advanced configuration can be set in the following required configuration files (stored in etc/cassandra):
    * cassandra-env.sh
    * cassandra-rackdc.properties
    * cassandra.yaml
    * commitlog_archiving.properties
    * jvm-clients.options
    * jvm-server.options
    * jvm8-clients.options
    * jvm8-server.options
    * jvm11-clients.options
    * jvm11-server.options
    * logback.xml
  * The only parameter that we needed to set additionally in those files was `enable_materialized_views: true` to be able to create materialized views.
  * The Docker volume mapped to the Cassandra Container at `etc/cassandra` needs to have all the above files in order for cassandra to work, the values specified in the above environment variables will override the default values in the actual configuration files.
* At the first try we experienced problems executing our startup script to run CQL commands: `Connection error: ('Unable to connect to any servers', {'172.20.0.6:9042': ConnectionRefusedError(111, "Tried connecting to [('172.20.0.6', 9042)]. Last error: Connection refused")})`. This was due to enabled authentication which we then ended using for the connection. The default user and password is *cassandra*.
* When creating materialized views we received the following message `Warnings : Materialized views are experimental and are not recommended for production use.` Apparently materialized views are experimental and this is also why we had to explicitly enable them in the configuration. It is recommended to rather use duplicate tables as suggested in this [stackoverflow thread](https://stackoverflow.com/questions/48974287/cassandra-materialized-views-impact).
* ..

## Data Model

* When first importing the data into Cassandra we ran into the follwing problem: `Failed to import 1 rows: ParseError - Failed to parse 5.34896E+17 : invalid literal for int() with base 10: '5.34896E+17',  given up without retries 'builtin_function_or_method' object has no attribute 'error'`. In order to fix this we had to manipulate the data before the import manually.
* ..


## Other

* To optimize for read over write (as this will be our case), we set compaction to `LeveledCompactionStrategy` as recommended by the Cassandra documentation for this kind of system: `[..] WITH compaction = {'class' : 'LeveledCompactionStrategy'};`
* Formula for replication factor as suggested by this [blog post](https://www.freecodecamp.org/news/the-apache-cassandra-beginner-tutorial/): [read-consistency-level] + [write-consistency-level] > [replication-factor]
* Pre-sort data can be achieved by: `CLUSTERING ORDER BY (number_of_likes ASC);`
* ..