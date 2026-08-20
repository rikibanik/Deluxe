import { Router } from 'express';
import { requireSession } from '../middleware/auth.js';

const router = Router();

router.get('/me', requireSession, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default router;
