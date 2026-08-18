# Data Model

See the planning document for full entity definitions. Summary:

## Core Entities

- **users** — identity and credentials
- **sessions** — web login sessions
- **personal_access_tokens** — Git/API authentication
- **ssh_public_keys** — SSH Git auth (post-MVP or optional)
- **repositories** — metadata pointing to bare repos on disk

## Key Relationships

- User **owns** many Repositories (1:N)
- User **has** many Sessions, PATs, SSH keys (1:N)
- Repository **maps to** one bare Git directory on filesystem (1:1)

## Migrations

Schema is defined in `db/migrations/`. Apply with:

```bash
make migrate
```
