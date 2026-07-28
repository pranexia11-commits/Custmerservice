import express from 'express';
import { register, login, me, registerAdmin, loginAdmin, registerCustomer, loginCustomer } from '../controllers/auth.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// General public auth routes
router.post('/register', register);
router.post('/login', login);

// Admin dedicated routes
router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);

// Customer Support dedicated routes
router.post('/customer/register', registerCustomer);
router.post('/customer/login', loginCustomer);

// Protected user profile route
router.get('/me', authenticateToken, me);

export default router;

