import { createSlice, current } from '@reduxjs/toolkit';
import { CONTACTS_INIT_STATE } from './contacts.slice.const';
import type { TChatHistory, TContacts } from './contacts.slice.type';

/* eslint-disable no-param-reassign */

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: CONTACTS_INIT_STATE,
  reducers: {
    setContacts(
      state,
      action: {
        payload: { contacts: TContacts };
        type: string;
      },
    ) {
      state.contacts = action.payload.contacts;
    },
    pushContact(
      state,
      action: {
        payload: { contact: Pick<TContacts[number], 'wid'> };
        type: string;
      },
    ) {
      const currSet = new Set(current(state.contacts).map(({ wid }) => wid));
      if (currSet.has(action.payload.contact.wid)) return;

      state.contacts.push({ wid: action.payload.contact.wid, chatHistory: [] });
    },
    pushChatHistory(
      state,
      action: {
        payload: {
          chatWId: string;
          history: TChatHistory;
        };
        type: string;
      },
    ) {
      const currentContacts = current(state.contacts);
      const targetContactIdx = currentContacts.findIndex(
        ({ wid }) => wid === action.payload.chatWId,
      );

      // contact not found in storage, should not happen, but for safety
      if (targetContactIdx === -1) return;

      const currentChatHistory = currentContacts[targetContactIdx].chatHistory;

      // if local history's empty just throw it all in here
      // all later incoming updates with existing messages will be ignored
      if (currentChatHistory.length <= 0) {
        state.contacts[targetContactIdx].chatHistory = [...action.payload.history];
        return;
      }

      // otherwise - cut new history chunk up to last aknowledged update to not fill
      // local history with NOT YET aknowledged messages from polling 💀
      const lastAknowledgedMessage = currentChatHistory.at(0);
      const sliceIdx = action.payload.history.findIndex(
        ({ idMessage }) => idMessage === lastAknowledgedMessage?.idMessage,
      );

      // means that user last aknowledged is not in fetched history chunk (~500 messages)
      // realistically not possible, but if user sent 500 msgs since last aknowledgement
      // PLUS have something in local history - let em enjoy 500 messages longpoll, 1 by 1 :)))
      if (sliceIdx === -1) return;

      // hash to check against for duplicates
      const currentChatHistoryIdsSet = new Set(
        currentChatHistory.map(({ idMessage }) => idMessage),
      );

      const slicedHistory = action.payload.history.slice(sliceIdx + 1);
      const toAppend = slicedHistory.filter(
        ({ idMessage }) => !currentChatHistoryIdsSet.has(idMessage),
      );

      if (toAppend.length <= 0) return;

      state.contacts[targetContactIdx].chatHistory = [...currentChatHistory, ...slicedHistory];
    },
    pushChatHistoryEntity(
      state,
      action: {
        payload: {
          chatWId: string;
          historyEntity: TChatHistory[number];
        };
        type: string;
      },
    ) {
      const currentContacts = current(state.contacts);
      const targetContactIdx = currentContacts.findIndex(
        ({ wid }) => wid === action.payload.chatWId,
      );

      // contact not found in storage, should not happen, but for safety
      if (targetContactIdx === -1) return;

      const currentChatHistory = currentContacts[targetContactIdx].chatHistory;

      // hash to check against for duplicates
      const currentChatHistoryIdsSet = new Set(
        currentChatHistory.map(({ idMessage }) => idMessage),
      );

      if (currentChatHistoryIdsSet.has(action.payload.historyEntity.idMessage)) return;

      state.contacts[targetContactIdx].chatHistory = [
        action.payload.historyEntity,
        ...currentChatHistory,
      ];
    },

    // sagas
    sendMessageAsync(state, action: { payload: { wid?: string; message: string } }) {},
    fetchChatHistoryAsync(
      state,
      action: { payload: { wid: string; qty: number; abortController?: AbortController } },
    ) {},
    fetchUpdateAsync(state, action: { payload: undefined }) {},
    aknowledgeUpdateAsync(state, action: { payload: { receiptId: number } }) {},
  },
});

const contacts = contactsSlice.reducer;
const {
  setContacts,
  pushChatHistory,
  sendMessageAsync,
  fetchChatHistoryAsync,
  fetchUpdateAsync,
  pushContact,
  pushChatHistoryEntity,
  aknowledgeUpdateAsync,
} = contactsSlice.actions;

export {
  setContacts,
  aknowledgeUpdateAsync,
  contacts,
  fetchChatHistoryAsync,
  fetchUpdateAsync,
  pushChatHistory,
  pushChatHistoryEntity,
  pushContact,
  sendMessageAsync,
};
