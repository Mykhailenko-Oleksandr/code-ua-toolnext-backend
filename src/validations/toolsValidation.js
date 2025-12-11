import Joi from 'joi';
import { Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';


const objectIdValidator = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.error('any.invalid', { message: 'Некоректний формат ID' });
  }
  return value;
};


export const updateToolSchema = {

  [Segments.PARAMS]: Joi.object({
    toolId: Joi.string().custom(objectIdValidator).required(),
  }),

  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(100).trim(),
    mainImage: Joi.string().uri(),
    images: Joi.array().items(Joi.string().uri()),
    pricePerDay: Joi.number().min(0),
    description: Joi.string().max(1000).trim(),
    technicalSpecs: Joi.string().max(1000).trim(),
    rentalConditions: Joi.string().max(500).trim(),
    category: Joi.string().custom(objectIdValidator),

  })
  .min(1)
  .unknown(false)
  .messages({
    'object.min': 'Тіло запиту не може бути порожнім. Надішліть принаймні одне поле для оновлення.',
    'object.unknown': 'Тіло запиту містить недійсне поле, яке не дозволено змінювати.',
  }),
};
