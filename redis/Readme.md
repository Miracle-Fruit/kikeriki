# Redis

```make redis```
```docker exec -it redis-redis-node-5-1 redis-cli --cluster create 172.18.0.2:6379 172.18.0.3:6379 172.18.0.4:6379 172.18.0.5:6379 172.18.0.6:6379 172.18.0.7:6379 --cluster-replicas 1 --cluster-yes```