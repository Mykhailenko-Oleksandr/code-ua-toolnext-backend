import { celebrate } from 'celebrate';
import { Router } from 'express';
import { loginUser } from '../controllers/authController.js';
import { loginUserSchema } from '../validations/authValidation.js';
import { logoutUser } from '../controllers/authController.js';

const router = Router();

router.post('/auth/login', celebrate(loginUserSchema), loginUser);

router.post('/api/auth/logout', logoutUser);

export default router;
