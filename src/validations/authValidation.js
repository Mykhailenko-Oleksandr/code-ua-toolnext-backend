import { Joi, Segments } from 'celebrate';


export const registerSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(32).required().messages({
      'string.empty': 'Name is required',
      'string.min': 'Name should have at least 2 characters',
      'string.max': 'Name should not exceed 32 characters',
    }),
    email: Joi.string().email().max(64).required().messages({
      'string.email': 'Please provide a valid email address',
      'string.empty': 'Email is required',
      'string.max': 'Email should not exceed 64 characters',
    }),
    password: Joi.string().min(8).max(128).required().messages({
      'string.min': 'Password should have at least 8 characters',
      'string.max': 'Password should not exceed 128 characters',
      'string.empty': 'Password is required',
    }),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

