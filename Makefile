DOCKER_NAME=nukerduit
CURRENT_DIR=$(patsubst %/,%,$(dir $(realpath $(firstword $(MAKEFILE_LIST)))))
ROOT_DIR=$(CURRENT_DIR)
DOCKER_COMPOSE?=docker-compose
DOCKER_NAME_SERVICE=nukerduit-service

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

