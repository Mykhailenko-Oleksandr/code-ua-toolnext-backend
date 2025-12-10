import { Router } from 'express';
import { getToolById } from '../controllers/toolsController.js';

const router = Router();

router.get('/api/tools/:toolId', getToolById);

export default router;
