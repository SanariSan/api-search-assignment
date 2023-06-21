import { call, cancelled, put, takeLatest } from 'redux-saga/effects';
import { ELOG_LEVEL } from '../../../../general.type';
import type { TSafeReturn } from '../../../../helpers/sagas';
import { safe } from '../../../../helpers/sagas';
import { publishError, publishLog } from '../../../../modules/access-layer/events/pubsub';
import { AbortError } from '../../../../services';
import type {
  TAccessSessionInitIncomingFailureFields,
  TAccessSessionInitIncomingSuccessFields,
} from '../../../../services/api';
import { obtainSession } from '../../../../services/api';
import {
  obtainSessionAsync,
  setUserAuthLoadingStatus,
  setUserIsAuthenticated,
} from '../../../slices';

function* obtainSessionWorker(action: { type: string; payload: undefined }) {
  const abortController = new AbortController();
  try {
    yield put(setUserAuthLoadingStatus({ status: 'loading' }));

    const fetchStatus = (yield safe(
      call(obtainSession, {
        abortSignal: abortController.signal,
      }),
    )) as TSafeReturn<{
      success?: TAccessSessionInitIncomingSuccessFields;
      failure?: TAccessSessionInitIncomingFailureFields;
    }>;

    publishLog(ELOG_LEVEL.DEBUG, fetchStatus);

    if (fetchStatus.error !== undefined) {
      if (fetchStatus.error instanceof AbortError) {
        publishError(ELOG_LEVEL.DEBUG, fetchStatus.error);
        return;
      }
      yield put(
        setUserAuthLoadingStatus({ status: 'failure', message: String(fetchStatus.error.message) }),
      );
      return;
    }

    if (fetchStatus.response.success !== undefined) {
      yield put(
        setUserAuthLoadingStatus({ status: 'success', message: 'Session obtained successfully!' }),
      );
      yield put(setUserIsAuthenticated({ status: true }));
      return;
    }

    if (fetchStatus.response.failure !== undefined) {
      yield put(
        setUserAuthLoadingStatus({
          status: 'failure',
          message: String(fetchStatus.response.failure.detail),
        }),
      );
      yield put(
        setUserIsAuthenticated({
          status: false,
        }),
      );
      return;
    }
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
