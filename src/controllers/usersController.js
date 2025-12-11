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

  const user = await User.findById(userId).select('name avatarUrl');
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const tools = await Tool.find({ owner: userId }).select(
    'name pricePerDay images rating',
  );

  res.status(200).json({
    user,
    count: tools.length,
    tools,
  });
};
