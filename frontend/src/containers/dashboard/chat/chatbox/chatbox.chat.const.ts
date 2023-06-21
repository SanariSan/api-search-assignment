import type { InferType } from 'yup';
import { object, string } from 'yup';

const CHATBOX_VALIDATION_SCHEMA = object({
  message: string().max(10_000, 'Message too long'),
});

type TChatboxFormValues = InferType<typeof CHATBOX_VALIDATION_SCHEMA>;

export type { TChatboxFormValues };
export { CHATBOX_VALIDATION_SCHEMA };
