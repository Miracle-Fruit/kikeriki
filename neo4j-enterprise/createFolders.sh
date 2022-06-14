#!/bin/bash


createSubfolders() {
    mkdir -p ./$1/core1/
    mkdir -p ./$1/core2/
    mkdir -p ./$1/core3/
    mkdir -p ./$1/replica1/
}

createSubfolders "data"
createSubfolders "import"
createSubfolders "logs"
createSubfolders "conf"

mkdir -p ./neo4j.conf/
