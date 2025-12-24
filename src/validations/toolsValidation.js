import { Joi, Segments } from "celebrate";
import { isValidObjectId } from "mongoose";

const objectIdValidator = (value, helpers) => {
  const ids = value.split(",");

  for (const id of ids) {
    if (!isValidObjectId(id)) {
      return helpers.message("Невірний формат ID");
    }
  }

  return value;
};

export const toolIdSchema = {
  [Segments.PARAMS]: Joi.object({
    toolId: Joi.string().custom(objectIdValidator).required().messages({
      "any.required": "ID інструменту є обов'язковим",
    }),
  }),
};

export const updateToolSchema = {
  ...toolIdSchema,
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(96).trim().messages({
      "string.min": "Назва має містити принаймні 3 символи",
      "string.max": "Назва не може перевищувати 96 символів",
    }),
    pricePerDay: Joi.number().min(0).messages({
      "number.min": "Ціна не може бути від'ємною",
      "number.base": "Ціна має бути числом",
    }),
    category: Joi.string().custom(objectIdValidator).messages({
      "any.custom": "Невірний формат ID категорії",
    }),
    rentalTerms: Joi.string().min(20).max(1000).trim().messages({
      "string.min": "Умови оренди мають містити принаймні 20 символів",
      "string.max": "Умови оренди не можуть перевищувати 1000 символів",
    }),
    description: Joi.string().min(20).max(2000).trim().messages({
      "string.min": "Опис має містити принаймні 20 символів",
      "string.max": "Опис не може перевищувати 2000 символів",
    }),
    specifications: Joi.string().messages({
      "string.base": "Характеристики мають бути рядком",
    }),
  }),
};

const requiredField = "Це поле є обов'язковим";

export const createToolSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(96).trim().required().messages({
      "string.min": "Назва має містити принаймні 3 символи",
      "string.max": "Назва не може перевищувати 96 символів",
      "any.required": requiredField,
      "string.empty": requiredField,
    }),
    pricePerDay: Joi.number().min(0).required().messages({
      "number.min": "Ціна не може бути від'ємною",
      "number.base": "Ціна має бути числом",
      "any.required": requiredField,
    }),
    category: Joi.string().custom(objectIdValidator).required().messages({
      "any.custom": "Невірний формат ID категорії",
      "any.required": requiredField,
      "string.empty": requiredField,
    }),
    rentalTerms: Joi.string().min(20).max(1000).trim().required().messages({
      "string.min": "Умови оренди мають містити принаймні 20 символів",
      "string.max": "Умови оренди не можуть перевищувати 1000 символів",
      "any.required": requiredField,
      "string.empty": requiredField,
    }),
    description: Joi.string().min(20).max(2000).trim().required().messages({
      "string.min": "Опис має містити принаймні 20 символів",
      "string.max": "Опис не може перевищувати 2000 символів",
      "any.required": requiredField,
      "string.empty": requiredField,
    }),
    specifications: Joi.string().messages({
      "string.base": "Характеристики мають бути рядком",
    }),
  }),
};

export const getToolSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      "number.min": "Номер сторінки має бути не менше 1",
      "number.base": "Номер сторінки має бути числом",
      "number.integer": "Номер сторінки має бути цілим числом",
    }),
    perPage: Joi.number().integer().min(5).max(20).default(8).messages({
      "number.min": "Кількість елементів на сторінці має бути не менше 5",
      "number.max": "Кількість елементів на сторінці не може перевищувати 20",
      "number.base": "Кількість елементів має бути числом",
      "number.integer": "Кількість елементів має бути цілим числом",
    }),
    category: Joi.string().custom(objectIdValidator).messages({
      "any.custom": "Невірний формат ID категорії",
    }),
    search: Joi.string().trim().allow("").messages({
      "string.base": "Пошуковий запит має бути рядком",
    }),
    sortBy: Joi.string()
      .valid("_id", "rating", "createdAt", "pricePerDay")
      .default("_id"),
    sortOrder: Joi.string().valid("asc", "desc").default("asc"),
  }),
};
