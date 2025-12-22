import { Feedback } from "../models/feedback.js";
import { Tool } from "../models/tool.js";

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

export const getToolFeedbacks = async (req, res) => {
  const { toolId } = req.params;
  const { page = 1, perPage = 10 } = req.query;

  const tool = await Tool.findById(toolId);
  if (!tool) {
    return res.status(404).json({ message: "Інструмент не знайдено" });
  }

  const skip = (page - 1) * perPage;

  const feedbackQuery = Feedback.find({ toolId }).sort({ createdAt: -1 });

  const [totalItems, feedbacks] = await Promise.all([
    feedbackQuery.clone().countDocuments(),
    feedbackQuery.skip(skip).limit(Number(perPage)),
  ]);

  res.status(200).json({
    page: Number(page),
    perPage: Number(perPage),
    totalItems,
    totalPages: Math.ceil(totalItems / perPage),
    feedbacks,
  });
};

export const createFeedback = async (req, res) => {
  const { toolId, name, description, rate } = req.body;

  const tool = await Tool.findById(toolId);
  if (!tool) {
    return res.status(404).json({ message: "Tool not found" });
  }

  const newFeedback = await Feedback.create({
    toolId,
    name,
    description,
    rate,
  });

  // Перерахунок рейтингу
  const stats = await Feedback.aggregate([
    { $match: { toolId: tool._id } },
    {
      $group: {
        _id: "$toolId",
        avgRate: { $avg: "$rate" },
      },
    },
  ]);

  const avgRate = stats.length ? Number(stats[0].avgRate.toFixed(1)) : 0;

  tool.rating = avgRate;
  await tool.save();

  res.status(201).json({
    message: "Feedback created successfully",
    feedback: newFeedback,
    ratingUpdated: avgRate,
  });
};
