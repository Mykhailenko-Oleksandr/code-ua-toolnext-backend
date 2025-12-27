import { Feedback } from "../models/feedback.js";
import { Tool } from "../models/tool.js";
import createHttpError from "http-errors";

export const getFeedbacks = async (req, res) => {
  const { page = 1, perPage = 15 } = req.query;
  const skip = (page - 1) * perPage;

  const feedbacksQuery = Feedback.find();

  const [totalItems, feedbacks] = await Promise.all([
    feedbacksQuery.clone().countDocuments(),
    feedbacksQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
    feedbacks,
  });
};

export const createFeedback = async (req, res) => {
  const { name, description, rate, toolId } = req.body;

  const feedback = await Feedback.create({
    name,
    description,
    rate,
  });

  if (toolId) {
    const tool = await Tool.findById(toolId);
    if (!tool) {
      throw createHttpError(404, "Інструмент не знайдено");
    }

    if (!tool.feedbacks) {
      tool.feedbacks = [];
    }
    tool.feedbacks.push(feedback._id);

    // V2807: Пересчитываем tool.rating как среднее по всем оценкам (rate) для этого инструмента.
    // Это делает поведение одинаковым для "сидовых" инструментов и инструментов с новыми отзывами (звёзды + число).
    // NOTE: tool.feedbacks may contain ObjectIds; use them directly in $in
    const agg = await Feedback.aggregate([
      { $match: { _id: { $in: tool.feedbacks } } },
      { $group: { _id: null, avgRate: { $avg: "$rate" } } },
    ]);

    const avgRate = agg[0]?.avgRate ?? 0;
    // V2807: держим рейтинг в диапазоне [0..5]
    tool.rating = Math.max(0, Math.min(5, Number.isFinite(avgRate) ? avgRate : 0));

    await tool.save();
  }

  res.status(201).json(feedback);
};
