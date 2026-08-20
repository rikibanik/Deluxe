import crypto from 'crypto';

const TOKEN_BYTES = 32;

/**
 * @returns {string}
 */
export function generateSessionToken() {
  return crypto.randomBytes(TOKEN_BYTES).toString('base64url');
}

/**
 * @param {string} token
 * @returns {string}
 */
export function hashSessionToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}
