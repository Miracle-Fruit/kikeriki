DC_NEO4J_ENT := neo4j-enterprise/docker-compose.yml
DC_NEO4J_COM := neo4j-community/docker-compose.yml
DC_CASSANDRA := cassandra/docker-compose.yml

UID:=$(shell id -u)
GID:=$(shell id -g)

neo4j-ent: ## Run Neo4j Enterprise Edition with Cluster trough Docker Compose
	cd ./neo4j-enterprise/ && ./createFolders.sh
	export USER_ID=$(UID) && \
	export GROUP_ID=$(GID) && \
	export NEO4J_DOCKER_IMAGE=neo4j:4.4-enterprise && \
	export NEO4J_EDITION=docker_compose && \
	export EXTENDED_CONF=yes && \
	export NEO4J_ACCEPT_LICENSE_AGREEMENT=no && \
	export NEO4J_AUTH=none && \
	docker-compose -f $(DC_NEO4J_ENT) up -d

neo4j-com: ## Run Neo4j Community trough Docker Compose
	docker-compose -f $(DC_NEO4J_COM) up -d

cass: ## Run Cassandra Cluster trough Docker Compose
	{ echo -n "REACT_APP_GITPOD_URL=" ; gp url ; }  > cassandra/app/.env
	docker-compose -f $(DC_CASSANDRA) up -d
