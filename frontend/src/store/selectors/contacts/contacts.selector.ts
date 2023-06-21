import { createSelector } from '@reduxjs/toolkit';
import type { TRootState } from '../../redux.store.type';
import { uiSelectedContactIdxSelector } from '../ui';

const contactsSelector = (state: TRootState) => state.contacts.contacts;
const contactsSelectedContactInfo = createSelector(
  contactsSelector,
  uiSelectedContactIdxSelector,
  (contacts, selectedContactIdx) => {
    if (contacts[selectedContactIdx] === undefined) return;

    return contacts[selectedContactIdx];
  },
);
const contactsUserHistorySelector = ({ wid }: { wid: string }) =>
  createSelector(contactsSelector, (contacts) => {
    const targetContactIdx = contacts.findIndex((el, i) => el.wid === wid);
    if (targetContactIdx === -1) return [];

    return contacts[targetContactIdx].chatHistory;
  });
const contactsChatHistoryFetchSizeSelector = (state: TRootState) =>
  state.contacts.chatHistoryFetchSize;
const contactsSelectedContactChatHistorySelector = createSelector(
  contactsSelectedContactInfo,
  (selectedContactInfo) => {
    if (selectedContactInfo === undefined) return [];

    return [...selectedContactInfo.chatHistory].reverse();
  },
);

export {
  contactsChatHistoryFetchSizeSelector,
  contactsSelectedContactChatHistorySelector,
  contactsSelectedContactInfo,
  contactsSelector,
  contactsUserHistorySelector,
};
