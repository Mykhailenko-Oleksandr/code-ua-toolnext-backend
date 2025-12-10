import { Tool } from '../models/tool.js';
import createHttpError from 'http-errors';

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
