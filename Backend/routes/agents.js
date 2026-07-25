import express from 'express';
import { 
  getAgents, 
  updateAgentStatus 
} from '../controllers/agents.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Restrict all Agents endpoints to admin only
router.use(authenticateToken, requireRole(['admin']));

router.get('/', getAgents);
router.put('/:name/status', updateAgentStatus);

export default router;
