docker-compose -f ./docker-compose.yml pull
docker-compose -f ./docker-compose.yml build
docker-compose -f ./docker-compose.yml down
docker-compose -f ./docker-compose.yml up -d
