import { call, cancelled, put, select, takeEvery, takeLeading } from 'redux-saga/effects';
import { ELOG_LEVEL } from '../../../general.type';
import type { TSafeReturn } from '../../../helpers/sagas';
import { safe } from '../../../helpers/sagas';
import { publishError, publishLog } from '../../../modules/access-layer/events/pubsub';
import { AbortError } from '../../../services';
import type {
  TContactsReceiveUpdateIncomingFailureFields,
  TContactsReceiveUpdateIncomingSuccessFields,
  TContactsReceiveUpdateOutgoingFields,
} from '../../../services/api';
import {
  ContactsReceiveUpdateOutgoingDTO,
  aknowledgeUpdate,
  receiveUpdate,
  validateDTO,
} from '../../../services/api';
import type {
  TContactsAknowledgeUpdateIncomingFailureFields,
  TContactsAknowledgeUpdateIncomingSuccessFields,
  TContactsAknowledgeUpdateOutgoingFields,
} from '../../../services/api/dto/contacts/aknowledge-update.contacts';
import { ContactsAknowledgeUpdateOutgoingDTO } from '../../../services/api/dto/contacts/aknowledge-update.contacts';
import { userInfoApiTokenInstanceSelector, userInfoIdInstanceSelector } from '../../selectors';
import {
  aknowledgeUpdateAsync,
  fetchUpdateAsync,
  pushChatHistoryEntity,
  setAknowledgeLoadStatus,
  setUpdatesLoadStatus,
} from '../../slices';

function* aknowledgeUpdateWorker(action: { payload: { receiptId: number }; type: string }) {
  const abortController = new AbortController();
  try {
    yield put(setAknowledgeLoadStatus({ status: 'loading' }));

    const idInstance = (yield select(userInfoIdInstanceSelector)) as string;
    const apiTokenInstance = (yield select(userInfoApiTokenInstanceSelector)) as string;

    const validateStatus = (yield safe(
      call(validateDTO, {
        schema: ContactsAknowledgeUpdateOutgoingDTO,
        value: {
          idInstance,
          apiTokenInstance,
          receiptId: action.payload.receiptId,
        },
      }),
    )) as TSafeReturn<TContactsAknowledgeUpdateOutgoingFields>;

    if (validateStatus.error !== undefined) {
      yield put(setAknowledgeLoadStatus({ status: 'failure' }));
      return;
    }

    const fetchStatus = (yield safe(
      call(aknowledgeUpdate, {
        dto: validateStatus.response,
        abortSignal: abortController.signal,
      }),
    )) as TSafeReturn<{
      success?: TContactsAknowledgeUpdateIncomingSuccessFields;
      failure?: TContactsAknowledgeUpdateIncomingFailureFields;
    }>;

    publishLog(ELOG_LEVEL.DEBUG, fetchStatus);

    if (fetchStatus.error !== undefined) {
      if (fetchStatus.error instanceof AbortError) {
        publishError(ELOG_LEVEL.DEBUG, fetchStatus.error);
        return;
      }

      yield put(
        setAknowledgeLoadStatus({ status: 'failure', message: String(fetchStatus.error.message) }),
      );
      return;
    }

    if (fetchStatus.response.success !== undefined) {
      yield put(setAknowledgeLoadStatus({ status: 'success' }));
      return;
    }

    if (fetchStatus.response.failure !== undefined) {
      yield put(
        setAknowledgeLoadStatus({
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

function* receiveUpdateWorker(action: { type: string }) {
  const abortController = new AbortController();
  try {
    yield put(setUpdatesLoadStatus({ status: 'loading' }));

    const idInstance = (yield select(userInfoIdInstanceSelector)) as string;
    const apiTokenInstance = (yield select(userInfoApiTokenInstanceSelector)) as string;

    const validateStatus = (yield safe(
      call(validateDTO, {
        schema: ContactsReceiveUpdateOutgoingDTO,
        value: {
          idInstance,
          apiTokenInstance,
        },
      }),
    )) as TSafeReturn<TContactsReceiveUpdateOutgoingFields>;

    if (validateStatus.error !== undefined) {
      yield put(setUpdatesLoadStatus({ status: 'failure' }));
      return;
    }

    const fetchStatus = (yield safe(
      call(receiveUpdate, {
        dto: validateStatus.response,
        abortSignal: abortController.signal,
      }),
    )) as TSafeReturn<{
      success?: TContactsReceiveUpdateIncomingSuccessFields;
      failure?: TContactsReceiveUpdateIncomingFailureFields;
    }>;

    publishLog(ELOG_LEVEL.DEBUG, fetchStatus);

    if (fetchStatus.error !== undefined) {
      if (fetchStatus.error instanceof AbortError) {
        publishError(ELOG_LEVEL.DEBUG, fetchStatus.error);
        return;
      }

      yield put(
        setUpdatesLoadStatus({ status: 'failure', message: String(fetchStatus.error.message) }),
      );
      return;
    }

    if (fetchStatus.response.success !== undefined) {
      yield put(setUpdatesLoadStatus({ status: 'success' }));

      // no updates
      if (fetchStatus.response.success === null) return;

      const {
        receiptId,
        body: {
          timestamp,
          typeWebhook,
          senderData: { chatId },
          idMessage,
          messageData,
        },
      } = fetchStatus.response.success;
      const type = typeWebhook.includes('incoming') ? 'incoming' : 'outgoing';
      const textMessage =
        messageData.textMessageData?.textMessage ??
        messageData.extendedTextMessageData?.text ??
        '{Error receiving text message, please contact developer}';

      // notification cleanup
      yield put(aknowledgeUpdateAsync({ receiptId }));
      yield put(
        pushChatHistoryEntity({
          chatWId: chatId,
          historyEntity: {
            type,
            chatId,
            idMessage,
            textMessage,
            timestamp,
          },
        }),
      );
      return;
    }

    if (fetchStatus.response.failure !== undefined) {
      yield put(
        setUpdatesLoadStatus({
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

function* updatesContactsWatcher() {
  yield takeEvery([fetchUpdateAsync], receiveUpdateWorker);
  yield takeLeading([aknowledgeUpdateAsync], aknowledgeUpdateWorker);
}

export { updatesContactsWatcher };
