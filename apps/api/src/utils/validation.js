const USERNAME_RE = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
const EMAIL_RE = /^[^@]+@[^@]+\.[^@]+$/;
const MIN_PASSWORD_LENGTH = 8;

/**
 * @param {string} username
 */
export function validateUsername(username) {
  if (!username || typeof username !== 'string') {
    throw new Error('Username is required');
  }

  const trimmed = username.trim();
  if (!USERNAME_RE.test(trimmed)) {
    throw new Error(
      'Username must be 1–39 characters, alphanumeric or hyphens, and cannot start or end with a hyphen'
    );
  }
}

/**
 * @param {string} email
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    throw new Error('Email is required');
  }

  const trimmed = email.trim();
  if (!EMAIL_RE.test(trimmed)) {
    throw new Error('Email format is invalid');
  }
}

/**
 * @param {string} password
 */
export function validatePassword(password) {
  if (!password || typeof password !== 'string') {
    throw new Error('Password is required');
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
  }
}

/**
 * @param {string} login
 */
export function validateLogin(login) {
  if (!login || typeof login !== 'string' || !login.trim()) {
    throw new Error('Login is required');
  }
}
