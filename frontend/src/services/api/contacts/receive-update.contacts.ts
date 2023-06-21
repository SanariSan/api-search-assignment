import qs from 'query-string';
import { ELOG_LEVEL } from '../../../general.type';
import { publishError } from '../../../modules/access-layer/events/pubsub';
import { AbortError, InternalError } from '../../errors.services';
import { request } from '../../request.services';
import type { TContactsReceiveUpdateOutgoingFields } from '../dto';
import { ContactsReceiveUpdateIncomingSuccessDTO, validateDTO } from '../dto';
import { GET_ROUTE } from '../routes.api.const';

export async function receiveUpdate({
  dto,
  abortSignal,
}: {
  dto: TContactsReceiveUpdateOutgoingFields;
  abortSignal: AbortSignal;
}) {
  try {
    const { idInstance, apiTokenInstance } = dto;
    const response: Response = await request({
      url: qs.stringifyUrl({
        url: GET_ROUTE.RECEIVE_UPDATE({ idInstance, apiTokenInstance }),
      }),
      method: 'GET',
      abortSignal,
    });

    let parsedJsonResponse: unknown;
    try {
      parsedJsonResponse = await response.clone().json();
    } catch {
      parsedJsonResponse = await response.clone().text();
    }

    if (response.status > 100 && response.status < 400) {
      return {
        success: await validateDTO({
          schema: ContactsReceiveUpdateIncomingSuccessDTO,
          value: parsedJsonResponse,
        }),
      };
    }

    if (response.status === 429) {
      return {
        failure: {
          detail: 'Failed to fetch update, too many requests',
        },
      };
    }

    return {
      failure: {
        detail: 'Failed to fetch update',
      },
    };
  } catch (error) {
    const eCast = error as Error;
    publishError(ELOG_LEVEL.DEBUG, eCast);

    if (eCast.message === 'Request externally aborted') {
      throw new AbortError({ message: eCast.message });
    }

    throw new InternalError({ message: 'Internal error' });
  }
}
