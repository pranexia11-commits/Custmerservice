import express from 'express';
import { register, login, me } from '../controllers/auth.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public auth routes
router.post('/register', register);
router.post('/login', login);

// Protected user profile route
router.get('/me', authenticateToken, me);

export default router;
