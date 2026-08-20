import { hashPassword, verifyPassword } from '../auth/password.js';
import { generateSessionToken, hashSessionToken } from '../auth/session.js';
import config from '../config/index.js';
import {
  ConflictError,
  ForbiddenError,
  UnauthorizedError,
  ValidationError,
} from '../errors/AppError.js';
import * as sessionRepo from '../repositories/sessionRepository.js';
import * as userRepo from '../repositories/userRepository.js';
import { parseTtl } from '../utils/ttl.js';
import { toPublicUser } from '../utils/user.js';
import {
  validateEmail,
  validateLogin,
  validatePassword,
  validateUsername,
} from '../utils/validation.js';

/**
 * @param {{ username: string, email: string, password: string }} input
 */
export async function register({ username, email, password }) {
  try {
    validateUsername(username);
    validateEmail(email);
    validatePassword(password);
  } catch (err) {
    throw new ValidationError(err.message);
  }

  const existingUsername = await userRepo.findByUsername(username);
  if (existingUsername) {
    throw new ConflictError('Username is already taken');
  }

  const existingEmail = await userRepo.findByEmail(email);
  if (existingEmail) {
    throw new ConflictError('Email is already registered');
  }

  const passwordHash = await hashPassword(password);

  try {
    const user = await userRepo.createUser({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
    });
    return toPublicUser(user);
  } catch (err) {
    if (err.code === '23505') {
      throw new ConflictError('Username or email is already in use');
    }
    throw err;
  }
}

/**
 * @param {{ login: string, password: string, ipAddress?: string | null, userAgent?: string | null }} input
 */
export async function login({ login, password, ipAddress, userAgent }) {
  try {
    validateLogin(login);
    validatePassword(password);
  } catch {
    throw new UnauthorizedError('Invalid email or password');
  }

  const user = await userRepo.findByLogin(login);
  if (!user) {
    throw new UnauthorizedError('Invalid email or password');
  }

  if (user.status === 'suspended') {
    throw new ForbiddenError('Account is suspended');
  }

  if (user.status !== 'active') {
    throw new UnauthorizedError('Invalid email or password');
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const token = generateSessionToken();
  const tokenHash = hashSessionToken(token);
  const expiresAt = new Date(Date.now() + parseTtl(config.sessionTtl));

  const session = await sessionRepo.createSession({
    userId: user.id,
    tokenHash,
    expiresAt,
    ipAddress,
    userAgent,
  });

  await userRepo.updateLastLogin(user.id);

  return {
    token,
    session,
    user: toPublicUser(user),
    expiresAt,
  };
}

/**
 * @param {string} sessionId
 */
export async function logout(sessionId) {
  await sessionRepo.revokeSession(sessionId);
}
