import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  getPublicUserById,
  getUserTools,
  getCurrentUser,
} from '../controllers/usersController.js';
import { userIdSchema } from '../validations/usersValidation.js';

import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/api/users/me', authenticate, getCurrentUser);
router.get('/api/users/:userId', celebrate(userIdSchema), getPublicUserById);
router.get('/api/users/:userId/tools', celebrate(userIdSchema), getUserTools);

export default router;
