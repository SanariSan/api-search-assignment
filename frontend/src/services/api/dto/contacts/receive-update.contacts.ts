import type { InferType } from 'yup';
import { number, object, string } from 'yup';

const ContactsReceiveUpdateOutgoingDTO = object({
  idInstance: string().required(),
  apiTokenInstance: string().required(),
});

const ContactsReceiveUpdateIncomingSuccessDTO = object({
  receiptId: number().integer().required(),
  body: object({
    typeWebhook: string().required(), // 'incoming...' | "outgoing..."
    instanceData: object({
      idInstance: number().integer().optional(),
      wid: string().optional(),
      typeInstance: string().optional(),
    }).optional(),
    timestamp: number().integer().required(),
    idMessage: string().required(), // msg id
    senderData: object({
      chatId: string().required(), // current chat WID === receiver / '1234567@c.us',
      chatName: string().optional(),
      sender: string().required(), // WID of sender '1234567@c.us' OR 'urnums@c.us'
      senderName: string().optional(),
    }).required('Missing sender info'),
    messageData: object({
      typeMessage: string().optional(), // message here
      extendedTextMessageData: object({
        text: string().required(),
      }).optional(),
      textMessageData: object({
        textMessage: string().required(), // OR message here...
      }).optional(),
    }).required(),
  }),
})
  .strict(true)
  .nullable();

const ContactsReceiveUpdateIncomingFailureDTO = object().shape({
  detail: string().required(),
});

type TContactsReceiveUpdateOutgoingFields = InferType<typeof ContactsReceiveUpdateOutgoingDTO>;
type TContactsReceiveUpdateIncomingSuccessFields = InferType<
  typeof ContactsReceiveUpdateIncomingSuccessDTO
>;
type TContactsReceiveUpdateIncomingFailureFields = InferType<
  typeof ContactsReceiveUpdateIncomingFailureDTO
>;

export {
  ContactsReceiveUpdateIncomingFailureDTO,
  ContactsReceiveUpdateIncomingSuccessDTO,
  ContactsReceiveUpdateOutgoingDTO,
};
export type {
  TContactsReceiveUpdateIncomingFailureFields,
  TContactsReceiveUpdateIncomingSuccessFields,
  TContactsReceiveUpdateOutgoingFields,
};
