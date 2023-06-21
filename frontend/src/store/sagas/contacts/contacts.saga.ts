import { all, call } from 'redux-saga/effects';
import { updatesContactsWatcher } from './update.contacts.saga';
import { historyContactsWatcher } from './history.contacts.saga';
import { sideChainWatcher } from './side-chains.contacts';

function* contactsRootWatcher() {
  yield all([call(sideChainWatcher), call(historyContactsWatcher), call(updatesContactsWatcher)]);
}

export { contactsRootWatcher };
