from collections import OrderedDict
from collections import Counter
from cassandra.cluster import Cluster

cluster = Cluster(['172.20.0.6', '172.20.0.7', '172.20.0.8'])
session = cluster.connect('twitter')

# 2. Find the 100 accounts with the most followers
rows = session.execute('SELECT user_id,follower_len FROM twitter.most_follows;')
sorted_rows = dict(sorted(dict(rows).items(), key=lambda item: item[1]))
most_follows = list(sorted_rows.keys())[-100:]
print("Top 100 most followed accounts:",most_follows)

print("________________________________________________________________")

# Finding the 100 accounts that follow the most of the accounts found in 2). 
followed_accs = session.execute(f'SELECT follower_id FROM twitter.follower_relation WHERE user_id IN {tuple(most_follows)};')
# followed_accs = list(followed_accs.keys())
_list = list()
for row in followed_accs:
    _list.append(row[0])

followed_top_100 = Counter(_list).most_common(100)
print("100 accounts that follow the most of the accounts found in 2)",followed_top_100)
