DC_NEO4J_ENT := neo4j-enterprise/docker-compose.yml
DC_NEO4J_COM := neo4j-community/docker-compose.yml

neo4j-ent: ## Run Neo4j Enterprise Edition trough Docker Compose
	./neo4j-enterprise/startup.sh
	docker-compose -f $(DC_NEO4J_ENT) up -d

neo4j-com: ## Run Neo4j Enterprise Edition trough Docker Compose
	docker-compose -f $(DC_NEO4J_COM) up -d