CREATE MATERIALIZED VIEW twitter.start_view_like AS
 SELECT user_id_x,follower_id,number_of_likes,date_time,author,name,content,id
 FROM twitter.user 
 WHERE user_id_x IS NOT NULL AND follower_id IS NOT NULL AND number_of_likes IS NOT NULL AND id IS NOT NULL
PRIMARY KEY ((user_id_x),number_of_likes,follower_id,id);

CREATE MATERIALIZED VIEW twitter.start_view_new AS 
 SELECT user_id_x,follower_id,date_time,name,author,content,id 
 FROM twitter.user 
 WHERE user_id_x IS NOT NULL AND follower_id IS NOT NULL AND date_time IS NOT NULL AND id IS NOT NULL 
PRIMARY KEY ((user_id_x),date_time,follower_id,id);

CREATE MATERIALIZED VIEW twitter.start_view_biber AS
 SELECT follower_id,number_of_likes,date_time,author,name,content,id
 FROM twitter.user 
 WHERE user_id_x IS NOT NULL AND user_id_x=172883064 AND follower_id IS NOT NULL AND number_of_likes IS NOT NULL AND id IS NOT NULL
PRIMARY KEY ((user_id_x),number_of_likes,follower_id,id);

CREATE CUSTOM INDEX search_in
 ON twitter.tweets (content) 
 USING 'org.apache.cassandra.index.sasi.SASIIndex' 
 WITH OPTIONS = {  'mode': 'CONTAINS', 'analyzer_class': 'org.apache.cassandra.index.sasi.analyzer.NonTokenizingAnalyzer', 'case_sensitive': 'false' };
