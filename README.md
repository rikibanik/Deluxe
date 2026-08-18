# Deluxe — Code Hosting Platform

A GitHub-like platform for storing, versioning, and browsing code.

> **Source of truth:** [PROJECT.md](PROJECT.md) — requirements, architecture, data model, and scope.
> **Delivery plan:** [MILESTONES.md](MILESTONES.md) — sequenced milestones and acceptance criteria.

## Monorepo Layout

```
.
├── apps/
│   ├── api/          # Express.js REST API: auth, users, repo metadata
│   ├── git-http/     # Express.js Git smart HTTP: clone, push, pull
│   └── web/          # Next.js UI: browse repos, view files
├── db/
│   └── migrations/   # PostgreSQL schema migrations
├── docs/             # Architecture and design docs
├── scripts/          # Dev and ops scripts
└── storage/
    └── repos/        # Bare Git repositories (runtime, gitignored)
```

## Stack

| Layer | Technology |
|-------|------------|
| API | Node.js 20+, Express 4, JavaScript |
| Git HTTP | Node.js 20+, Express 4, JavaScript |
| Web | Next.js 15, React 19, TypeScript |
| Database | PostgreSQL 16 |

## Quick Start

```bash
cp .env.example .env
npm install
docker compose up -d postgres
make migrate

# Start each service (separate terminals)
npm run dev:api
npm run dev:git-http
npm run dev:web
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

See [PROJECT.md](PROJECT.md) for the full specification and [docs/project-structure.md](docs/project-structure.md) for code layout details.
