import { Tool } from '../models/tool.js';
import createHttpError from 'http-errors';

export const getToolById = async (req, res) => {
  const { toolId } = req.params;

  const tool = await Tool.findById(toolId);

  if (!tool) {
    throw createHttpError(404, 'Tool not found');
  }

  res.status(200).json(tool);
};

export const deleteTool = async (req, res) => {
  const { toolId } = req.params;
  const tool = await Tool.findOneAndDelete({
    _id: toolId,
    userId: req.user._id,
  });

  if (!tool) {
    throw createHttpError(404, 'Tool not found');
  }

  res.status(200).json(tool);
};
