import { getPool } from '../db/postgres.js';

/**
 * @param {string} username
 * @returns {Promise<import('pg').QueryResultRow | null>}
 */
export async function findByUsername(username) {
  const { rows } = await getPool().query(
    `SELECT id, username, email, email_verified, password_hash, display_name,
            avatar_url, status, last_login_at, created_at, updated_at, deleted_at
     FROM users
     WHERE LOWER(username) = LOWER($1) AND deleted_at IS NULL`,
    [username.trim()]
  );
  return rows[0] ?? null;
}

/**
 * @param {string} email
 * @returns {Promise<import('pg').QueryResultRow | null>}
 */
export async function findByEmail(email) {
  const { rows } = await getPool().query(
    `SELECT id, username, email, email_verified, password_hash, display_name,
            avatar_url, status, last_login_at, created_at, updated_at, deleted_at
     FROM users
     WHERE LOWER(email) = LOWER($1) AND deleted_at IS NULL`,
    [email.trim()]
  );
  return rows[0] ?? null;
}

/**
 * @param {string} login - email or username
 * @returns {Promise<import('pg').QueryResultRow | null>}
 */
export async function findByLogin(login) {
  const trimmed = login.trim();
  if (trimmed.includes('@')) {
    return findByEmail(trimmed);
  }
  return findByUsername(trimmed);
}

/**
 * @param {string} id
 * @returns {Promise<import('pg').QueryResultRow | null>}
 */
export async function findById(id) {
  const { rows } = await getPool().query(
    `SELECT id, username, email, email_verified, display_name,
            avatar_url, status, last_login_at, created_at, updated_at
     FROM users
     WHERE id = $1 AND deleted_at IS NULL`,
    [id]
  );
  return rows[0] ?? null;
}

/**
 * @param {{ username: string, email: string, passwordHash: string }} data
 * @returns {Promise<import('pg').QueryResultRow>}
 */
export async function createUser({ username, email, passwordHash }) {
  const { rows } = await getPool().query(
    `INSERT INTO users (username, email, password_hash, status, email_verified)
     VALUES ($1, $2, $3, 'active', false)
     RETURNING id, username, email, email_verified, display_name, status, created_at`,
    [username.trim(), email.trim().toLowerCase(), passwordHash]
  );
  return rows[0];
}

/**
 * @param {string} userId
 * @returns {Promise<void>}
 */
export async function updateLastLogin(userId) {
  await getPool().query(
    `UPDATE users SET last_login_at = NOW(), updated_at = NOW() WHERE id = $1`,
    [userId]
  );
}
