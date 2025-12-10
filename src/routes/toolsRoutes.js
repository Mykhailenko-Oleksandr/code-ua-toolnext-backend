import { Router } from 'express';
import { getToolById } from '../controllers/toolsController.js';

const router = Router();

router.get('/api/tools/:toolId', getToolById);

// ПРИВАТНИЙ — створення нового інструменту
router.post('/api/tools', authenticate, createTool);

export default router;
