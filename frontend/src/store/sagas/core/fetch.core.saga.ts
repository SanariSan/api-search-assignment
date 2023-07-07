import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import type { TIncomingFailureFields, TIncomingSuccessFields } from '../../../services/api';
import type { TLoadingStatus } from '../../slices/slices.type';
import { safe } from './safe.core.saga';
import { processSystemError } from './system-error.core.saga';
import { ELOG_LEVEL } from '../../../general.type';
import { publishLog } from '../../../modules/access-layer/events/pubsub';

function* fetchWorker<
  TIncomingSuccessFieldsLocal extends TIncomingSuccessFields,
  TIncomingFailureFieldsLocal extends TIncomingFailureFields,
  TOutgoingFields extends Record<string, unknown> | undefined = undefined,
  // TService = ({ dto, abortSignal }: { dto?: TOutgoingFields; abortSignal: AbortSignal }) => Promise<
  //   TSafeReturn<{
  //     success?: TIncomingSuccessFieldsLocal;
  //     failure?: TIncomingFailureFieldsLocal;
  //   }>
  // >,
>({
  service,
  dto,
  abortSignal,
  loadingStatus,
  onSuccess,
  onFailure,
  onSystemFailure,
}: {
  // intentionally untyped because I have NO IDEA WHAT IT WANTS FROM ME
  service;
  dto?: TOutgoingFields;
  abortSignal: AbortSignal;
  loadingStatus: {
    reporter?: ActionCreatorWithPayload<{ status: TLoadingStatus }>;
    ignoreOnSuccess?: true;
    ignoreOnFailure?: true;
    ignoreOnSystemFailure?: true;
  };
  onSuccess: (arg: TIncomingSuccessFieldsLocal) => Generator;
  onFailure: (arg: TIncomingFailureFieldsLocal) => Generator;
  onSystemFailure: (arg: Error) => Generator;
}) {
  const fetchStatus = yield* safe<{
    success?: TIncomingSuccessFieldsLocal;
    failure?: TIncomingFailureFieldsLocal;
  }>(
    call(service, {
      dto,
      abortSignal,
    }),
  );

  const { reporter, ignoreOnSystemFailure, ignoreOnSuccess, ignoreOnFailure } = loadingStatus;

  if (fetchStatus.error !== undefined) {
    publishLog(ELOG_LEVEL.DEBUG, fetchStatus.error);

    yield* processSystemError({
      classifiedSystemError: fetchStatus.error,
    });

    yield* onSystemFailure(fetchStatus.error);

    if (reporter !== undefined && !ignoreOnSystemFailure) {
      yield put(
        reporter({
          status: 'failure',
        }),
      );
    }

    return;
  }

  if (fetchStatus.response.success !== undefined) {
    publishLog(ELOG_LEVEL.DEBUG, fetchStatus.response.success);

    yield* onSuccess(fetchStatus.response.success);

    if (reporter !== undefined && !ignoreOnSuccess) {
      yield put(
        reporter({
          status: 'success',
        }),
      );
    }

    return;
  }

  if (fetchStatus.response.failure !== undefined) {
    publishLog(ELOG_LEVEL.DEBUG, fetchStatus.response.failure);

    yield onFailure(fetchStatus.response.failure);

    if (reporter !== undefined && !ignoreOnFailure) {
      yield put(
        reporter({
          status: 'failure',
        }),
      );
    }

    return;
  }
}

export { fetchWorker };
