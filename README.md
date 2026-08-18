# Deluxe — Code Hosting Platform

A GitHub-like platform for storing, versioning, and browsing code.

## Monorepo Layout

```
.
├── apps/
│   ├── api/          # REST API: auth, users, repo metadata
│   ├── git-http/     # Git smart HTTP: clone, push, pull
│   └── web/          # Web UI: browse repos, view files
├── db/
│   └── migrations/   # PostgreSQL schema migrations
├── docs/             # Architecture and design docs
├── scripts/          # Dev and ops scripts
└── storage/
    └── repos/        # Bare Git repositories (runtime, gitignored)
```

## Quick Start

```bash
cp .env.example .env
docker compose up -d postgres
make migrate
make dev
```

| Service   | URL                      |
|-----------|--------------------------|
| Web UI    | http://localhost:3000    |
| REST API  | http://localhost:8080    |
| Git HTTP  | http://localhost:9418    |

## MVP Scope

- User registration and login
- Create repositories (public / private)
- Git push, pull, clone via HTTPS + personal access token
- Web file browser with syntax highlighting

See [docs/project-structure.md](docs/project-structure.md) for the full breakdown.
