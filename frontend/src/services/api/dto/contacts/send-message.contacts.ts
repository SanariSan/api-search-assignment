import type { InferType } from 'yup';
import { object, string } from 'yup';

const ContactsSendMessageOutgoingDTO = object({
  idInstance: string().required(),
  apiTokenInstance: string().required(),
  chatId: string().required(),
  message: string().required(),
});

const ContactsSendMessageIncomingSuccessDTO = object({
  idMessage: string().required(),
}).required();

const ContactsSendMessageIncomingFailureDTO = object().shape({
  detail: string().required(),
});

type TContactsSendMessageOutgoingFields = InferType<typeof ContactsSendMessageOutgoingDTO>;
type TContactsSendMessageIncomingSuccessFields = InferType<
  typeof ContactsSendMessageIncomingSuccessDTO
>;
type TContactsSendMessageIncomingFailureFields = InferType<
  typeof ContactsSendMessageIncomingFailureDTO
>;

export {
  ContactsSendMessageIncomingFailureDTO,
  ContactsSendMessageIncomingSuccessDTO,
  ContactsSendMessageOutgoingDTO,
};
export type {
  TContactsSendMessageIncomingFailureFields,
  TContactsSendMessageIncomingSuccessFields,
  TContactsSendMessageOutgoingFields,
};
