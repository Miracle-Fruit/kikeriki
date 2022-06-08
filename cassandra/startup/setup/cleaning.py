from datetime import date
import pandas as pd
import numpy as np

# read follwer
df_follower = pd.read_csv("cassandra/startup/data/twitter_combined_orginal.txt", sep=' ',  names=["user_id","follows"])
df_follower = df_follower.drop_duplicates() # drop duplicate follows in data
df_follower_new = df_follower.groupby('user_id')['follows'].apply(list).reset_index(name='follows') # group user_id to follows -> user is following
df_follower = df_follower.groupby('follows')['user_id'].apply(list).reset_index(name='follower') # group follows to user_id -> user are followed by
df_follower_new["follower"] = df_follower['follower']

df_follower_new.to_csv("cassandra/startup/data/twitter_combined.txt",index=False)

# change timestap in twitter.csv for database usage
data = pd.read_csv("cassandra/startup/data/tweets.csv")
data['content'] = data["content"].str.replace("\n","\\n")
data['content'] = data["content"].str.replace("\r","\\r")
data['content'] = data["content"].str.replace(',',"\,")
data.to_csv("cassandra/startup/data/tweets.csv",index=False)