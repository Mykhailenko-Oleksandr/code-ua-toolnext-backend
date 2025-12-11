import Joi from 'joi';
import { Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
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
    description: Joi.string().min(20).max(2000).trim(),
    rentalTerms: Joi.string().min(20).max(1000).trim(),
    specifications: Joi.string().max(1000).trim(),
    images: Joi.string().uri().required()
  })
  .min(1),
};
