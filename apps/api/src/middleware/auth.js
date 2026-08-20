import config from '../config/index.js';
import { hashSessionToken } from '../auth/session.js';
import { UnauthorizedError, ForbiddenError } from '../errors/AppError.js';
import * as sessionRepo from '../repositories/sessionRepository.js';
import { toPublicUser } from '../utils/user.js';

const COOKIE_NAME = 'deluxe_session';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function loadSession(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) {
    return next();
  }

  try {
    const tokenHash = hashSessionToken(token);
    const session = await sessionRepo.findActiveByTokenHash(tokenHash);
    if (!session) {
      return next();
    }

    if (session.user_status === 'suspended') {
      return next(new ForbiddenError('Account is suspended'));
    }

    if (session.user_status !== 'active') {
      return next();
    }

    req.session = {
      id: session.id,
      userId: session.user_id,
      expiresAt: session.expires_at,
    };
    req.user = toPublicUser(session);
    sessionRepo.touchSession(session.id).catch(() => {});
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export function requireSession(req, res, next) {
  if (!req.user || !req.session) {
    return next(new UnauthorizedError());
  }
  next();
}

/**
 * @param {import('express').Response} res
 * @param {string} token
 * @param {Date} expiresAt
 */
export function setSessionCookie(res, token, expiresAt) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });
}

/**
 * @param {import('express').Response} res
 */
export function clearSessionCookie(res) {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

export function requirePat(_req, _res, next) {
  // TODO (M2): validate personal access token
  next();
}
