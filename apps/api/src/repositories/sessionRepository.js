import { getPool } from '../db/postgres.js';

/**
 * @param {{ userId: string, tokenHash: string, expiresAt: Date, ipAddress?: string | null, userAgent?: string | null }} data
 * @returns {Promise<import('pg').QueryResultRow>}
 */
export async function createSession({
  userId,
  tokenHash,
  expiresAt,
  ipAddress = null,
  userAgent = null,
}) {
  const { rows } = await getPool().query(
    `INSERT INTO sessions (user_id, token_hash, expires_at, ip_address, user_agent)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, user_id, expires_at, created_at`,
    [userId, tokenHash, expiresAt, ipAddress, userAgent]
  );
  return rows[0];
}

/**
 * @param {string} tokenHash
 * @returns {Promise<(import('pg').QueryResultRow & { user_status: string }) | null>}
 */
export async function findActiveByTokenHash(tokenHash) {
  const { rows } = await getPool().query(
    `SELECT s.id, s.user_id, s.expires_at,
            u.id, u.username, u.email, u.email_verified, u.display_name,
            u.status AS user_status, u.created_at
     FROM sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.token_hash = $1
       AND s.revoked_at IS NULL
       AND s.expires_at > NOW()
       AND u.deleted_at IS NULL`,
    [tokenHash]
  );
  return rows[0] ?? null;
}

/**
 * @param {string} sessionId
 * @returns {Promise<void>}
 */
export async function revokeSession(sessionId) {
  await getPool().query(
    `UPDATE sessions SET revoked_at = NOW() WHERE id = $1 AND revoked_at IS NULL`,
    [sessionId]
  );
}

/**
 * @param {string} sessionId
 * @returns {Promise<void>}
 */
export async function touchSession(sessionId) {
  await getPool().query(
    `UPDATE sessions SET last_seen_at = NOW() WHERE id = $1`,
    [sessionId]
  );
}
