#!/usr/bin/env bash
# M1 auth smoke test — requires API running on :8080 and DATABASE_URL set.
set -euo pipefail

BASE_URL="${API_URL:-http://localhost:8080}"
COOKIE_JAR="$(mktemp)"
USER="testuser_$(date +%s)"
EMAIL="${USER}@example.com"
PASS="password123"

cleanup() { rm -f "$COOKIE_JAR"; }
trap cleanup EXIT

code() {
  curl -s -o /tmp/deluxe-body.json -w "%{http_code}" "$@"
}

echo "Register..."
status=$(code -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"$USER\",\"email\":\"$EMAIL\",\"password\":\"$PASS\"}")
[[ "$status" == "201" ]] || { echo "Register failed: $status"; cat /tmp/deluxe-body.json; exit 1; }

echo "Login..."
status=$(code -c "$COOKIE_JAR" -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"login\":\"$EMAIL\",\"password\":\"$PASS\"}")
[[ "$status" == "200" ]] || { echo "Login failed: $status"; exit 1; }

echo "GET /users/me..."
status=$(code -b "$COOKIE_JAR" "$BASE_URL/users/me")
[[ "$status" == "200" ]] || { echo "Me failed: $status"; exit 1; }

echo "Logout..."
status=$(code -b "$COOKIE_JAR" -c "$COOKIE_JAR" -X POST "$BASE_URL/auth/logout")
[[ "$status" == "200" ]] || { echo "Logout failed: $status"; exit 1; }

echo "GET /users/me after logout (expect 401)..."
status=$(code -b "$COOKIE_JAR" "$BASE_URL/users/me")
[[ "$status" == "401" ]] || { echo "Expected 401, got $status"; exit 1; }

echo "M1 smoke test passed."
