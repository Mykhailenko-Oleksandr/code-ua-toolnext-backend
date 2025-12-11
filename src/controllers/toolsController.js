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


export const updateTool = async (req, res) => {
    const { toolId } = req.params;



    const updatedTool = await Tool.findOneAndUpdate(
        { _id: toolId, userId: req.user._id },
        req.body,
        {
            new: true
        }
    );

    if (!updatedTool) {
      throw createHttpError(404, 'Інструмент не знайдено.');
    }

    res.status(200).json({
        message: 'Інструмент успішно оновлено.',
        tool: updatedTool
    });
};
