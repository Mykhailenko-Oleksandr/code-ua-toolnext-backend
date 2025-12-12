import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  getPublicUserById,
  getUserTools,
  getCurrentUser, // нова функція
} from '../controllers/usersController.js';
import { userIdSchema } from '../validations/usersValidation.js';

import { authenticate } from '../middleware/authenticate.js'; // твій готовий middleware

const router = Router();

router.get('/api/users/:userId', celebrate(userIdSchema), getPublicUserById);
router.get('/api/users/:userId/tools', celebrate(userIdSchema), getUserTools);

// новий приватний ендпоінт
router.get('/api/users/me', authenticate, getCurrentUser);

export default router;
