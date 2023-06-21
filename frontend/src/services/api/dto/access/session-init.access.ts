import type { InferType } from 'yup';
import { DEFAULT_FAILURE_DTO, DEFAULT_SUCCESS_DTO } from '../dto.const';

const AccessSessionInitIncomingSuccessDTO = DEFAULT_SUCCESS_DTO.strict(true).required();

const AccessSessionInitIncomingFailureDTO = DEFAULT_FAILURE_DTO;

type TAccessSessionInitIncomingSuccessFields = InferType<
  typeof AccessSessionInitIncomingSuccessDTO
>;
type TAccessSessionInitIncomingFailureFields = InferType<
  typeof AccessSessionInitIncomingFailureDTO
>;

export { AccessSessionInitIncomingFailureDTO, AccessSessionInitIncomingSuccessDTO };
export type { TAccessSessionInitIncomingFailureFields, TAccessSessionInitIncomingSuccessFields };
