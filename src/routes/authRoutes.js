import { celebrate } from 'celebrate';
import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';
import {
  loginUserSchema,
  registerSchema,
} from '../validations/authValidation.js';
import { logoutUser } from '../controllers/authController.js';

const router = Router();

router.post('/api/auth/register', celebrate(registerSchema), registerUser);

router.post('/api/auth/login', celebrate(loginUserSchema), loginUser);

router.post('/api/auth/logout', logoutUser);

export default router;
