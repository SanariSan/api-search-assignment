import { call } from 'redux-saga/effects';
import { loadingStatusWatcher } from './status-message.loading';

function* loadingRootWatcher() {
  yield call(loadingStatusWatcher);
}

export { loadingRootWatcher };
