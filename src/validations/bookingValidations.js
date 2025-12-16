import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import dayjs from 'dayjs';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
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
      'string.max': `Ім'я не може перевищувати 20 символів`,
      'any.required': requiredInput,
    }),

    lastName: Joi.string().trim().min(2).max(50).required().messages({
      'string.min': 'Прізвище має містити принаймні 3 символи',
      'string.max': 'Прізвище не може перевищувати 30 символів',
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
        'date.min': 'Start date must be in the future',
        'any.required': requiredStartData,
        'date.base': 'Invalid start date format',
        'string.pattern.base': 'Start date must be in YYYY-MM-DD format',
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
        'any.invalid': 'Invalid end date format',
        'date.greater': 'End date must be after start date',
        'any.required': requiredEndData,
        'string.pattern.base': 'End date must be in YYYY-MM-DD format',
      }),

    deliveryCity: Joi.string().trim().min(2).max(100).required().messages({
      'string.min': 'Місто доставки має містити принаймні 3 символи',
      'string.max': 'Місто доставки не може перевищувати 100 символів',
      'any.required': requiredInput,
    }),

    deliveryBranch: Joi.string().trim().min(2).max(200).required().messages({
      'string.min': 'Відділення Нової Пошти має містити принаймні 3 символи',
      'string.max': 'Відділення Нової Пошти не може перевищувати 200 символів',
      'any.required': requiredInput,
    }),
  }),
};

export const checkAvailabilitySchema = {
  [Segments.PARAMS]: Joi.object({
    toolId: Joi.string().custom(objectIdValidator).required(),
  }),
};
