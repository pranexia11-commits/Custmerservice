import express from 'express';
import { 
  triggerSOS, 
  getActiveSOSCount, 
  simulateBulkSOS 
} from '../controllers/sos.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Restrict all SOS endpoints to admin only
router.use(authenticateToken, requireRole(['admin']));

router.post('/trigger', triggerSOS);
router.get('/active-count', getActiveSOSCount);
router.post('/simulate-bulk', simulateBulkSOS);

export default router;
