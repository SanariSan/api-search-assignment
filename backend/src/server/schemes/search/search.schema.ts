import Joi from 'joi';

export const SCHEME_SEARCH = {
  login: Joi.object().keys({
    username: Joi.string().min(6).max(30).required(),
    password: Joi.string().min(6).max(30).required(),
  }),
};
