.PHONY: dev up down migrate migrate-down test lint install

install:
	npm install

dev:
	./scripts/dev.sh

up:
	docker compose up -d

down:
	docker compose down

migrate:
	./scripts/migrate.sh up

migrate-down:
	./scripts/migrate.sh down

test:
	npm test

lint:
	npm run lint
