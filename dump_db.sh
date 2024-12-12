#!/bin/bash



# Load .env file
if [ -f .env ]; then
    source .env
else
    echo ".env file not found!"
    exit 1
fi

CONTAINER_NAME="agrimas-next-mysql"


# Extract DATABASE_URL parts
USER=$(echo $DATABASE_URL | sed -r 's/mysql:\/\/([^:]+):.*/\1/')
PASSWORD=$(echo $DATABASE_URL | sed -r 's/mysql:\/\/[^:]+:([^@]+)@.*/\1/')
HOST=$(echo $DATABASE_URL | sed -r 's/mysql:\/\/[^@]+@([^:]+):.*/\1/')
PORT=$(echo $DATABASE_URL | sed -r 's/.*:([0-9]+)\/.*/\1/')
DATABASE=$(echo $DATABASE_URL | sed -r 's/.*\/([^?]+).*/\1/')


# Run mysqldump

docker exec -i $CONTAINER_NAME mysqldump -u $USER -h $HOST -p -P $PORT $DATABASE > dump.sql
# mysqldump -u $USER -p$PASSWORD -h $HOST -P $PORT $DATABASE > dump.sql





if [ $? -eq 0 ]; then
    echo "Database dump saved to dump.sql"
else
    echo "Failed to dump database"
    exit 1
fi

unset MYSQL_PWD