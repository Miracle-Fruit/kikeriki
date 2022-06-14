```
CREATE DATABASE twitter

START DATABASE twitter

:auto USING PERIODIC COMMIT 500
LOAD CSV WITH HEADERS FROM "file:///twitter_combined.csv" AS row




```