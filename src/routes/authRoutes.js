// import { celebrate } from 'celebrate';
import { Router } from 'express';
import { logoutUser } from '../controllers/authController.js';

const router = Router();

router.post('/api/auth/logout', logoutUser);

export default router;
