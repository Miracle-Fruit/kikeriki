# Neo4j 
* Start with ```make neo4j-ent```


## Cyper-Shell:
* Connect to one Core Container via ```docker exec -it neo4j-enterprise-core1-1 bash```
* Start Cyper Shell ```cypher-shell -u neo4j -p neo4j``` 
* Change Password and enter the Shell
```
CREATE DATABASE twitter;

START DATABASE twitter;

:auto USING PERIODIC COMMIT 500
LOAD CSV WITH HEADERS FROM "file:///twitter_combined.csv" AS row
MATCH (f:Node), (s:Node)
WHERE f.Name = row.User_id
AND s.Name = row.Follower_id
MERGE (f)-[r:FOLLOWS]->(s)
```



### Neo4j-Enterprise Browser only works on local Docker steup not on GitLab
* Open localhost:7474/browser to access the Neo4j Browser
```
CREATE DATABASE twitter;

START DATABASE twitter;

:auto USING PERIODIC COMMIT 500
LOAD CSV WITH HEADERS FROM "file:///twitter_combined.csv" AS row
MATCH (f:Node), (s:Node)
WHERE f.Name = row.User_id
AND s.Name = row.Follower_id
MERGE (f)-[r:FOLLOWS]->(s)
```

