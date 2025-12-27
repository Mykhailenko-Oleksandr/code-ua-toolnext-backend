import { Router } from "express";
import { celebrate } from "celebrate";
import {
  getFeedbacksSchema,
  createFeedbackSchema,
} from "../validations/feedbacksValidation.js";
import { getFeedbacks, createFeedback } from "../controllers/feedbacksControllers.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.get("/api/feedbacks", celebrate(getFeedbacksSchema), getFeedbacks);
router.post(
  "/api/feedbacks",
  authenticate,
  celebrate(createFeedbackSchema),
  createFeedback,
);

export default router;
