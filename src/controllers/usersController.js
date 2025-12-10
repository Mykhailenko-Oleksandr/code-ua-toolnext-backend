import createHttpError from 'http-errors';
import { User } from '../models/user.js';

export const getPublicUserById = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId).select('name avatar email');

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json(user);
};
