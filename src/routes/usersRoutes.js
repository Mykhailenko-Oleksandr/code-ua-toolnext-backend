import { Router } from "express";
import { celebrate } from "celebrate";

import {
  getPublicUserById,
  getUserTools,
  getCurrentUser,
  getUserFeedbacks,
} from "../controllers/usersController.js";
import {
  userIdSchema,
  userToolsSchema,
  userFeedbacksSchema,
} from "../validations/usersValidation.js";

import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.get("/api/users/me", authenticate, getCurrentUser);
router.get("/api/users/:userId", celebrate(userIdSchema), getPublicUserById);
router.get(
  "/api/users/:userId/tools",
  celebrate(userToolsSchema),
  getUserTools,
);
router.get(
  "/api/users/:userId/feedbacks",
  celebrate(userFeedbacksSchema),
  getUserFeedbacks,
);

export default router;
