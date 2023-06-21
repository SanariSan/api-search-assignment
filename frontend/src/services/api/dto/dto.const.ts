import type { InferType } from 'yup';
import { number, object, string } from 'yup';

const DEFAULT_SUCCESS_DTO = object().shape({
  data: object().required(),
});

const MISCELLANEOUS = object().shape({
  stack: string().notRequired(),
});

const DEFAULT_FAILURE_DTO = object().shape({
  type: number().required(),
  title: string().required(),
  detail: string().required(),
  miscellaneous: MISCELLANEOUS,
});

type TIncomingSuccessFields = InferType<typeof DEFAULT_SUCCESS_DTO>;
type TIncomingFailureFields = InferType<typeof DEFAULT_FAILURE_DTO>;

export type { TIncomingSuccessFields, TIncomingFailureFields };
export { DEFAULT_SUCCESS_DTO, MISCELLANEOUS, DEFAULT_FAILURE_DTO };
