import { Feedback } from '../models/feedback.js';
// import createHttpError from 'http-errors';
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
