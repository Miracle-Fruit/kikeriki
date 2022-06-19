## Cassandra

Command can be run on the Cassandra Web at `localhost:3000` or in the docker container with:

    sudo docker exec -it cass1 cqlsh
            
Note the `MATERIALZIED VIEWS` and `CUSTOM INDEX` are already created in the [startup script](https://github.com/Miracle-Fruit/kikeriki/blob/main/cassandra/startup/setup/setup_db.sh) and don't needed to be run again.

## Queries

All queries can also be found [here](https://github.com/Miracle-Fruit/kikeriki/tree/main/cassandra/startup/queries).

1. Listing  all the posts made by an account.

        SELECT content FROM twitter.tweets where author_id = 233248636;

2. Find the 100 accounts with the most followers

       CREATE MATERIALIZED VIEW twitter.most_follows AS
        SELECT user_id, follower_len from twitter.user_stats
        WHERE user_id is not null and follower_len is not null
        PRIMARY KEY (follower_len,user_id);
        
        // TODO
       
3. Finding the 100 accounts that follow the most of the accounts found in 2).

        //TODO 

4. Listing the information for the personal home page of any account (best try with the accounts found in 2); the start page should contain the following (implement as separate queries):
    * the number of followers && the number of followed accounts  
       
          SELECT follower_len, follows_len FROM twitter.user_stats WHERE user_id = 14378300; //cheack user_id can be changed
    
    * either the 25 newest or the 25 most popular posts of the followed accounts (via DB query)

       25 newest
    
          CREATE MATERIALIZED VIEW twitter.start_view_new AS
            SELECT user_id_x,follower_id,number_of_likes,number_of_shares,date_time,name,author,content,id FROM twitter.user
            WHERE user_id_x IS NOT NULL AND follower_id IS NOT NULL AND date_time IS NOT NULL AND id IS NOT NULL
            PRIMARY KEY ((user_id_x),date_time,follower_id,id);
          
          SELECT * FROM twitter.start_view_new WHERE user_id_x = 14378300 ORDER BY date_time DESC LIMIT 25;
        
       25 most popular
       
          CREATE MATERIALIZED VIEW twitter.start_view_like AS
           SELECT user_id_x,follower_id,number_of_likes,number_of_shares,date_time,author,name,content,id FROM twitter.user
           WHERE user_id_x IS NOT NULL AND follower_id IS NOT NULL AND number_of_likes IS NOT NULL AND id IS NOT NULL
           PRIMARY KEY ((user_id_x),number_of_likes,follower_id,id);
           
          SELECT * FROM twitter.start_view_like WHERE user_id_x = 14378300 ORDER BY number_of_likes DESC LIMIT 25; 

5. Caching of the posts for the home page (cf. 4) requires a so-called fan-out in the cache of each follower when writing a new post

        CREATE MATERIALIZED VIEW twitter.start_view_biber AS
         SELECT follower_id,number_of_likes,date_time,author,name,content,id FROM twitter.user 
         WHERE user_id_x IS NOT NULL AND user_id_x=14378300 AND follower_id IS NOT NULL AND number_of_likes IS NOT NULL AND id IS NOT NULL 
         PRIMARY KEY ((user_id_x),number_of_likes,follower_id,id);
        // # order by need partion key in WHERE
        SELECT * from twitter.start_view_biber WHERE user_id_x=14378300 ORDER BY number_of_likes DESC LIMIT 25;
        // INSERT new tweet
        INSERT INTO twitter.user
        (user_id_x,follower_id,name,author ,content ,country ,date_time ,id ,language ,latitude ,longitude ,number_of_likes ,number_of_shares ,user_id_y)
        VALUES
        (14378300, 261047860, 'Justin','NoName', 'Hallo there BDEA','DE', dateof(now()), 'NoID', 'text', 100, 100, 10000000, 0, 0);
        
6. List of the 25 most popular posts that contain a given word (if possible also with AND linking several words)

        // To order by the 25 most number_of_like is at our knowledge not possible with the current dataschema
        CREATE CUSTOM INDEX search_in ON twitter.tweets (content) USING 'org.apache.cassandra.index.sasi.SASIIndex'
          WITH OPTIONS = {  'mode': 'CONTAINS', 'analyzer_class': 'org.apache.cassandra.index.sasi.analyzer.NonTokenizingAnalyzer',
          'case_sensitive': 'false' };
        SELECT * from twitter.tweets WHERE content LIKE '%This%' limit 25;
 
