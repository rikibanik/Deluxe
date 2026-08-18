#!/usr/bin/env bash
# Initialize a bare Git repository on the filesystem.
# Called by the API after inserting a repository row.
set -euo pipefail

STORAGE_PATH="${1:?Usage: init-repo.sh <storage_path>}"

mkdir -p "$(dirname "$STORAGE_PATH")"
git init --bare "$STORAGE_PATH"
echo "Initialized bare repo at $STORAGE_PATH"
