#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

if [[ -f "$ROOT/.env" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "$ROOT/.env"
  set +a
fi

mkdir -p "$ROOT/storage/repos"

echo "Starting Deluxe dev environment..."
echo "  API:      http://localhost:${API_PORT:-8080}"
echo "  Git HTTP: http://localhost:${GIT_HTTP_PORT:-9418}"
echo "  Web:      http://localhost:3000"
echo ""
echo "Run 'make migrate' after PostgreSQL is up."
echo ""
echo "Start services (in separate terminals):"
echo "  npm run dev:api"
echo "  npm run dev:git-http"
echo "  npm run dev:web"
echo ""
echo "Or use 'docker compose up' for containerized dev."
