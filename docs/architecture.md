# Architecture

> **Note:** [PROJECT.md](../PROJECT.md) is the source of truth. This file provides supplementary detail.

## System Context

Deluxe is a multi-service application that provides Git-based code hosting with a web interface.

## Services

| Service | Port | Responsibility |
|---------|------|----------------|
| **web** | 3000 | React/Next.js UI |
| **api** | 8080 | REST API, sessions, metadata |
| **git-http** | 9418 | Git smart HTTP protocol |
| **postgres** | 5432 | Metadata persistence |

## Data Stores

| Store | Contents |
|-------|----------|
| PostgreSQL | Users, sessions, tokens, repo metadata |
| Filesystem (`storage/repos`) | Bare Git repositories |

## Security Boundaries

- All Git operations require authentication (PAT or session-derived token).
- Private repos return 404 to unauthorized callers.
- Passwords and tokens stored as hashes only.
- Path traversal blocked at API and Git layers.

## Request Paths

### Web browse file

```
Browser → web → api GET /repos/:owner/:name/blob?path=...&ref=main
              → gitstore reads from bare repo
              → JSON response with content + language
```

### Git push

```
git CLI → git-http POST /:owner/:repo.git/git-receive-pack
        → auth middleware (PAT + repo_write scope)
        → git receive-pack subprocess or go-git
        → post-receive hook updates DB
```

See [data-model.md](data-model.md) for entity design and [project-structure.md](project-structure.md) for code layout.
