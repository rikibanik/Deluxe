# REST API

Express.js service for authentication, authorization, and repository metadata.

## Stack

- Node.js 20+
- Express 4
- PostgreSQL (`pg`)

## Layout

```
src/
├── auth/           # Sessions, password hashing, PAT validation
├── config/         # Environment configuration
├── db/             # PostgreSQL connection pool
├── gitstore/       # Read-only Git filesystem access
├── middleware/     # Auth, CORS, logging
├── models/         # JSDoc type definitions
├── repositories/   # Data access layer
├── routes/         # Express route handlers
├── services/       # Business logic
└── index.js        # Entry point
```

## Run locally

```bash
# from repo root
npm install
npm run dev:api
```

## Run standalone

```bash
cd apps/api
npm install
npm run dev
```
