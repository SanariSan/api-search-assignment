import type { InferType } from 'yup';
import { array, number, object, string } from 'yup';

const ContactsFetchChatHistoryOutgoingDTO = object({
  idInstance: string().required(),
  apiTokenInstance: string().required(),
  chatId: string().required(),
  count: number().integer().required(),
});

const ContactsFetchChatHistoryIncomingSuccessDTO = array()
  .of(
    object({
      type: string().required(),
      idMessage: string().required(),
      chatId: string().required(),
      textMessage: string().required(),
      timestamp: number().integer().required(),
      typeMessage: string().optional(),
      senderId: string().optional(),
      senderName: string().optional(),
    }).strict(true),
  )
  .required();

const ContactsFetchChatHistoryIncomingFailureDTO = object().shape({
  detail: string().required(),
});

type TContactsFetchChatHistoryOutgoingFields = InferType<
  typeof ContactsFetchChatHistoryOutgoingDTO
>;
type TContactsFetchChatHistoryIncomingSuccessFields = InferType<
  typeof ContactsFetchChatHistoryIncomingSuccessDTO
>;
type TContactsFetchChatHistoryIncomingFailureFields = InferType<
  typeof ContactsFetchChatHistoryIncomingFailureDTO
>;

export {
  ContactsFetchChatHistoryIncomingFailureDTO,
  ContactsFetchChatHistoryIncomingSuccessDTO,
  ContactsFetchChatHistoryOutgoingDTO,
};
export type {
  TContactsFetchChatHistoryIncomingFailureFields,
  TContactsFetchChatHistoryIncomingSuccessFields,
  TContactsFetchChatHistoryOutgoingFields,
};
