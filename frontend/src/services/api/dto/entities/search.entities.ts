import type { InferType } from 'yup';
import { array, object, string } from 'yup';
import { DEFAULT_FAILURE_DTO, DEFAULT_SUCCESS_DTO } from '../dto.const';

const EntitiesSearchOutgoingDTO = object({
  email: string().required(),
  number: string().optional(),
});

const EntitiesSearchIncomingSuccessDTO = DEFAULT_SUCCESS_DTO.shape({
  data: object({
    entities: array()
      .of(
        object({
          email: string().email().required(),
          number: string().required(),
        }).optional(),
      )
      .required(),
  }),
})
  .strict(true)
  .required();

const EntitiesSearchIncomingFailureDTO = DEFAULT_FAILURE_DTO;

type TEntitiesSearchOutgoingFields = InferType<typeof EntitiesSearchOutgoingDTO>;
type TEntitiesSearchIncomingSuccessFields = InferType<typeof EntitiesSearchIncomingSuccessDTO>;
type TEntitiesSearchIncomingFailureFields = InferType<typeof EntitiesSearchIncomingFailureDTO>;

export {
  EntitiesSearchIncomingFailureDTO,
  EntitiesSearchIncomingSuccessDTO,
  EntitiesSearchOutgoingDTO,
};
export type {
  TEntitiesSearchIncomingFailureFields,
  TEntitiesSearchIncomingSuccessFields,
  TEntitiesSearchOutgoingFields,
};
