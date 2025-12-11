import { Router } from 'express';
// import { getToolById } from '../controllers/toolsController.js';
import { celebrate } from 'celebrate';

import { updateTool } from '../controllers/toolsController.js';
import { authenticate } from '../middleware/authenticate.js';
import { updateToolSchema } from '../validations/toolsValidation.js';

const router = Router();

// router.get('/api/tools/:toolId', getToolById);

router.patch(
  'api/tools/:toolId', authenticate, celebrate(updateToolSchema),
   updateTool
);

export default router;
