import { cancelled, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { AbortError } from '../../../services';
import { searchEntities } from '../../../services/api';
import type {
  TEntitiesSearchIncomingFailureFields,
  TEntitiesSearchIncomingSuccessFields,
  TEntitiesSearchOutgoingFields,
} from '../../../services/api/dto/entities';
import { EntitiesSearchOutgoingDTO } from '../../../services/api/dto/entities';
import {
  searchEntitiesAsync,
  searchEntitiesV2Async,
  setEntities,
  setSearchEntitiesLoadingStatus,
  setSuccessMessageUi,
  setWarningMessageUi,
} from '../../slices';
import { fetchWorker, validateDTOWorker } from '../core';

function* searchWorker(action: { payload: TEntitiesSearchOutgoingFields; type: string }) {
  const abortController = new AbortController();
  try {
    yield put(setSearchEntitiesLoadingStatus({ status: 'loading' }));

    const validatedDTO = yield* validateDTOWorker({
      schema: EntitiesSearchOutgoingDTO,
      payload: action.payload,
      abortController,
      loadingStatusReporter: setSearchEntitiesLoadingStatus,
    });

    if (validatedDTO === false) return;

    yield* fetchWorker<
      TEntitiesSearchIncomingSuccessFields,
      TEntitiesSearchIncomingFailureFields,
      TEntitiesSearchOutgoingFields
    >({
      abortSignal: abortController.signal,
      dto: validatedDTO,
      service: searchEntities,
      loadingStatus: {
        reporter: setSearchEntitiesLoadingStatus,
        ignoreOnFailure: true,
      },
      *onSuccess(_) {
        yield put(setEntities({ entities: _.data.entities }));
        yield put(
          setSuccessMessageUi({
            title: 'Success',
            description: `Found ${_.data.entities.length} entities`,
          }),
        );
      },
      *onFailure(_) {
        if (_.type === 3005) {
          yield put(
            setWarningMessageUi({
              title: 'Aborted on SERVER',
              description: 'Previous request was aborted',
            }),
          );
        }
      },
      *onSystemFailure(_) {
        if (_ instanceof AbortError) {
          yield put(
            setWarningMessageUi({
              title: 'Aborted on CLIENT',
              description: 'Previous request was aborted',
            }),
          );
          return;
        }
      },
    });
  } finally {
    // this triggers AUTOMATICALLY by saga on subsequent calls with takeLatest
    if ((yield cancelled()) as boolean) {
      yield put(
        setWarningMessageUi({
          title: 'Aborted on CLIENT',
          description: 'Previous request was aborted',
        }),
      );
      abortController.abort();
    }
  }
}

function* searchWatcher() {
  yield takeEvery([searchEntitiesAsync], searchWorker);
  yield takeLatest([searchEntitiesV2Async], searchWorker);
}

export { searchWatcher };
