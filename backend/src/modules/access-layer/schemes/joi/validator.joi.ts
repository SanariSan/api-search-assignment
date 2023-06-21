import type Joi from 'joi';

export function validateBySchemaAsync(schema: Joi.ObjectSchema, source: unknown) {
  return schema.validateAsync(source, {
    abortEarly: false,
  });
}
