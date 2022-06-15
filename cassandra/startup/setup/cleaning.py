from datetime import date
import pandas as pd
import numpy as np

# read follwer
df_follower = pd.read_csv("cassandra/startup/data/twitter_combined_orginal.txt", sep=' ',  names=["user_id","follower_id"])
df_follower = df_follower.drop_duplicates() # drop duplicate follows in data

# change comment section in twitter.csv because \n and \r are not functionally quoteted
data = pd.read_csv("cassandra/startup/data/tweets_orginal.csv")
data['content'] = data["content"].str.replace("\n","\\n")
data['content'] = data["content"].str.replace("\r","\\r")
data['content'] = data["content"].str.replace(',',"\,")

### map user_ids to the tweets
# list of distinct authors
authors = data['author'].drop_duplicates().reset_index(drop=True)

# sort user after the most followers and get random authors ids
df_follower['len'] = df_follower.groupby('user_id')['follower_id'].apply(list).str.len()
df_user_id = df_follower.sort_values(by='len', ascending=False)['user_id'][:100].sample(n=len(authors)).reset_index(drop=True)
df_follower = df_follower.drop(columns='len')

# merge the author_names and id into the user table
authors = pd.DataFrame(authors)
authors['user_id'] = df_user_id
data['user_id'] = data.merge(authors, on='author').user_id
df_follower['name'] = df_follower.merge(authors,how='left', on='user_id')['author'].values

# add tweets id list to the user data
# data_tweets = data.groupby('user_id')['id'].apply(list).reset_index(name='tweet_ids')
# df_follower_new['tweet_ids'] = df_follower_new.merge(data_tweets,how='left', on='user_id').tweet_ids

# save the updated data
data.to_csv("cassandra/startup/data/tweets.csv",index=False)
df_follower.to_csv("cassandra/startup/data/twitter_combined.txt",index=False)
