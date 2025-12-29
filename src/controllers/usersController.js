import createHttpError from "http-errors";
import { User } from "../models/user.js";
import { Tool } from "../models/tool.js";
import { Types } from "mongoose";

export const getPublicUserById = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId).select("name avatarUrl email");

  if (!user) {
    throw createHttpError(404, "Користувача не знайдено");
  }

  // V2807: Рейтинг пользователя считаем на основе рейтингов его инструментов,
  //        взвешивая по количеству отзывов к каждому инструменту.
  //        Это эквивалентно среднему по всем отзывам, но без загрузки самих отзывов.
  const toolsAgg = await Tool.aggregate([
    { $match: { owner: new Types.ObjectId(userId) } },
    {
      $project: {
        rating: { $ifNull: ["$rating", 0] },
        feedbacksCount: { $size: { $ifNull: ["$feedbacks", []] } },
      },
    },
    {
      $group: {
        _id: null,
        totalFeedbacks: { $sum: "$feedbacksCount" },
        weightedSum: { $sum: { $multiply: ["$rating", "$feedbacksCount"] } },
      },
    },
  ]);

  const totalFeedbacks = toolsAgg[0]?.totalFeedbacks ?? 0;
  const weightedSum = toolsAgg[0]?.weightedSum ?? 0;
  const rating =
    totalFeedbacks > 0 ? Number(weightedSum) / Number(totalFeedbacks) : 0;

  res.status(200).json({
    ...user.toObject(),
    rating,
    feedbacksCount: totalFeedbacks,
  });
};

export const getUserTools = async (req, res) => {
  const { userId } = req.params;
  const { page = 1, perPage = 8 } = req.query;

  const skip = (page - 1) * perPage;

  const user = await User.findById(userId).select("name avatarUrl");
  if (!user) {
    throw createHttpError(404, "Користувача не знайдено");
  }

  const tools = await Tool.find({ owner: userId })
    .populate({ path: "feedbacks" })
    .skip(skip)
    .limit(perPage)
    .sort({ createdAt: -1 });

  const totalTools = await Tool.countDocuments({ owner: userId });

  const totalPages = Math.ceil(totalTools / perPage);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  res.status(200).json({
    user,
    page,
    perPage,
    totalPages,
    totalTools,
    pagination: {
      hasNextPage,
      hasPrevPage,
      nextPage: hasNextPage ? page + 1 : null,
      prevPage: hasPrevPage ? page - 1 : null,
    },
    tools,
  });
};

export const getUserFeedbacks = async (req, res) => {
  const { userId } = req.params;
  const { page = 1, perPage = 15 } = req.query;

  const pageNumber = Number(page);
  const perPageNumber = Number(perPage);
  const skip = (pageNumber - 1) * perPageNumber;

  // V2807: Отдаем отзывы, оставленные к инструментам пользователя (owner=userId).
  const agg = await Tool.aggregate([
    { $match: { owner: new Types.ObjectId(userId) } },
    { $unwind: { path: "$feedbacks" } },
    {
      $lookup: {
        from: "feedbacks",
        localField: "feedbacks",
        foreignField: "_id",
        as: "feedback",
      },
    },
    { $unwind: { path: "$feedback" } },
    { $replaceRoot: { newRoot: "$feedback" } },
    { $sort: { createdAt: -1 } },
    {
      $facet: {
        items: [{ $skip: skip }, { $limit: perPageNumber }],
        total: [{ $count: "count" }],
      },
    },
  ]);

  const feedbacks = agg[0]?.items ?? [];
  const totalItems = agg[0]?.total?.[0]?.count ?? 0;
  const totalPages = Math.ceil(totalItems / perPageNumber);

  res.status(200).json({
    page: pageNumber,
    perPage: perPageNumber,
    totalItems,
    totalPages,
    feedbacks,
  });
};

export const getCurrentUser = async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw createHttpError(401, "Не авторизовано");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw createHttpError(404, "Користувача не знайдено");
  }

  res.status(200).json(user);
};
