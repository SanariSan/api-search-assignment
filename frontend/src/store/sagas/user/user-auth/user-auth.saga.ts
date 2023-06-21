import { all, call } from 'redux-saga/effects';
import { userAuthStatusWatcher } from './auth-status.user-auth';

function* userAuthRootWatcher() {
  yield all([call(userAuthStatusWatcher)]);
}

export { userAuthRootWatcher };
