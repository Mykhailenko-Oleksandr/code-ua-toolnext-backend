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

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const skip = (page - 1) * limit;

  const user = await User.findById(userId).select('name avatarUrl');
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const tools = await Tool.find({ owner: userId })
    .select('name pricePerDay images rating')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalTools = await Tool.countDocuments({ owner: userId });

  const totalPages = Math.ceil(totalTools / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  res.status(200).json({
    user,
    countTools: tools.length,
    totalTools,
    pagination: {
      page,
      limit,
      totalPages,
      hasNextPage,
      hasPrevPage,
      nextPage: hasNextPage ? page + 1 : null,
      prevPage: hasPrevPage ? page - 1 : null,
    },
    tools,
  });
};
