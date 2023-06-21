import type { InferType } from 'yup';
import { object, string } from 'yup';

// more on strong typing https://github.com/DefinitelyTyped/DefinitelyTyped/issues/29412
// type TA = InferType<typeof VALIDATION_SCHEMA>;

const VALIDATION_SCHEMA = object({
  idInstance: string().required('idInstance required'),
  apiTokenInstance: string().required('apiTokenInstance required'),
});

type TLoginFormValues = InferType<typeof VALIDATION_SCHEMA>;

// const INITIAL_VALUES: TLoginFormValues = { username: '0a8046d4d', password: 'pwd123456' };

export type { TLoginFormValues };
export { VALIDATION_SCHEMA };
