import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type { Schema } from 'yup';
import { call, put } from 'redux-saga/effects';
import type { TLoadingStatus } from '../../slices/slices.type';
import { safe } from './safe.core.saga';
import { validateDTO } from '../../../services/api';

function* validateDTOWorker<TValidatedFileds extends Record<string, unknown>>({
  schema,
  payload: value,
  loadingStatusReporter,
}: {
  schema: Schema;
  payload: TValidatedFileds;
  abortController: AbortController;
  loadingStatusReporter?: ActionCreatorWithPayload<{ status: TLoadingStatus }>;
  isDetailedReport?: boolean;
}) {
  const validateStatus = yield* safe<TValidatedFileds>(
    call(validateDTO, {
      schema,
      value,
    }),
  );

  if (validateStatus.error !== undefined) {
    if (loadingStatusReporter !== undefined)
      yield put(
        loadingStatusReporter({
          status: 'failure',
        }),
      );

    return false;
  }

  return validateStatus.response;
}

export { validateDTOWorker };
