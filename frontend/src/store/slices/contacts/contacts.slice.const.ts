import type { TContactsInitState } from './contacts.slice.type';

const CONTACTS_INIT_STATE: TContactsInitState = {
  contacts: [],
  chatHistoryFetchSize: 500,
};

export { CONTACTS_INIT_STATE };
