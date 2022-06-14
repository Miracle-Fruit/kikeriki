#!/usr/bin/bash -I

export USER_ID="$(id -u)"
export GROUP_ID="$(id -g)"
export NEO4J_DOCKER_IMAGE=neo4j:4.4-enterprise
export NEO4J_EDITION=docker_compose
export EXTENDED_CONF=yes
export NEO4J_ACCEPT_LICENSE_AGREEMENT=no
export NEO4J_AUTH=neo4j/password