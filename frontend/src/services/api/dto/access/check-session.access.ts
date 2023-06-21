import type { InferType } from 'yup';
import { number, object, string } from 'yup';

const AccessCheckSessionOutgoingDTO = object({
  idInstance: string().required(),
  apiTokenInstance: string().required(),
});

const AccessCheckSessionIncomingSuccessDTO = object({
  wid: string().required(),
  countryInstance: string().optional(),
  typeAccount: string().optional(),
  webhookUrl: string().optional(),
  webhookUrlToken: string().optional(),
  delaySendMessagesMilliseconds: number().optional(),
  markIncomingMessagesReaded: string().optional(),
  markIncomingMessagesReadedOnReply: string().optional(),
  sharedSession: string().optional(),
  proxyInstance: string().optional(),
  outgoingWebhook: string().optional(),
  outgoingMessageWebhook: string().optional(),
  outgoingAPIMessageWebhook: string().optional(),
  incomingWebhook: string().optional(),
  deviceWebhook: string().optional(),
  statusInstanceWebhook: string().optional(),
  stateWebhook: string().optional(),
  enableMessagesHistory: string().optional(),
  keepOnlineStatus: string().optional(),
}).strict(true);

const AccessCheckSessionIncomingFailureDTO = object().shape({
  detail: string().required(),
});

type TAccessCheckSessionOutgoingFields = InferType<typeof AccessCheckSessionOutgoingDTO>;
type TAccessCheckSessionIncomingSuccessFields = InferType<
  typeof AccessCheckSessionIncomingSuccessDTO
>;
type TAccessCheckSessionIncomingFailureFields = InferType<
  typeof AccessCheckSessionIncomingFailureDTO
>;

export {
  AccessCheckSessionIncomingFailureDTO,
  AccessCheckSessionIncomingSuccessDTO,
  AccessCheckSessionOutgoingDTO,
};
export type {
  TAccessCheckSessionIncomingFailureFields,
  TAccessCheckSessionIncomingSuccessFields,
  TAccessCheckSessionOutgoingFields,
};
