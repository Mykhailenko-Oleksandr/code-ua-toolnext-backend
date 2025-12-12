import { Router } from 'express';
import { celebrate } from 'celebrate';
import { upload } from '../middleware/multer.js';
import { authenticate } from '../middleware/authenticate.js';
import {
  deleteTool,
  getToolById,
  updateTool,
  getAllTools,
} from '../controllers/toolsController.js';
import {
  toolIdSchema,
  updateToolSchema,
} from '../validations/toolsValidation.js';

const router = Router();

router.get('/api/tools', getAllTools);
router.get('/api/tools/:toolId', celebrate(toolIdSchema), getToolById);
router.delete(
  '/api/tools/:toolId',
  authenticate,
  celebrate(toolIdSchema),
  deleteTool,
);

router.patch(
  '/api/tools/:toolId',
  authenticate,
  upload.single('image'),
  celebrate(updateToolSchema),
  updateTool,
);

export default router;
