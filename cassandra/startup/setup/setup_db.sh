#!/bin/bash
cqlsh cass1 -f /tmp/startup/setup/setup_db_1.cql
cqlsh cass1 -f /tmp/startup/setup/setup_db_2.cql
# NOTE : Quote it else use array to avoid problems #
# <stdin>:1:Failed to import 20 rows: WriteTimeout - Error from server: code=1100 [Coordinator node timed out waiting for replica nodes' responses] message="Operation timed out - received only 0 responses." info={'consistency': 'ONE', 'required_responses': 1, 'received_responses': 0, 'write_type': 'UNLOGGED_BATCH'},  will retry later, attempt 1 of 5
TWEET_FILES="/tmp/startup/data/relations/*"
for f in $TWEET_FILES; do
    cqlsh cass1 -e "COPY twitter.user (user_id_x,follower_id,name,author,content,country,date_time,id,language,latitude,longitude,number_of_likes,number_of_shares,user_id_y) FROM '$f' WITH DELIMITER=',' AND  HEADER=TRUE;"
done

cqlsh cass1 -f /tmp/startup/setup/setup_views.cql
