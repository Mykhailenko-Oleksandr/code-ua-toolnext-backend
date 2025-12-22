import { Router } from "express";
import { celebrate } from "celebrate";
import { getFeedbacksSchema } from "../validations/feedbacksValidation.js";
import { getFeedbacks } from "../controllers/feedbacksControllers.js";
const router = Router();

router.get("/api/feedbacks", celebrate(getFeedbacksSchema), getFeedbacks);

export default router;
