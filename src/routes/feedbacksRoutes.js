import { Router } from "express";
import { celebrate } from "celebrate";
import {
  createFeedbackSchema,
  getFeedbacksSchema,
} from "../validations/feedbacksValidation.js";
import {
  createFeedback,
  getFeedbacks,
  getToolFeedbacks,
} from "../controllers/feedbacksControllers.js";
const router = Router();

router.get("/api/feedbacks", celebrate(getFeedbacksSchema), getFeedbacks);

router.get(
  "/api/feedbacks/tool/:toolId",
  celebrate(getFeedbacksSchema),
  getToolFeedbacks,
);

router.post("/api/feedbacks", celebrate(createFeedbackSchema), createFeedback);

export default router;
