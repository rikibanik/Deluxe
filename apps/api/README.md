# REST API

Authentication, authorization, and repository metadata service.

## Layout

```
internal/
├── auth/         # Sessions, JWT, PAT, password hashing
├── config/       # Environment configuration
├── db/           # PostgreSQL connection
├── gitstore/     # Read-only Git filesystem access
├── handler/      # HTTP handlers
├── middleware/   # Auth, CORS, logging
├── model/        # Domain types
├── repository/   # Data access layer
└── service/      # Business logic
```

## Run locally

```bash
go run ./cmd/server
```
