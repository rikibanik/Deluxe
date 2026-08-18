# Git HTTP Server

Git smart HTTP service for clone, pull, and push operations.

## URL pattern

```
/{owner}/{repo}.git
```

## Auth

Personal access token via `Authorization: Bearer pat_...` or Git credential helper.

## Run locally

```bash
go run ./cmd/server
```
