import { Router } from 'express';
import { getAllTools, getToolById } from '../controllers/toolsController.js';

const router = Router();

router.get('/api/tools', getAllTools);
router.get('/api/tools/:toolId', getToolById);

export default router;
