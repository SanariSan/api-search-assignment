import Joi from 'joi';

export const SCHEME_SEARCH = {
  entity: Joi.object().keys({
    email: Joi.string().min(6).max(30).required(),
    number: Joi.string().min(6).max(6).optional(),
  }),
};
