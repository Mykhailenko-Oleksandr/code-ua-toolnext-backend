import { Router } from 'express';
import { upload } from '../middleware/multer.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

import { deleteTool, getToolById, updateTool } from '../controllers/toolsController.js';
import { celebrate } from 'celebrate';
import { toolIdSchema, updateToolSchema } from '../validations/toolsValidation.js';
import { authenticate } from '../middleware/authenticate.js';


const router = Router();

router.get('/api/tools/:toolId', celebrate(toolIdSchema), getToolById);
router.delete(
  '/api/tools/:toolId',
  authenticate,
  celebrate(toolIdSchema),
  deleteTool,
);

router.patch(
  '/api/tools/:toolId', authenticate, upload.single('images'), saveFileToCloudinary, celebrate(updateToolSchema),
   updateTool
);

export default router;
