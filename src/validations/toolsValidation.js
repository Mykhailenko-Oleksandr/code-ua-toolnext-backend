import { celebrate, Joi, Segments } from 'celebrate';

export const createToolValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().optional(),
  }),
});
