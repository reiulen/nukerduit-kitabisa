DOCKER_NAME=nukerduit
CURRENT_DIR=$(patsubst %/,%,$(dir $(realpath $(firstword $(MAKEFILE_LIST)))))
ROOT_DIR=$(CURRENT_DIR)
DOCKER_COMPOSE?=docker-compose
DOCKER_NAME_SERVICE=nukerduit-service
DOCKER_NAME_APP=nukerduit-app

.PHONY: build install dev up start first stop restart clear

build:
	$(DOCKER_COMPOSE) up --build --no-recreate -d

up:
	$(DOCKER_COMPOSE) up -d

start: up dev

first: build install dev

stop: $(ROOT_DIR)/docker-compose.yml
	$(DOCKER_COMPOSE) kill || true
	$(DOCKER_COMPOSE) rm --force || true

restart: stop start dev


# For Nukerduit Service
service_install:
	$(DOCKER_COMPOSE) exec $(DOCKER_NAME_SERVICE) composer install && \
    $(DOCKER_COMPOSE) exec $(DOCKER_NAME_SERVICE) php artisan key:generate && \
    $(DOCKER_COMPOSE) exec $(DOCKER_NAME_SERVICE) php artisan jwt:secret && \
    $(DOCKER_COMPOSE) exec $(DOCKER_NAME_SERVICE) php artisan migrate && \
    $(DOCKER_COMPOSE) exec $(DOCKER_NAME_SERVICE) php artisan db:seed
    $(DOCKER_COMPOSE) exec $(DOCKER_NAME_SERVICE) php artisan jwt:secret

service_update:
	$(DOCKER_COMPOSE) exec $(DOCKER_NAME_SERVICE) composer update
migrate:
	$(DOCKER_COMPOSE) exec $(DOCKER_NAME_SERVICE) php artisan migrate
seed:
	$(DOCKER_COMPOSE) exec $(DOCKER_NAME_SERVICE) php artisan db:seed
secret:
	$(DOCKER_COMPOSE) exec $(DOCKER_NAME_SERVICE) php artisan jwt:secret

#For Nukerduit APP
install_app:
	$(DOCKER_COMPOSE) exec $(DOCKER_NAME_APP) npm install

