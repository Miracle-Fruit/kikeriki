DC_NEO4J_ENT := neo4j-enterprise/docker-compose.yml
DC_NEO4J_COM := neo4j-community/docker-compose.yml
DC_CASSANDRA := cassandra/docker-compose.yml
DC_SCYLLA := scylla/docker-compose.yml
DC_REDIS := redis/docker-compose.yml
DC_RAVEN := ravenDB/docker-compose.yml

UID:=$(shell id -u)
GID:=$(shell id -g)

.PHONY: scylla redis

neo4j-ent: ## Run Neo4j Enterprise Edition with Cluster trough Docker Compose
	cd ./neo4j-enterprise/ && ./createFolders.sh
	chmod 640 ./neo4j-enterprise/conf/neo4j.conf
	export USER_ID=$(UID) && \
	export GROUP_ID=$(GID) && \
	export NEO4J_DOCKER_IMAGE=neo4j:4.4-enterprise && \
	export NEO4J_EDITION=docker_compose && \
	export EXTENDED_CONF=yes && \
	export NEO4J_ACCEPT_LICENSE_AGREEMENT=no && \
	export NEO4J_AUTH=none && \
	docker-compose -f $(DC_NEO4J_ENT) up -d

neo4j-ent-shutdown:
	export USER_ID=$(UID) && \
	export GROUP_ID=$(GID) && \
	export NEO4J_DOCKER_IMAGE=neo4j:4.4-enterprise && \
	export NEO4J_EDITION=docker_compose && \
	export EXTENDED_CONF=yes && \
	export NEO4J_ACCEPT_LICENSE_AGREEMENT=no && \
	export NEO4J_AUTH=none && \
	docker-compose -f $(DC_NEO4J_ENT) down 

neo4j-com: ## Run Neo4j Community trough Docker Compose
	docker-compose -f $(DC_NEO4J_COM) up -d

cass: ## Run Cassandra Cluster trough Docker Compose
	{ echo -n "REACT_APP_GITPOD_URL=" ; gp url ; }  > cassandra/app/.env
	docker-compose -f $(DC_CASSANDRA) up

cass-ex3:
	cd ./cassandra/startup/queries && \
	docker build -t ex3 . && \
	docker run --rm --network cassandra_spaceandtime ex3

scylla: ## Run ScyllaDB Cluster trough Docker Compose
	docker-compose -f $(DC_SCYLLA) up 

redis: 
	docker-compose -f $(DC_REDIS) up 

ravendb:
	docker-compose -f $(DC_RAVEN) up 