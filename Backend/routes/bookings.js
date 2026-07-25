import express from 'express';
import { 
  getBookings, 
  createBooking, 
  updateBooking 
} from '../controllers/bookings.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// All booking routes require authentication
router.use(authenticateToken);

router.get('/', getBookings);
router.post('/', createBooking);
router.put('/:id', requireRole(['admin']), updateBooking);

export default router;
