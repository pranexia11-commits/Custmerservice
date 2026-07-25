import express from 'express';
import { 
  getTickets, 
  createTicket, 
  updateTicket 
} from '../controllers/tickets.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// All ticket routes require authentication
router.use(authenticateToken);

router.get('/', getTickets);
router.post('/', createTicket);
router.put('/:id', requireRole(['admin']), updateTicket);

export default router;
