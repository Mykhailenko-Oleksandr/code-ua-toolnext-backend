import { Router } from 'express';
import { deleteTool, getToolById } from '../controllers/toolsController.js';
import { celebrate } from 'celebrate';
import { toolIdSchema } from '../validations/toolsValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/api/tools/:toolId', celebrate(toolIdSchema), getToolById);
router.delete(
  '/api/tools/:toolId',
  celebrate(toolIdSchema),
  authenticate,
  deleteTool,
);

export default router;
