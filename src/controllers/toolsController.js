import { Tool } from '../models/tool.js';
import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getAllTools = async (req, res) => {
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
      new: true
    },
  );

  if (!updatedTool) {
    throw createHttpError(404, 'Інструмент не знайдено або недостатньо прав доступу.');
  }

  res.status(200).json({
    message: 'Інструмент успішно оновлено.',
    tool: updatedTool,
  });
};
