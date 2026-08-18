-- 002_tokens.up.sql
-- Personal access tokens and SSH public keys

CREATE TYPE token_scope AS ENUM ('repo_read', 'repo_write', 'api');
CREATE TYPE ssh_key_type AS ENUM ('ssh-rsa', 'ssh-ed25519', 'ecdsa-sha2-nistp256');

CREATE TABLE personal_access_tokens (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID         NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name            VARCHAR(100) NOT NULL,
    token_prefix    CHAR(8)      NOT NULL,
    token_hash      CHAR(64)     NOT NULL,
    scopes          token_scope[] NOT NULL DEFAULT '{repo_read,repo_write}',
    expires_at      TIMESTAMPTZ,
    last_used_at    TIMESTAMPTZ,
    revoked_at      TIMESTAMPTZ,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),

    CONSTRAINT pat_name_nonempty_chk
        CHECK (LENGTH(TRIM(name)) > 0),
    CONSTRAINT pat_scopes_nonempty_chk
        CHECK (cardinality(scopes) > 0)
);

CREATE UNIQUE INDEX pat_token_hash_uk
    ON personal_access_tokens (token_hash)
    WHERE revoked_at IS NULL;

CREATE INDEX pat_user_id_idx ON personal_access_tokens (user_id);

CREATE TABLE ssh_public_keys (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID         NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title           VARCHAR(100) NOT NULL,
    key_type        ssh_key_type NOT NULL,
    public_key      TEXT         NOT NULL,
    fingerprint     CHAR(47)     NOT NULL,
    last_used_at    TIMESTAMPTZ,
    revoked_at      TIMESTAMPTZ,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX ssh_fingerprint_uk
    ON ssh_public_keys (fingerprint)
    WHERE revoked_at IS NULL;

CREATE INDEX ssh_user_id_idx ON ssh_public_keys (user_id);
