-- 001_init.up.sql
-- Core tables: users, sessions, repositories

CREATE TYPE user_status AS ENUM ('pending', 'active', 'suspended', 'deleted');
CREATE TYPE repo_visibility AS ENUM ('public', 'private');

CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username        VARCHAR(39)  NOT NULL,
    email           VARCHAR(255) NOT NULL,
    email_verified  BOOLEAN      NOT NULL DEFAULT FALSE,
    password_hash   VARCHAR(255) NOT NULL,
    display_name    VARCHAR(100),
    avatar_url      TEXT,
    status          user_status  NOT NULL DEFAULT 'pending',
    last_login_at   TIMESTAMPTZ,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ,

    CONSTRAINT users_username_format_chk
        CHECK (username ~ '^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$'),
    CONSTRAINT users_email_format_chk
        CHECK (email ~* '^[^@]+@[^@]+\.[^@]+$')
);

CREATE UNIQUE INDEX users_username_uk
    ON users (LOWER(username))
    WHERE deleted_at IS NULL;

CREATE UNIQUE INDEX users_email_uk
    ON users (LOWER(email))
    WHERE deleted_at IS NULL;

CREATE INDEX users_status_idx ON users (status);

CREATE TABLE sessions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID         NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash      CHAR(64)     NOT NULL,
    ip_address      INET,
    user_agent      TEXT,
    expires_at      TIMESTAMPTZ  NOT NULL,
    revoked_at      TIMESTAMPTZ,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    last_seen_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),

    CONSTRAINT sessions_expiry_future_chk
        CHECK (expires_at > created_at)
);

CREATE UNIQUE INDEX sessions_token_hash_uk
    ON sessions (token_hash)
    WHERE revoked_at IS NULL;

CREATE INDEX sessions_user_id_idx ON sessions (user_id);
CREATE INDEX sessions_expires_at_idx ON sessions (expires_at);

CREATE TABLE repositories (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id        UUID             NOT NULL REFERENCES users(id),
    name            VARCHAR(100)     NOT NULL,
    description     TEXT,
    visibility      repo_visibility  NOT NULL DEFAULT 'private',
    default_branch  VARCHAR(255)     NOT NULL DEFAULT 'main',
    storage_path    TEXT             NOT NULL,
    is_empty        BOOLEAN          NOT NULL DEFAULT TRUE,
    size_bytes      BIGINT           NOT NULL DEFAULT 0,
    pushed_at       TIMESTAMPTZ,
    created_at      TIMESTAMPTZ      NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ      NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ,

    CONSTRAINT repos_name_format_chk
        CHECK (name ~ '^[a-zA-Z0-9._-]+$' AND name !~ '^[-.]' AND name !~ '[-.]$'),
    CONSTRAINT repos_name_reserved_chk
        CHECK (LOWER(name) NOT IN ('settings', 'admin', 'api', 'new', 'login', 'signup')),
    CONSTRAINT repos_size_nonneg_chk
        CHECK (size_bytes >= 0)
);

CREATE UNIQUE INDEX repos_owner_name_uk
    ON repositories (owner_id, LOWER(name))
    WHERE deleted_at IS NULL;

CREATE INDEX repos_owner_id_idx ON repositories (owner_id) WHERE deleted_at IS NULL;

CREATE INDEX repos_public_recent_idx
    ON repositories (pushed_at DESC NULLS LAST)
    WHERE visibility = 'public' AND deleted_at IS NULL;

CREATE UNIQUE INDEX repos_storage_path_uk ON repositories (storage_path);
