import type { InferType } from 'yup';
import { object, string } from 'yup';

const SIDEBAR_SEARCH_VALIDATION_SCHEMA = object({
  contact: string().matches(/^\+?(?<phone>\d+)$/, 'Wrong format, phone only'),
});

type TSidebarSearchFormValues = InferType<typeof SIDEBAR_SEARCH_VALIDATION_SCHEMA>;

export type { TSidebarSearchFormValues };
export { SIDEBAR_SEARCH_VALIDATION_SCHEMA };
