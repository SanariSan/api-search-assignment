import { cancelled, put, takeLatest } from 'redux-saga/effects';
import { AbortError } from '../../../../services';
import type {
  TAccessSessionInitIncomingFailureFields,
  TAccessSessionInitIncomingSuccessFields,
} from '../../../../services/api';
import { obtainSession } from '../../../../services/api';
import {
  obtainSessionAsync,
  setErrorMessageUi,
  setSuccessMessageUi,
  setUserAuthLoadingStatus,
  setUserIsAuthenticated,
} from '../../../slices';
import { fetchWorker } from '../../core';

function* obtainSessionWorker(action: { type: string; payload: undefined }) {
  const abortController = new AbortController();
  try {
    yield put(setUserAuthLoadingStatus({ status: 'loading' }));

    yield* fetchWorker<
      TAccessSessionInitIncomingSuccessFields,
      TAccessSessionInitIncomingFailureFields
    >({
      abortSignal: abortController.signal,
      service: obtainSession,
      loadingStatus: {
        reporter: setUserAuthLoadingStatus,
      },
      *onSuccess() {
        yield put(setUserIsAuthenticated({ status: true }));
        yield put(
          setSuccessMessageUi({
            title: 'Success',
            description: 'Session obtained successfully!',
          }),
        );
      },
      *onFailure(_) {
        yield put(
          setUserIsAuthenticated({
            status: false,
          }),
        );
        yield put(
          setErrorMessageUi({
            title: 'Error',
            description: String(_.detail),
          }),
        );
      },
      *onSystemFailure(_) {
        if (_ instanceof AbortError) return;
        yield put(
          setErrorMessageUi({
            title: 'Error',
            description: String(_.message),
          }),
        );
      },
    });
  } finally {
    if ((yield cancelled()) as boolean) {
      abortController.abort();
    }
  }
}

function* userAuthStatusWatcher() {
  yield takeLatest(obtainSessionAsync, obtainSessionWorker);
}

export { userAuthStatusWatcher };
