import express from 'express';
import { 
  connectCall, 
  getCallHistory, 
  getActiveCalls, 
  getCallDetails, 
  connectCustomerWebhook, 
  incomingCallWebhook, 
  statusWebhook 
} from '../controllers/calls.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// REST endpoints for calls management (Admin only)
router.post('/connect', authenticateToken, requireRole(['admin']), connectCall);
router.get('/history', authenticateToken, requireRole(['admin']), getCallHistory);
router.get('/active', authenticateToken, requireRole(['admin']), getActiveCalls);
router.get('/:sid', authenticateToken, requireRole(['admin']), getCallDetails);

// Webhook endpoints for Exotel integration (Public)
router.all('/webhooks/connect-customer', connectCustomerWebhook);
router.all('/webhooks/incoming', incomingCallWebhook);
router.post('/webhooks/status', statusWebhook);

export default router;
