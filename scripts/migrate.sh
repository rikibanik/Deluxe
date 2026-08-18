#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MIGRATIONS_DIR="$ROOT/db/migrations"

DATABASE_URL="${DATABASE_URL:-postgres://codehost:codehost@localhost:5432/codehost?sslmode=disable}"
DIRECTION="${1:-up}"

if ! command -v psql &>/dev/null; then
  echo "psql is required. Install PostgreSQL client or run migrations via Docker."
  exit 1
fi

run_file() {
  local file="$1"
  echo "Applying: $(basename "$file")"
  psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$file"
}

if [[ "$DIRECTION" == "up" ]]; then
  for file in "$MIGRATIONS_DIR"/*.up.sql; do
    [[ -f "$file" ]] || continue
    run_file "$file"
  done
  echo "Migrations applied."
elif [[ "$DIRECTION" == "down" ]]; then
  for file in $(ls -r "$MIGRATIONS_DIR"/*.down.sql 2>/dev/null); do
    [[ -f "$file" ]] || continue
    run_file "$file"
  done
  echo "Migrations rolled back."
else
  echo "Usage: $0 [up|down]"
  exit 1
fi
