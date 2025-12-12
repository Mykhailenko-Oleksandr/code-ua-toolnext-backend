import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const getAllToolsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    // category: Joi.string().valid(...CATEGORY),
    search: Joi.string().trim().allow(''),
  }),
};

export const toolIdSchema = {
  [Segments.PARAMS]: Joi.object({
    toolId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const updateToolSchema = {
  ...toolIdSchema,
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(96).trim(),
    pricePerDay: Joi.number().min(0),
    categoryId: Joi.string().custom(objectIdValidator),
    description: Joi.object(),
    rentalTerms: Joi.string().min(20).max(1000).trim(),
    specifications: Joi.string().max(1000).trim(),
  }),
};
