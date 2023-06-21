import type { InferType } from 'yup';
import { boolean, number, object, string } from 'yup';

const ContactsAknowledgeUpdateOutgoingDTO = object({
  idInstance: string().required(),
  apiTokenInstance: string().required(),
  receiptId: number().required(),
});

const ContactsAknowledgeUpdateIncomingSuccessDTO = object({
  result: boolean().required(),
})
  .strict(true)
  .required();

const ContactsAknowledgeUpdateIncomingFailureDTO = object().shape({
  detail: string().required(),
});

type TContactsAknowledgeUpdateOutgoingFields = InferType<
  typeof ContactsAknowledgeUpdateOutgoingDTO
>;
type TContactsAknowledgeUpdateIncomingSuccessFields = InferType<
  typeof ContactsAknowledgeUpdateIncomingSuccessDTO
>;
type TContactsAknowledgeUpdateIncomingFailureFields = InferType<
  typeof ContactsAknowledgeUpdateIncomingFailureDTO
>;

export {
  ContactsAknowledgeUpdateIncomingFailureDTO,
  ContactsAknowledgeUpdateIncomingSuccessDTO,
  ContactsAknowledgeUpdateOutgoingDTO,
};
export type {
  TContactsAknowledgeUpdateIncomingFailureFields,
  TContactsAknowledgeUpdateIncomingSuccessFields,
  TContactsAknowledgeUpdateOutgoingFields,
};
