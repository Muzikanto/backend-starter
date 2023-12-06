CON_SERVER	    := server
VERSION         ?= latest
BRANCH		    ?= production
REGISTRY	    := registry.gitlab.com/muzikanto/test
INFRASTRUCTURE_NAME=backend

# scripts
watch:
	npm run start:dev

# infrastructure up

upPostgres:
	docker-compose -f ./deploy/postgres/docker-compose.postgres.yml -p ${INFRASTRUCTURE_NAME} up -d postgres

upRabbit:
	docker-compose -f ./deploy/rabbitmq/docker-compose.rabbitmq.yml -p ${INFRASTRUCTURE_NAME} up -d

upRedis:
	docker-compose -f ./deploy/redis/docker-compose.redis.yml -p ${INFRASTRUCTURE_NAME} up -d

upElastic:
	docker-compose -f ./deploy/elastic/docker-compose.elastic.yml -p ${INFRASTRUCTURE_NAME} up -d

upMinio:
	docker-compose -f ./deploy/minio/docker-compose.minio.yml -p ${INFRASTRUCTURE_NAME} up -d

upKeycloak:
	docker-compose -f ./deploy/keycloak/docker-compose.keycloak.yml -p ${INFRASTRUCTURE_NAME} up -d

# infrastructure down

downPostgres:
	docker-compose -f ./deploy/postgres/docker-compose.postgres.yml -p ${INFRASTRUCTURE_NAME} down -d postgres

downRabbit:
	docker-compose -f ./deploy/rabbitmq/docker-compose.rabbitmq.yml -p ${INFRASTRUCTURE_NAME} down

downRedis:
	docker-compose -f ./deploy/redis/docker-compose.redis.yml -p ${INFRASTRUCTURE_NAME} down

downElastic:
	docker-compose -f ./deploy/elastic/docker-compose.elastic.yml -p ${INFRASTRUCTURE_NAME} down

downMinio:
	docker-compose -f ./deploy/minio/docker-compose.minio.yml -p ${INFRASTRUCTURE_NAME} down

downKeycloak:
	docker-compose -f ./deploy/keycloak/docker-compose.keycloak.yml -p ${INFRASTRUCTURE_NAME} down

# docker

build:
	docker \
		build \
		-f Dockerfile \
		--tag=${REGISTRY}/${CON_SERVER}:${BRANCH} \
		--tag=${REGISTRY}/${CON_SERVER}:${VERSION} \
		.

upload:
	docker push ${REGISTRY}/${CON_SERVER}:${BRANCH}
	docker push ${REGISTRY}/${CON_SERVER}:${VERSION}

# test: testServer testComponents testWidgets

push: build upload

