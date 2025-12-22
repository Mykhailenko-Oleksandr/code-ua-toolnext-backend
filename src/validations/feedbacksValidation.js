import { Joi, Segments } from "celebrate";

export const getFeedbacksSchema = {
  [Segments.PARAMS]: Joi.object({
    toolId: Joi.string().hex().length(24).required().messages({
      "any.required": "toolId є обовʼязковим",
      "string.hex": "toolId має бути валідним ObjectId",
      "string.length": "toolId має містити 24 символи",
    }),
  }),

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
    toolId: Joi.string().hex().length(24).required().messages({
      "any.required": "toolId є обовʼязковим",
      "string.hex": "toolId має бути валідним ObjectId",
      "string.length": "toolId має містити 24 символи",
    }),

    name: Joi.string().min(2).max(40).required().messages({
      "string.min": "Імʼя повинно містити мінімум 2 символи",
      "string.max": "Імʼя не може перевищувати 40 символів",
      "any.required": "Імʼя є обовʼязковим",
    }),

    description: Joi.string().min(5).max(500).required().messages({
      "string.min": "Відгук має містити мінімум 5 символів",
      "string.max": "Відгук не може перевищувати 500 символів",
      "any.required": "Опис відгуку є обовʼязковим",
    }),

    rate: Joi.number().integer().min(1).max(5).required().messages({
      "number.min": "Рейтинг не може бути менше 1",
      "number.max": "Рейтинг не може бути більше 5",
      "any.required": "Рейтинг є обовʼязковим",
    }),
  }),
};
