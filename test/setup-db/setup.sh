#!/bin/bash

docker build -f Dockerfile.test -t postgres-db-test .
# Nome do contêiner
container_name="postgresdb-test-container"

# Verificar se o contêiner já existe
if docker ps -a --format '{{.Names}}' | grep -Eq "^${container_name}\$"; then
    echo "O contêiner ${container_name} já existe. Executando o contêiner..."
    docker start ${container_name}
else
    echo "O contêiner ${container_name} não existe. Criando o contêiner..."
    docker run -d --name ${container_name} -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=123456 -e POSTGRES_DB=ranking -p 5432:5432 postgres-db-test
fi

