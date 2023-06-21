import { cancelled, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  contactsChatHistoryFetchSizeSelector,
  contactsSelectedContactInfo,
  loadingUpdatesSelector,
} from '../../selectors';
import type { TContacts } from '../../slices';
import {
  fetchChatHistoryAsync,
  fetchUpdateAsync,
  pushContact,
  setSelectedContactIdxUi,
  setUpdatesLoadStatus,
} from '../../slices';
import type { TLoadingStatus } from '../../slices/slices.type';

function* fetchLastMessageOnContactsAddWorker(action: {
  payload: { contact: Pick<TContacts[number], 'wid'> };
  type: string;
}) {
  yield put(fetchChatHistoryAsync({ wid: action.payload.contact.wid, qty: 1 }));
}

function* fetchHistoryOnSelectedContactChangeWorker(action: {
  payload: { contactIdx: number };
  type: string;
}) {
  const abortController = new AbortController();
  try {
    const contact = (yield select(contactsSelectedContactInfo)) as TContacts[number] | undefined;
    const qty = (yield select(contactsChatHistoryFetchSizeSelector)) as number;

    if (contact === undefined) return;

    yield put(fetchChatHistoryAsync({ wid: contact.wid, qty, abortController }));
  } finally {
    if ((yield cancelled()) as boolean) {
      abortController.abort();
    }
  }
}

function* pollUpdatesOnSelectedContactChangeWorker(action: { type: string }) {
  // exit on empty selection
  const contact = (yield select(contactsSelectedContactInfo)) as TContacts[number] | undefined;
  if (contact === undefined) return;

  // exit on loading to not double fetch (takeEvery)
  const currLoadingStatus = (yield select(loadingUpdatesSelector)) as TLoadingStatus;
  if (currLoadingStatus === 'loading') return;

  yield put(fetchUpdateAsync());
}

function* sideChainWatcher() {
  yield takeLatest([pushContact], fetchLastMessageOnContactsAddWorker);
  yield takeLatest([setSelectedContactIdxUi], fetchHistoryOnSelectedContactChangeWorker);
  yield takeLatest([setSelectedContactIdxUi], pollUpdatesOnSelectedContactChangeWorker);
  yield takeEvery([setUpdatesLoadStatus], pollUpdatesOnSelectedContactChangeWorker);
}

export { sideChainWatcher };
