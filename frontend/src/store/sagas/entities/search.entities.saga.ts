import { call, cancelled, put, takeEvery } from 'redux-saga/effects';
import { ELOG_LEVEL } from '../../../general.type';
import type { TSafeReturn } from '../../../helpers/sagas';
import { safe } from '../../../helpers/sagas';
import { publishError, publishLog } from '../../../modules/access-layer/events/pubsub';
import { AbortError } from '../../../services';
import { searchEntities, validateDTO } from '../../../services/api';
import type {
  TEntitiesSearchIncomingFailureFields,
  TEntitiesSearchIncomingSuccessFields,
  TEntitiesSearchOutgoingFields,
} from '../../../services/api/dto/entities';
import { EntitiesSearchOutgoingDTO } from '../../../services/api/dto/entities';
import type { TEntities } from '../../slices';
import { searchEntitiesAsync, setEntities, setSearchEntitiesLoadingStatus } from '../../slices';

function* searchWorker(action: {
  payload: Partial<Exclude<TEntities[number], undefined>>;
  type: string;
}) {
  const abortController = new AbortController();
  try {
    yield put(setSearchEntitiesLoadingStatus({ status: 'loading' }));

    const validateStatus = (yield safe(
      call(validateDTO, {
        schema: EntitiesSearchOutgoingDTO,
        value: action.payload,
      }),
    )) as TSafeReturn<TEntitiesSearchOutgoingFields>;

    if (validateStatus.error !== undefined) {
      yield put(setSearchEntitiesLoadingStatus({ status: 'failure' }));
      return;
    }

    const fetchStatus = (yield safe(
      call(searchEntities, {
        dto: validateStatus.response,
        abortSignal: abortController.signal,
      }),
    )) as TSafeReturn<{
      success?: TEntitiesSearchIncomingSuccessFields;
      failure?: TEntitiesSearchIncomingFailureFields;
    }>;

    publishLog(ELOG_LEVEL.DEBUG, fetchStatus);

    if (fetchStatus.error !== undefined) {
      if (fetchStatus.error instanceof AbortError) {
        publishError(ELOG_LEVEL.DEBUG, fetchStatus.error);
        return;
      }

      yield put(
        setSearchEntitiesLoadingStatus({
          status: 'failure',
          message: String(fetchStatus.error.message),
        }),
      );
      return;
    }

    if (fetchStatus.response.success !== undefined) {
      yield put(setSearchEntitiesLoadingStatus({ status: 'success' }));
      yield put(setEntities({ entities: fetchStatus.response.success.data.entities }));
      return;
    }

    if (fetchStatus.response.failure !== undefined) {
      yield put(
        setSearchEntitiesLoadingStatus({
          status: 'failure',
          message: String(fetchStatus.response.failure.detail),
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

function* searchWatcher() {
  yield takeEvery([searchEntitiesAsync], searchWorker);
  // yield takeLatest([searchEntityV2Async], searchV2Worker);
}

export { searchWatcher };
