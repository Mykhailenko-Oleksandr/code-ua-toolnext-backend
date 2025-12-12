import { Tool } from '../models/tool.js';
import createHttpError from 'http-errors';

export const getAllTools = async (req, res, next) => {
  try {
    const { page = 1, limit = 12, category, search } = req.query;

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 12;
    const skip = (pageNumber - 1) * limitNumber;

    const filter = {};

    if (category) {
      const categories = category
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

      if (categories.length > 0) {
        filter.category = { $in: categories };
      }
    }

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const [items, totalItems] = await Promise.all([
      Tool.find(filter).skip(skip).limit(limitNumber),
      Tool.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalItems / limitNumber) || 0;

    res.status(200).json({
      items,
      page: pageNumber,
      limit: limitNumber,
      totalPages,
      totalItems,
    });
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};

export const getToolById = async (req, res, next) => {
  try {
    const { toolId } = req.params;

    const tool = await Tool.findById(toolId);

    if (!tool) {
      return next(createHttpError(404, 'Tool not found'));
    }

    res.status(200).json(tool);
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};
