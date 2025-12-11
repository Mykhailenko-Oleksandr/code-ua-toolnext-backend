import category from '../models/category.js';

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await category.find();

    if (!categories || categories.length === 0) {
      throw new Error('No categories found');
    }

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};
