SELECT * FROM twitter.tweets WHERE author='katyperry' ALLOW FILTERING;




select tweet_ids from twitter.user_14237490 where user_id=14237490;
CREATE MATERIALIZED VIEW twitter.user_14237490 AS select * from twitter.user where user_id=14237490 PRIMARY KEY (user_id);