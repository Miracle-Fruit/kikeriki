## Cassandra

Command can be run on the Cassandra Web at `localhost:3000` or in the docker container with:

    sudo docker exec -it cass1 cqlsh
            
Note the `MATERIALZIED VIEWS` and `CUSTOM INDEX` are already created in the [startup script](https://github.com/Miracle-Fruit/kikeriki/blob/main/cassandra/startup/setup/setup_db.sh) and don't needed to be run again.

## Queries

All queries can also be found [here](https://github.com/Miracle-Fruit/kikeriki/tree/main/cassandra/startup/queries).

1. Auflisten der Posts, die von einem Account gemacht wurden, bzw. ihm zugeordnet wurden

        SELECT content FROM twitter.tweets where author_id = X;

        SELECT * FROM twitter.tweets WHERE author='katyperry' ALLOW FILTERING;

2. Finden der 100 Accounts mit den meisten Followern

       CREATE MATERIALIZED VIEW twitter.most_follows AS
        SELECT user_id, follower_len from twitter.user_stats
        WHERE user_id is not null and follower_len is not null
        PRIMARY KEY (follower_len,user_id);
        
        // TODO
       
3. Finden der 100 Accounts, die den meisten der Accounts folgen, die in 2) gefunden wurden

        //TODO 

4. Auflisten der Informationen für die persönliche Startseite eines beliebigen Accounts (am besten mit den in 2) gefundenen Accounts ausprobieren); die Startseite soll Folgendes beinhalten (als getrennte Queries umsetzen):
    * die Anzahl der Follower && die Anzahl der verfolgten Accounts   
       
          SELECT follower_len, follows_len FROM twitter.user_stats WHERE user_id = 172883064; //cheack user_id can be changed
    
    * wahlweise die 25 neusten oder die 25 beliebtesten Posts der verfolgten Accounts (per DB-Abfrage)

       25 neusten
    
          CREATE MATERIALIZED VIEW twitter.start_view_new AS
            SELECT user_id_x,follower_id,date_time,name,author,content,id FROM twitter.user
            WHERE user_id_x IS NOT NULL AND follower_id IS NOT NULL AND date_time IS NOT NULL AND id IS NOT NULL
            PRIMARY KEY ((user_id_x),date_time,follower_id,id);
          
          SELECT * FROM twitter.start_view_new WHERE user_id_x = 172883064 ORDER BY date_time DESC LIMIT 25;
        
       25 beliebtesten
       
          CREATE MATERIALIZED VIEW twitter.start_view_like AS
           SELECT user_id_x,follower_id,number_of_likes,date_time,author,name,content,id FROM twitter.user
           WHERE user_id_x IS NOT NULL AND follower_id IS NOT NULL AND number_of_likes IS NOT NULL AND id IS NOT NULL
           PRIMARY KEY ((user_id_x),number_of_likes,follower_id,id);
           
          SELECT * FROM twitter.start_view_like WHERE user_id_x = 172883064 ORDER BY number_of_likes DESC LIMIT 25; 

5. Caching der Posts für die Startseite (vgl. 4), erfordert einen sog. Fan-Out in den Cache jedes Followers beim Schreiben eines neuen Posts

        CREATE MATERIALIZED VIEW twitter.start_view_biber AS
         SELECT follower_id,number_of_likes,date_time,author,name,content,id FROM twitter.user 
         WHERE user_id_x IS NOT NULL AND user_id_x=172883064 AND follower_id IS NOT NULL AND number_of_likes IS NOT NULL AND id IS NOT NULL 
         PRIMARY KEY ((user_id_x),number_of_likes,follower_id,id);
        // # order by need partion key in WHERE
        SELECT * from twitter.start_view_biber WHERE user_id_x=172883064 ORDER BY number_of_likes DESC LIMIT 25;
        // INSERT new tweet
        INSERT INTO twitter.user
        (user_id_x,follower_id,name,author ,content ,country ,date_time ,id ,language ,latitude ,longitude ,number_of_likes ,number_of_shares ,user_id_y)
        VALUES
        (172883064, 261047860, 'Justin','Twitter', 'Hallo there BDEA','DE', dateof(now()), 'NoID', 'text', 100, 100, 10000000, 0, 0);
        
6. Auflisten der 25 beliebtesten Posts, die ein geg. Wort enthalten (falls möglich auch mit UND-Verknüpfung mehrerer Worte)

        // To order by the 25 most number_of_like is at our knowledge not possible with the current dataschema
        CREATE CUSTOM INDEX search_in ON twitter.tweets (content) USING 'org.apache.cassandra.index.sasi.SASIIndex'
          WITH OPTIONS = {  'mode': 'CONTAINS', 'analyzer_class': 'org.apache.cassandra.index.sasi.analyzer.NonTokenizingAnalyzer',
          'case_sensitive': 'false' };
        SELECT * from twitter.tweets WHERE content LIKE '%This%' limit 25;
 
