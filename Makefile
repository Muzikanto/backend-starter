CON_SERVER	    := server
VERSION         ?= latest
BRANCH		    ?= production
REGISTRY	    := registry.gitlab.com/muzikanto/test
INFRASTRUCTURE_NAME=backend

# initialize

init:
	cp ./apps/gateway/.env.sample ./apps/gateway/.env && \
	cp ./apps/worker/.env.sample ./apps/worker/.env \
	cp ./apps/elastic/.env.infrastructure.sample ./apps/elastic/.env.infrastructure && \
	cp ./apps/keycloak/.env.infrastructure.sample ./apps/keycloak/.env.infrastructure && \
	cp ./apps/loki/.env.infrastructure.sample ./apps/loki/.env.infrastructure && \
	cp ./apps/metrics/.env.infrastructure.sample ./apps/metrics/.env.infrastructure && \
	cp ./apps/minio/.env.infrastructure.sample ./apps/minio/.env.infrastructure && \
	cp ./apps/postgres/.env.infrastructure.sample ./apps/postgres/.env.infrastructure && \
	cp ./apps/rabbitmq/.env.infrastructure.sample ./apps/rabbitmq/.env.infrastructure && \
	cp ./apps/redis/.env.infrastructure.sample ./apps/redis/.env.infrastructure

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

