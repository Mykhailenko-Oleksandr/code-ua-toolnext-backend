import { Joi, Segments } from 'celebrate';

const requiredField = 'Це поле є обов\'язковим';

export const registerSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(32).required().messages({
      'string.empty': requiredField,
      'string.min': 'Ім\'я має містити принаймні 2 символи',
      'string.max': 'Ім\'я не може перевищувати 32 символи',
      'any.required': requiredField,
    }),
    email: Joi.string().email().max(64).required().messages({
      'string.email': 'Будь ласка, вкажіть дійсну адресу електронної пошти',
      'string.empty': requiredField,
      'string.max': 'Адреса електронної пошти не може перевищувати 64 символи',
      'any.required': requiredField,
    }),
    password: Joi.string().min(8).max(128).required().messages({
      'string.min': 'Пароль має містити принаймні 8 символів',
      'string.max': 'Пароль не може перевищувати 128 символів',
      'string.empty': requiredField,
      'any.required': requiredField,
    }),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Будь ласка, вкажіть дійсну адресу електронної пошти',
      'string.empty': requiredField,
      'any.required': requiredField,
    }),
    password: Joi.string().required().messages({
      'string.empty': requiredField,
      'any.required': requiredField,
    }),
  }),
};

