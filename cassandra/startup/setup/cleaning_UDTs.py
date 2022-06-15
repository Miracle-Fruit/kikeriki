from datetime import date
import pandas as pd
import numpy as np
from itertools import groupby

# read follwer
df_follower = pd.read_csv("cassandra/startup/data/twitter_combined_orginal.txt", sep=' ',  names=["user_id","follows"])
df_follower = df_follower.drop_duplicates() # drop duplicate follows in data
df_follower_new = df_follower.groupby('user_id')['follows'].apply(list).reset_index(name='follows') # group user_id to follows -> user is following
df_follower = df_follower.groupby('follows')['user_id'].apply(list).reset_index(name='follower') # group follows to user_id -> user are followed by
df_follower_new["follower"] = df_follower['follower']

# change comment section in twitter.csv because \n and \r are not functionally quoteted
data = pd.read_csv("cassandra/startup/data/tweets_orginal.csv")
data['content'] = data["content"].str.replace("\n","\\n")
data['content'] = data["content"].str.replace("\r","\\r")
data['content'] = data["content"].str.replace(',',"\,")

### map user_ids to the tweets
# list of distinct authors
authors = data['author'].drop_duplicates().reset_index(drop=True)

# sort user after the most followers and get random authors ids
df_follower_new['len'] = df_follower_new['follower'].str.len()
df_user_id = df_follower_new.sort_values(by='len', ascending=False)['user_id'][:100].sample(n=len(authors)).reset_index(drop=True)
df_follower_new = df_follower_new.drop(columns='len')

# merge the author_names and id into the user table
authors = pd.DataFrame(authors)
authors['user_id'] = df_user_id
data['user_id'] = data.merge(authors, on='author').user_id
df_follower_new['name'] = df_follower_new.merge(authors,how='left', on='user_id').author

# delete column authors and convert tweet df in dict format to read it as UDTs in cassandra
data = data.drop(columns='author')
data.fillna('', inplace=True)
tweets = data.to_dict('records')
def key_func(k):
    return k['user_id']

def clear_dict(val):
    val_list = list()
    for ele in list(val):
        val_list.append(str(ele))
    return val_list
  
# sort tweets_data by 'user_id' key.
sorted_tweets = sorted(tweets, key=key_func)
tweets = [{'user_id':key,'tweets':clear_dict(value)} for key,value in groupby(sorted_tweets, key_func)]
df_tweets = pd.DataFrame(tweets)
print(df_tweets['tweets'][0][0])
# add tweets id list to the user data
df_follower_new['tweets'] = df_follower_new.merge(df_tweets,how='left', on='user_id').tweets

# save the updated data
df_follower_new.to_csv("cassandra/startup/data/twitter_combined_UDTs.txt", index=False ,sep='|')

#read input file
fin = open("cassandra/startup/data/twitter_combined_UDTs.txt", "rt")
#read file contents to string
data = fin.read()
#replace all occurrences of the required string
data = data.replace('""', '"')
data = data.replace("''", " ")
data = data.replace("\\'", "'")
#close the input file
fin.close()
#open the input file in write mode
fin = open("cassandra/startup/data/twitter_combined_UDTs.txt", "wt")
#overrite the input file with the resulting data
fin.write(data)
#close the file
fin.close()

