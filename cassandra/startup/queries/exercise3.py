from cassandra.cluster import Cluster

cluster = Cluster(['172.20.0.6', '172.20.0.7', '172.20.0.8'])
session = cluster.connect('twitter')


rows = session.execute('SELECT content FROM tweets LIMIT 10')
for row in rows:
    print(row.content)
