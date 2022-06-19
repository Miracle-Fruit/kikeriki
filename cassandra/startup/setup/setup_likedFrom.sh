#!/bin/bash
LIKED_FROM_FILES="/tmp/startup/data/tweet_liked/*"
for f in $LIKED_FROM_FILES; do
    cqlsh cass1 -e "COPY twitter.tweet_liked_from (user_id,liked_from) FROM '$f' WITH DELIMITER=',' AND  HEADER=TRUE;"
done