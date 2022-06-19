from ctypes import sizeof
from datetime import date
import pandas as pd
import numpy as np

# read follwer
df_follower = pd.read_csv("cassandra/startup/data/twitter_combined_orginal.txt", sep=' ',  names=["user_id","follower_id"])
df_follower = df_follower.drop_duplicates() # drop duplicate follows in data
df_user_stats = df_follower.groupby('user_id')['follower_id'].size().reset_index(name='follower_len') # group user_id to follows -> user is following
df_user_stats['follows_len'] = df_follower.groupby('follower_id')['user_id'].size().reset_index(name='follows_len')['follows_len'] # group follows to user_id -> user are followed by
df_user_follow_list = df_follower.groupby('user_id')['follower_id'].apply(list).reset_index(name='follows') # group follows to user_id -> user are followed by
df_user_follow_list['follower'] = df_follower.groupby('follower_id')['user_id'].apply(list).reset_index(name='follower')['follower'] # group follows to user_id -> user are followed by
df_user_stats['follows_len'] = df_follower.groupby('follower_id')['user_id'].size().reset_index(name='follows_len')['follows_len'] # group follows to user_id -> user are followed by

df_follower.to_csv("cassandra/startup/data/user_follower_relation.csv",index=False)

# change comment section in twitter.csv because \n and \r are not functionally quoteted
df_tweet = pd.read_csv("cassandra/startup/data/tweets_orginal.csv")
df_tweet['content'] = df_tweet["content"].str.replace("\n","\\n")
df_tweet['content'] = df_tweet["content"].str.replace("\r","\\r")
df_tweet['content'] = df_tweet["content"].str.replace(',',"\,")

### map user_ids to the tweets
# list of distinct authors
authors = df_tweet['author'].drop_duplicates().reset_index(drop=True)

# sort user after the most followers and get random authors ids
df_follower['len'] = df_follower.groupby('user_id')['follower_id'].apply(list).str.len()
df_user_id = df_follower.sort_values(by='len', ascending=False)['user_id'][:100].sample(n=len(authors)).reset_index(drop=True)
df_follower = df_follower.drop(columns='len')

# merge the author_names and id into the user table
authors = pd.DataFrame(authors)
authors['user_id'] = df_user_id
df_tweet['user_id'] = df_tweet.merge(authors, on='author').user_id
df_follower['name'] = df_follower.merge(authors,how='left', on='user_id')['author'].values
tweets_len = df_tweet.groupby('user_id')['id'].size().reset_index(name='tweets_len').astype(int)
df_user_stats['tweets_len'] = df_user_stats.merge(tweets_len,how='left', on='user_id')['tweets_len'].values

# add liked from user to each tweet
user_ids = pd.DataFrame(df_follower['user_id'].drop_duplicates())
num_of_ids_missing = int(df_tweet['number_of_likes'].max()/10) - user_ids.values.size
# generate new user if most liked tweet are more than the user number
if num_of_ids_missing > 0: 
    a = np.empty((num_of_ids_missing,2,))
    a[:] = np.nan
    new_user_ids = np.arange(user_ids.max()+1,user_ids.max()+1+num_of_ids_missing)
    a[:,0] = new_user_ids
    user_ids = pd.concat([pd.DataFrame(a, columns=user_ids.columns), user_ids], ignore_index=True)
    user_ids['user_id'] = user_ids['user_id'].astype(np.uint32)

# sort random user_id to all tweets
tweet_ids = pd.DataFrame(df_tweet['id'].drop_duplicates())
tweet_ids['liked_from'] = df_tweet.apply(lambda row: list(np.random.choice(user_ids['user_id'],size = int(row['number_of_likes']/10))),axis=1)
tweet_ids['date_time'] = df_tweet['date_time']

# split into separte files
partitions = 7
dfs = np.array_split(tweet_ids, partitions)
for i,df in enumerate(dfs):
   df.to_csv("cassandra/startup/data/tweet_liked/tweet"+str(i)+".txt",index=False)


# save the updated data
df_tweet.to_csv("cassandra/startup/data/tweets.csv",index=False)
df_user_stats.to_csv("cassandra/startup/data/user_stats.txt",index=False)
df_user_follow_list.to_csv("cassandra/startup/data/user_follows.txt",index=False)

# save realtionship betweet user_ID, follower_ID and tweet_ID
relation_list = list()
for i,row in df_tweet.iterrows():
    df = df_tweet.iloc[[i]]
    relation_list.append(df_follower.merge(df,left_on='follower_id',right_on='user_id'))
    if i % 1000 == 0:
        df_follower_new = pd.concat(relation_list)
        df_follower_new.to_csv("cassandra/startup/data/relations/relation"+str(i)+".txt",index=False)
        relation_list = list()






