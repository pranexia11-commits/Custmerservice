import express from 'express';
import { 
  getCRMRecords, 
  createCRMRecord, 
  updateCRMRecord 
} from '../controllers/crm.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Restrict all CRM endpoints to admin only
router.use(authenticateToken, requireRole(['admin']));

router.get('/', getCRMRecords);
router.post('/', createCRMRecord);
router.put('/:id', updateCRMRecord);

export default router;
