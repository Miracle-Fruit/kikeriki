DC_NEO4J_ENT := neo4j-enterprise/docker-compose.yml
DC_NEO4J_COM := neo4j-community/docker-compose.yml
DC_CASSANDRA := cassandra/docker-compose.yml

neo4j-ent: ## Run Neo4j Enterprise Edition with Cluster trough Docker Compose
	gp env -e USER_ID=33333
	gp env -e GROUP_ID=33333
	gp env -e NEO4J_DOCKER_IMAGE=neo4j:4.4-enterprise
	gp env -e NEO4J_EDITION=docker_compose
	gp env -e EXTENDED_CONF=yes
	gp env -e NEO4J_ACCEPT_LICENSE_AGREEMENT=yes
	gp env -e NEO4J_AUTH=neo4j/your_password
	docker-compose -f $(DC_NEO4J_ENT) up -d

neo4j-com: ## Run Neo4j Community trough Docker Compose
	docker-compose -f $(DC_NEO4J_COM) up -d

cass: ## Run Cassandra Cluster trough Docker Compose
	docker-compose -f $(DC_CASSANDRA) up -d