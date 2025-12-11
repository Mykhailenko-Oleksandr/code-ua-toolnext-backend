import { Router } from 'express';
import { getToolById } from '../controllers/toolsController.js';
import { celebrate } from 'celebrate';
import { updateTool } from '../controllers/toolsController.js';
import { authenticate } from '../middleware/authenticate.js';
import { updateToolSchema } from '../validations/toolsValidation.js';
import { upload } from '../middleware/multer.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

const router = Router();

router.get('/api/tools/:toolId', getToolById);

router.patch(
  '/api/tools/:toolId', authenticate, upload.single('images'), saveFileToCloudinary, celebrate(updateToolSchema),
   updateTool
);

export default router;
