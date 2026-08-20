import { Router } from 'express';
import * as authService from '../services/authService.js';
import {
  clearSessionCookie,
  requireSession,
  setSessionCookie,
} from '../middleware/auth.js';

const router = Router();

router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body ?? {};
    const user = await authService.register({ username, email, password });
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { login, email, password } = req.body ?? {};
    const identifier = login ?? email;
    const result = await authService.login({
      login: identifier,
      password,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    });

    setSessionCookie(res, result.token, result.expiresAt);
    res.status(200).json({ user: result.user });
  } catch (err) {
    next(err);
  }
});

router.post('/logout', requireSession, async (req, res, next) => {
  try {
    await authService.logout(req.session.id);
    clearSessionCookie(res);
    res.status(200).json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
