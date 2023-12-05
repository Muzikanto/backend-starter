CON_SERVER	    := server
VERSION         ?= latest
BRANCH		    ?= production
REGISTRY	    := registry.gitlab.com/muzikanto/test

# dev
watch:
	npm run start:dev

# infrastructure

upInfra:
	docker-compose -f ./deploy/docker-compose.infrastructure.yml -p twilight up -d postgres rabbitmq redis

upInfraFull:
	docker-compose -f ./deploy/docker-compose.infrastructure.yml -p twilight up -d prometheus pushgateway grafana elasticsearch alertmanager

downInfra:
	docker-compose -f ./deploy/docker-compose.infrastructure.yml down

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

