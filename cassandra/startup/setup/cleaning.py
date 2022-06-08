from datetime import date
import pandas as pd
import numpy as np

# TODO should performe in the container so the data are change in the load/read process

# change timestap in twitter.csv for database usage
data = pd.read_csv("cassandra/startup/data/tweets.csv")
data['content'] = data["content"].str.replace("\n","\\n")
data['content'] = data["content"].str.replace("\r","\\r")
data['content'] = data["content"].str.replace(',',"\,")
data.to_csv("cassandra/startup/data/tweets.csv",index=False)