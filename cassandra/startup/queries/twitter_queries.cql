// 1. Auflisten der Posts, die von einem Account gemacht wurden, bzw. ihm zugeordnet wurden
SELECT content FROM twitter.tweets where author_id = X;
// or 
SELECT * FROM twitter.tweets WHERE author='katyperry' ALLOW FILTERING;

// 2 .Finden der 100 Accounts mit den meisten Followern

// VIEW not possible -> no group by allowed AND YOU CANT SORT DATA https://stackoverflow.com/a/14463098
// CREATE MATERIALIZED VIEW twitter.most_follows AS SELECT user_id, count(user_id) as len from twitter.user  group by user_id PRIMARY KEY (user_id,len);
// # Use of spark cluster or trigger to update tables to add the lenght of follower ids. -> New Data Schema
// # not supported on counter table -> CREATE MATERIALIZED VIEW twitter.most_follows AS SELECT user_id, follower_len from twitter.user_stats PRIMARY KEY ((follower_len,user_id));
// change to int 
CREATE MATERIALIZED VIEW twitter.most_follows AS SELECT user_id, follower_len from twitter.user_stats WHERE user_id is not null and follower_len is not null PRIMARY KEY (follower_len,user_id);

// 3. Finden der 100 Accounts, die den meisten der Accounts folgen, die in 2) gefunden wurden

// 4. 
// die Anzahl der Follower & die Anzahl der verfolgten Accounts
SELECT * FROM twitter.user_stats WHERE user_id = 14378300;
// 25 neusten
CREATE MATERIALIZED VIEW twitter.start_view_new AS SELECT user_id_x,follower_id,date_time,name,author,content,id FROM twitter.user WHERE user_id_x IS NOT NULL AND follower_id IS NOT NULL AND date_time IS NOT NULL AND id IS NOT NULL PRIMARY KEY ((user_id_x),date_time,follower_id,id);
SELECT * FROM twitter.start_view WHERE user_id_x = 14378300 ORDER BY date_time DESC LIMIT 25; 
// 25 beliebtesten
CREATE MATERIALIZED VIEW twitter.start_view_like AS SELECT user_id_x,follower_id,number_of_likes,date_time,author,name,content,id FROM twitter.user WHERE user_id_x IS NOT NULL AND follower_id IS NOT NULL AND number_of_likes IS NOT NULL AND id IS NOT NULL PRIMARY KEY ((user_id_x),number_of_likes,follower_id,id);
SELECT * FROM twitter.start_view_like WHERE user_id_x = 14378300 ORDER BY number_of_likes DESC LIMIT 25; 

// 5. Fan-Out as VIEW ?
// # InvalidRequest: Error from server: code=2200 [Invalid query] message="Unknown column 'user_id_x' referenced in PRIMARY KEY for materialized view 'start_view_biber'"
CREATE MATERIALIZED VIEW twitter.start_view_biber AS SELECT follower_id,number_of_likes,date_time,author,name,content,id FROM twitter.user WHERE user_id_x IS NOT NULL AND user_id_x=172883064 AND follower_id IS NOT NULL AND number_of_likes IS NOT NULL AND id IS NOT NULL PRIMARY KEY ((user_id_x),number_of_likes,follower_id,id);
// # order by need partion key in WHERE
SELECT * from twitter.start_view_biber WHERE user_id_x=14378300 ORDER BY number_of_likes DESC LIMIT 25;
// INSERT new tweet
INSERT INTO twitter.user(user_id_x,follower_id,name,author ,content ,country ,date_time ,id ,language ,latitude ,longitude ,number_of_likes ,number_of_shares ,user_id_y )
VALUES(14378300, 261047860, 'Justin','NoName', 'Hallo there BDEA','DE', dateof(now()), 'NoID', 'text', 100, 100, 10000000, 0, 0);

// 6. Auflisten Post die ein geg. Wort enthalten (falls möglich auch mit UND-Verknüpfung mehrerer Worte)
// # Enables SASI index creation on this node && SASI indexes are considered experimental and are not recommended for production use.
// # InvalidRequest: Error from server: code=2200 [Invalid query] message="Secondary indexes on materialized views aren't supported"
// # SyntaxException: line 1:7 no viable alternative at input 'SEARCH' ([CREATE] SEARCH...)
CREATE CUSTOM INDEX search_in ON twitter.tweets (content) USING 'org.apache.cassandra.index.sasi.SASIIndex' WITH OPTIONS = {  'mode': 'CONTAINS', 'analyzer_class': 'org.apache.cassandra.index.sasi.analyzer.NonTokenizingAnalyzer', 'case_sensitive': 'false' };
SELECT * from twitter.tweets WHERE content LIKE '%This%' limit 25;



