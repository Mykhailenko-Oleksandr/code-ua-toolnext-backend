import { Router } from 'express';
import { getAllCategories } from '../controllers/categoriesController.js';

const router = Router();

router.get('/api/categories', getAllCategories);

export default router;
