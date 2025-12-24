import { Joi, Segments } from "celebrate";

// ===============================================
// 1️⃣ Отримати УСІ відгуки (вже була — залишаємо)
// ===============================================
export const getFeedbacksSchema = {
  [Segments.QUERY]: Joi.object()
    .prefs({ convert: true }) // дозволяє ?page="2" → number 2
    .keys({
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

// ===============================================
// 2️⃣ Отримати відгуки КОНКРЕТНОГО інструменту
//    GET /api/feedbacks/tool/:toolId
// ===============================================
export const getToolFeedbacksSchema = {
  [Segments.PARAMS]: Joi.object({
    toolId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.pattern.base": "Невірний формат toolId",
        "any.required": "toolId є обов'язковим",
      }),
  }),

  [Segments.QUERY]: Joi.object()
    .prefs({ convert: true })
    .keys({
      page: Joi.number().integer().min(1).default(1),
      perPage: Joi.number().integer().min(5).max(30).default(15),
    }),
};

// ===============================================
// 3️⃣ Створити новий відгук
//    POST /api/feedbacks  (або /tool/:toolId — як у тебе прийнято)
// ===============================================
export const createFeedbackSchema = {
  [Segments.BODY]: Joi.object({
    toolId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.pattern.base": "Невірний формат toolId",
        "any.required": "toolId є обов'язковим",
      }),

    name: Joi.string().min(2).max(40).required().messages({
      "string.min": "Ім'я має містити мінімум 2 символи",
      "string.empty": "Ім'я є обов'язковим",
    }),

    description: Joi.string().min(10).max(1000).required().messages({
      "string.min": "Опис має містити мінімум 10 символів",
      "string.empty": "Опис є обов'язковим",
    }),

    rate: Joi.number().integer().min(1).max(5).required().messages({
      "number.min": "Рейтинг не може бути менше 1",
      "number.max": "Рейтинг не може бути більше 5",
      "any.required": "Рейтинг є обов'язковим",
    }),
  }),
};
