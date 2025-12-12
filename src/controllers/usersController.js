import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { Tool } from '../models/tool.js';

export const getPublicUserById = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId).select('name avatar email');

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json(user);
};

export const getUserTools = async (req, res) => {
  const { userId } = req.params;
  const { page = 1, perPage = 8 } = req.query;

  const skip = (page - 1) * perPage;

  const user = await User.findById(userId).select('name avatarUrl');
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const tools = await Tool.find({ owner: userId })
    .select('name pricePerDay images rating')
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

export const getCurrentUser = async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw createHttpError(401, 'Not authorized');
  }

  const user = await User.findById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json(user);
};
