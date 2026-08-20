# Git HTTP Server

Express.js service for Git smart HTTP — clone, pull, and push operations.

## Stack

- Node.js 20+
- Express 4
- PostgreSQL (`pg`)

## URL pattern

```
https://localhost:9418/{owner}/{repo}.git
```

## Auth

Personal access token via `Authorization: Bearer pat_...` or Git credential helper.

## Layout

```
src/
├── auth/       # PAT validation + repo ACL
├── config/     # Environment configuration
├── db/         # PostgreSQL connection pool
├── hook/       # Post-receive metadata sync
├── middleware/ # Logging
├── protocol/   # upload-pack / receive-pack
└── index.js    # Entry point
```

## Run locally

```bash
# from repo root
npm install
npm run dev:git-http
```

## Run standalone

```bash
cd apps/git-http
npm install
npm run dev
```
