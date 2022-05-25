# distributed-nosqldb

## Ideation

* Neo4j clustering is only avavilable in the enterprise edition (30 day trial available). Documentation for Docker Compose with enterprise edition: https://neo4j.com/docs/operations-manual/current/docker/clustering/
* Alternativley we can use ONgDB: https://www.graphfoundation.org/ongdb/ (a fork from the old Neo4j enterprise edition)

## Run

The Makefile allows to run different setups:

```bash
# Run Neo4j enterprise edition with cluster setup
make neo4j-ent

# Run Neo4j community edition (single instance)
$ make neo4j-com

```