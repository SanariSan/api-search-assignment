import { call, cancelled, delay, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { ELOG_LEVEL } from '../../../general.type';
import type { TSafeReturn } from '../../../helpers/sagas';
import { safe } from '../../../helpers/sagas';
import { publishError, publishLog } from '../../../modules/access-layer/events/pubsub';
import { AbortError } from '../../../services';
import type {
  TContactsFetchChatHistoryIncomingFailureFields,
  TContactsFetchChatHistoryIncomingSuccessFields,
  TContactsFetchChatHistoryOutgoingFields,
  TContactsSendMessageIncomingFailureFields,
  TContactsSendMessageIncomingSuccessFields,
  TContactsSendMessageOutgoingFields,
} from '../../../services/api';
import {
  ContactsFetchChatHistoryOutgoingDTO,
  ContactsSendMessageOutgoingDTO,
  fetchChatHistory,
  sendMessage,
  validateDTO,
} from '../../../services/api';
import {
  contactsSelectedContactInfo,
  userInfoApiTokenInstanceSelector,
  userInfoIdInstanceSelector,
} from '../../selectors';
import type { TContacts } from '../../slices';
import {
  fetchChatHistoryAsync,
  pushChatHistory,
  pushChatHistoryEntity,
  sendMessageAsync,
  setHistoryLoadStatus,
  setSendMessageLoadStatus,
} from '../../slices';

function* sendMessageWorker(action: {
  payload: { wid?: string; message: string; abortController?: AbortController };
  type: string;
}) {
  const abortController = action.payload.abortController ?? new AbortController();
  try {
    yield put(setSendMessageLoadStatus({ status: 'loading' }));
    yield delay(300);

    const idInstance = (yield select(userInfoIdInstanceSelector)) as string;
    const apiTokenInstance = (yield select(userInfoApiTokenInstanceSelector)) as string;
    const chatId =
      action.payload.wid ?? ((yield select(contactsSelectedContactInfo)) as TContacts[number]).wid;

    const validateStatus = (yield safe(
      call(validateDTO, {
        schema: ContactsSendMessageOutgoingDTO,
        value: {
          idInstance,
          apiTokenInstance,
          chatId,
          message: action.payload.message,
        },
      }),
    )) as TSafeReturn<TContactsSendMessageOutgoingFields>;

    if (validateStatus.error !== undefined) {
      yield put(setSendMessageLoadStatus({ status: 'failure' }));
      return;
    }

    const fetchStatus = (yield safe(
      call(sendMessage, {
        dto: validateStatus.response,
        abortSignal: abortController.signal,
      }),
    )) as TSafeReturn<{
      success?: TContactsSendMessageIncomingSuccessFields;
      failure?: TContactsSendMessageIncomingFailureFields;
    }>;

    publishLog(ELOG_LEVEL.DEBUG, fetchStatus);

    if (fetchStatus.error !== undefined) {
      if (fetchStatus.error instanceof AbortError) {
        publishError(ELOG_LEVEL.DEBUG, fetchStatus.error);
        return;
      }

      yield put(
        setSendMessageLoadStatus({ status: 'failure', message: String(fetchStatus.error.message) }),
      );
      return;
    }

    if (fetchStatus.response.success !== undefined) {
      yield put(setSendMessageLoadStatus({ status: 'success' }));
      yield put(
        pushChatHistoryEntity({
          chatWId: chatId,
          historyEntity: {
            type: 'outgoing',
            chatId,
            idMessage: fetchStatus.response.success.idMessage,
            textMessage: action.payload.message,
            timestamp: Date.now() / 1000,
          },
        }),
      );
      return;
    }

    if (fetchStatus.response.failure !== undefined) {
      yield put(
        setSendMessageLoadStatus({
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

function* fetchChatHistoryWorker(action: {
  payload: { wid: string; qty: number; abortController?: AbortController };
  type: string;
}) {
  const abortController = action.payload.abortController ?? new AbortController();
  try {
    yield put(setHistoryLoadStatus({ status: 'loading' }));

    const idInstance = (yield select(userInfoIdInstanceSelector)) as string;
    const apiTokenInstance = (yield select(userInfoApiTokenInstanceSelector)) as string;

    const validateStatus = (yield safe(
      call(validateDTO, {
        schema: ContactsFetchChatHistoryOutgoingDTO,
        value: {
          idInstance,
          apiTokenInstance,
          chatId: action.payload.wid,
          count: action.payload.qty,
        },
      }),
    )) as TSafeReturn<TContactsFetchChatHistoryOutgoingFields>;

    if (validateStatus.error !== undefined) {
      yield put(setHistoryLoadStatus({ status: 'failure' }));
      return;
    }

    const fetchStatus = (yield safe(
      call(fetchChatHistory, {
        dto: validateStatus.response,
        abortSignal: abortController.signal,
      }),
    )) as TSafeReturn<{
      success?: TContactsFetchChatHistoryIncomingSuccessFields;
      failure?: TContactsFetchChatHistoryIncomingFailureFields;
    }>;

    publishLog(ELOG_LEVEL.DEBUG, fetchStatus);

    if (fetchStatus.error !== undefined) {
      if (fetchStatus.error instanceof AbortError) {
        publishError(ELOG_LEVEL.DEBUG, fetchStatus.error);
        return;
      }

      yield put(
        setHistoryLoadStatus({ status: 'failure', message: String(fetchStatus.error.message) }),
      );
      return;
    }

    if (fetchStatus.response.success !== undefined) {
      yield put(setHistoryLoadStatus({ status: 'success' }));
      yield put(
        pushChatHistory({ chatWId: action.payload.wid, history: fetchStatus.response.success }),
      );
      return;
    }

    if (fetchStatus.response.failure !== undefined) {
      yield put(
        setHistoryLoadStatus({
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

function* historyContactsWatcher() {
  yield takeLatest([fetchChatHistoryAsync], fetchChatHistoryWorker);
  yield takeEvery([sendMessageAsync], sendMessageWorker);
}

export { historyContactsWatcher };
