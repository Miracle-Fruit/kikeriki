### Neo4j-Enterprise Browser only works on local Docker steup not on GitLab

* Start with make neo4j-ent
* Open localhost:7474/browser to access the Neo4j Browser

```
CREATE DATABASE twitter

START DATABASE twitter

:auto USING PERIODIC COMMIT 500
LOAD CSV WITH HEADERS FROM "file:///twitter_combined.csv" AS row




```