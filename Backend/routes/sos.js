import express from 'express';
import { 
  triggerSOS, 
  getActiveSOSCount, 
  simulateBulkSOS 
} from '../controllers/sos.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Require authenticated token for all SOS routes
router.use(authenticateToken);

// Trigger SOS is accessible to both admin and customer roles
router.post('/trigger', requireRole(['admin', 'customer']), triggerSOS);

// Admin-only endpoints
router.get('/active-count', requireRole(['admin']), getActiveSOSCount);
router.post('/simulate-bulk', requireRole(['admin']), simulateBulkSOS);

export default router;
