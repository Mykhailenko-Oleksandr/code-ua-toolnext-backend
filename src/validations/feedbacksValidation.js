import { Joi, Segments } from "celebrate";
import { isValidObjectId } from "mongoose";

const requiredField = "Це поле є обов'язковим";

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value)
    ? helpers.message("Невірний формат ID")
    : value;
};

export const getFeedbacksSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      "number.min": "Номер сторінки має бути не менше 1",
      "number.base": "Номер сторінки має бути числом",
      "number.integer": "Номер сторінки має бути цілим числом",
    }),
    perPage: Joi.number().integer().min(5).max(30).default(15).messages({
      "number.min": "Кількість відгуків на сторінці має бути не менше 5",
      "number.max": "Кількість відгуків на сторінці не може перевищувати 30",
      "number.base": "Кількість відгуків має бути числом",
      "number.integer": "Кількість відгуків має бути цілим числом",
    }),
  }),
};

export const createFeedbackSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().required().messages({
      "string.empty": requiredField,
      "any.required": requiredField,
    }),
    description: Joi.string().trim().required().messages({
      "string.empty": requiredField,
      "any.required": requiredField,
    }),
    rate: Joi.number().integer().min(1).max(5).required().messages({
      "number.min": "Оцінка має бути від 1 до 5",
      "number.max": "Оцінка має бути від 1 до 5",
      "number.base": "Оцінка має бути числом",
      "number.integer": "Оцінка має бути цілим числом",
      "any.required": requiredField,
    }),
    toolId: Joi.string().custom(objectIdValidator).required().messages({
      "any.required": requiredField,
      "any.custom": "Невірний формат ID інструменту",
    }),
  }),
};
