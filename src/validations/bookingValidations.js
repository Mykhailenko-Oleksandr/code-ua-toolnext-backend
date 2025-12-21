import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import dayjs from 'dayjs';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Невірний формат ID') : value;
};

const requiredInput = `Це поле є обов'язковим`;
const requiredStartData = `Початкова дата є обов'язковою`;
const requiredEndData = `Кінцева дата є обов'язковою`;

const sanitizePhone = (value, helpers) => {
  const sanitized = value.replace(/[^\d+]/g, '');

  if (!/^\+?[0-9]{10,15}$/.test(sanitized)) {
    return helpers.error('string.pattern.base');
  }

  return sanitized;
};

export const createBookingSchema = {
  [Segments.BODY]: Joi.object({
    firstName: Joi.string().trim().min(3).max(50).required().messages({
      'string.min': `Ім'я має містити принаймні 3 символи`,
      'string.max': `Ім'я не може перевищувати 50 символів`,
      'any.required': requiredInput,
    }),

    lastName: Joi.string().trim().min(2).max(50).required().messages({
      'string.min': 'Прізвище має містити принаймні 2 символи',
      'string.max': 'Прізвище не може перевищувати 50 символів',
      'any.required': requiredInput,
    }),

    phone: Joi.string().trim().custom(sanitizePhone).required().messages({
      'string.pattern.base':
        'Невірний формат номера телефону. Укажіть дійсний номер телефону.',
      'any.required': requiredInput,
    }),

    startDate: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .custom((value, helpers) => {
        const today = dayjs().startOf('day');
        const date = dayjs(value, 'YYYY-MM-DD', true);
        if (!date.isValid()) {
          return helpers.error('any.invalid');
        }
        if (date.isBefore(today)) {
          return helpers.error('date.min');
        }
        return value;
      })
      .required()
      .messages({
        'date.min': 'Початкова дата не може бути в минулому',
        'any.required': requiredStartData,
        'any.invalid': 'Невірний формат початкової дати',
        'date.base': 'Невірний формат початкової дати',
        'string.pattern.base': 'Початкова дата має бути у форматі YYYY-MM-DD',
      }),

    endDate: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .custom((value, helpers) => {
        const { startDate } = helpers.state.ancestors[0];
        const start = dayjs(startDate, 'YYYY-MM-DD', true);
        const end = dayjs(value, 'YYYY-MM-DD', true);
        if (!end.isValid()) {
          return helpers.error('any.invalid');
        }
        if (!end.isAfter(start)) {
          return helpers.error('date.greater');
        }
        return value;
      })
      .required()
      .messages({
        'any.invalid': 'Невірний формат кінцевої дати',
        'date.greater': 'Кінцева дата має бути після початкової дати',
        'any.required': requiredEndData,
        'string.pattern.base': 'Кінцева дата має бути у форматі YYYY-MM-DD',
      }),

    deliveryCity: Joi.string().trim().min(2).max(100).required().messages({
      'string.min': 'Місто доставки має містити принаймні 2 символи',
      'string.max': 'Місто доставки не може перевищувати 100 символів',
      'any.required': requiredInput,
    }),

    deliveryBranch: Joi.string().trim().max(200).required().messages({
      'string.max': 'Відділення Нової Пошти не може перевищувати 200 символів',
      'any.required': requiredInput,
    }),
  }),
};

export const checkAvailabilitySchema = {
  [Segments.PARAMS]: Joi.object({
    toolId: Joi.string().custom(objectIdValidator).required().messages({
      'any.required': 'ID інструменту є обов\'язковим',
    }),
  }),
};
