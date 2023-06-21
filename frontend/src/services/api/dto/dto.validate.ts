import type { Schema, ValidationError } from 'yup';

async function validateDTO<TSchema extends Schema>({
  schema,
  value,
}: {
  schema: TSchema;
  value: unknown;
}): Promise<TSchema['__outputType']> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await schema.validate(value, { abortEarly: false });
  } catch (error) {
    const errorc = error as ValidationError;
    const validationErrors = errorc.inner.map((_error) => ({
      type: _error.type,
      path: _error.path,
    }));
    throw new Error(JSON.stringify({ value: errorc.value, validationErrors }));
  }
}

export { validateDTO };
