import { Joi, Segments } from "celebrate";

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
