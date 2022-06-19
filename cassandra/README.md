## Cassandra

Command can be run on the Cassandra Web at `localhost:3000` or in the docker container with:

    sudo docker exec -it cass1 cqlsh
            
Note the `MATERIALZIED VIEWS` and `CUSTOM INDEX` are already created in the [startup script](https://github.com/Miracle-Fruit/kikeriki/blob/main/cassandra/startup/setup/setup_db.sh) and don't needed to be run again.

## Queries

All queries can also be found [here](https://github.com/Miracle-Fruit/kikeriki/tree/main/cassandra/startup/queries).

1. Listing  all the posts made by an account.

        SELECT content FROM twitter.tweets where author_id = 233248636;

2. Find the 100 accounts with the most followers
``` python
# 2. Find the 100 accounts with the most followers
rows = session.execute('SELECT user_id,follower_len FROM twitter.most_follows;')
sorted_rows = dict(sorted(dict(rows).items(), key=lambda item: item[1]))
most_follows = list(sorted_rows.keys())[-100:]
print("Top 100 most followed accounts:",most_follows)
```

    Top 100 most followed accounts: [817268, 173732041, 14506809, 158804228, 358775055, 45416789, 302282272, 65913144, 261001122, 14246001, 7702232, 101204352, 280365428, 15439395, 26929220, 46537966, 32774989, 2367911, 7429892, 88097807, 274153775, 41147062, 127973392, 10350, 12127832, 18666844, 279787626, 14511951, 116036694, 225784456, 270449528, 63796828, 22784458, 364917755, 15693493, 17346342, 28933226, 7872262, 14180231, 100581193, 88323281, 131029775, 25952851, 14692604, 21681252, 309366491, 25376226, 22705686, 188108667, 18715024, 3829151, 41172837, 92319025, 24081780, 15102849, 83943787, 15680204, 7846, 184097849, 7377812, 204317520, 24641194, 14691709, 112939321, 7081402, 153226312, 14269220, 94414805, 108811740, 1065921, 221829166, 116952434, 15222083, 6608332, 17759701, 16098603, 7860742, 20471349, 6519522, 19040580, 14536491, 197504076, 12611642, 36198161, 3840, 22841103, 440963134, 20273398, 17092592, 13348, 17093617, 22679419, 208132323, 18776017, 15846407, 18581803, 5442012, 813286, 3359851, 59804598]
       
3. Finding the 100 accounts that follow the most of the accounts found in 2).
```python
followed_accs = session.execute(f'SELECT follower_id FROM twitter.follower_relation WHERE user_id IN {tuple(most_follows)};')
_list = list()
for row in followed_accs:
    _list.append(row[0])

followed_top_100 = Counter(_list).most_common(100)
print("100 accounts that follow the most of the accounts found in 2)",followed_top_100)
```

    100 accounts that follow the most of the accounts found in 2) [(3359851, 47), (7860742, 47), (15913, 45), (7861312, 45), (16098603, 43), (18776017, 41), (10350, 39), (48485771, 39), (22679419, 38), (3443591, 37), (18581803, 37), (18927441, 37), (26281970, 37), (7872262, 36), (24742040, 36), (5442012, 36), (10671602, 35), (11928542, 35), (14922225, 35), (16453996, 35), (21681252, 35), (14589257, 34), (15853668, 34), (9451052, 34), (65913144, 34), (14269220, 34), (15234657, 34), (17092592, 34), (59804598, 34), (87764480, 34), (40981798, 34), (16475194, 34), (16464746, 33), (93905958, 33), (20152005, 33), (42361118, 33), (36629388, 33), (18666844, 32), (19413393, 32), (12127832, 32), (14180231, 32), (14983833, 32), (25026165, 32), (18742444, 32), (29758446, 31), (20880546, 31), (116952434, 31), (30207757, 31), (21195122, 31), (43003845, 31), (22784458, 30), (19040580, 30), (14691709, 30), (24004172, 30), (1065921, 30), (26280712, 30), (43170475, 30), (22462180, 30), (7846, 29), (1183041, 29), (3040621, 29), (7377812, 29), (34428380, 29), (20273398, 28), (14230524, 28), (15222083, 28), (24641194, 28), (83943787, 28), (36198161, 28), (14536491, 28), (813286, 27), (12611642, 27), (29514951, 27), (31353077, 27), (18996905, 27), (14471778, 27), (15838599, 27), (16112634, 27), (17526132, 27), (17759701, 27), (31331740, 27), (25952851, 27), (84043660, 27), (9431932, 27), (20397258, 27), (127973392, 27), (16674726, 27), (116036694, 27), (972651, 26), (13687132, 26), (4068821, 26), (7702232, 26), (6080022, 26), (17224642, 26), (20935355, 26), (24081780, 26), (26033920, 26), (28933226, 26), (43933017, 26), (101633415, 26)]

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
 
