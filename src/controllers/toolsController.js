import { Tool } from '../models/tool.js';
import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getAllTools = async (req, res) => {
  const { page = 1, perPage = 8, category, search } = req.query;

  const toolsQuery = Tool.find();

  const skip = (page - 1) * perPage;

  if (search) {
    toolsQuery.where({ $text: { $search: search } });
  }

  if (category) {
    toolsQuery.where('category').in(category);
  }

  const [totalTools, tools] = await Promise.all([
    toolsQuery.clone().countDocuments(),
    toolsQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalTools / perPage);

  res.status(200).json({
    page,
    perPage,
    totalTools,
    totalPages,
    tools,
  });
};

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
    owner: req.user._id,
  });

  if (!tool) {
    throw createHttpError(404, 'Tool not found');
  }

  res.status(200).json(tool);
};

export const updateTool = async (req, res) => {
  const { toolId } = req.params;
  const updateData = { ...req.body };

  if (req.file) {
    const result = await saveFileToCloudinary(req.file.buffer);
    updateData.images = result.secure_url;
  }

  const updatedTool = await Tool.findOneAndUpdate(
    {
      _id: toolId,
      owner: req.user._id,
    },
    updateData,
    {
      new: true,
    },
  );

  if (!updatedTool) {
    throw createHttpError(
      404,
      'Інструмент не знайдено або недостатньо прав доступу.',
    );
  }

  res.status(200).json({
    message: 'Інструмент успішно оновлено.',
    tool: updatedTool,
  });
};
