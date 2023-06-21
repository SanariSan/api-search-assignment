import type { TContactsFetchChatHistoryIncomingSuccessFields } from '../../../services/api';

type TChatHistory = TContactsFetchChatHistoryIncomingSuccessFields;

type TContacts = Array<{
  wid: string;
  chatHistory: TChatHistory;
}>;

type TContactsInitState = {
  contacts: TContacts;
  chatHistoryFetchSize: number;
};

export type { TChatHistory, TContacts, TContactsInitState };
