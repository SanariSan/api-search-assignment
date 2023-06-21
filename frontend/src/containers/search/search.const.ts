import type { InferType } from 'yup';
import { object, string } from 'yup';

// more on strong typing https://github.com/DefinitelyTyped/DefinitelyTyped/issues/29412
// type TA = InferType<typeof VALIDATION_SCHEMA>;

const VALIDATION_SCHEMA = object({
  email: string().min(6).max(30).required('Email required'),
  number: string()
    .matches(/\d{2}-\d{2}-\d{2}/, 'Input not matching the expected format')
    .optional(),
});

type TSearchFormValues = InferType<typeof VALIDATION_SCHEMA>;

export type { TSearchFormValues };
export { VALIDATION_SCHEMA };
