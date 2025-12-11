import { Router } from 'express';
import {
  getPublicUserById,
  getUserTools,
} from '../controllers/usersController.js';

const router = Router();

router.get('/api/users/:userId', getPublicUserById);
router.get('/api/users/:userId/tools', getUserTools);

export default router;
