.PHONY: dev up down migrate migrate-down test lint

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
	cd apps/api && go test ./...
	cd apps/git-http && go test ./...
	cd apps/web && npm test

lint:
	cd apps/api && go vet ./...
	cd apps/git-http && go vet ./...
