import qs from 'query-string';
import { ELOG_LEVEL } from '../../../general.type';
import { publishError } from '../../../modules/access-layer/events/pubsub';
import { AbortError, InternalError } from '../../errors.services';
import { request } from '../../request.services';
import { validateDTO } from '../dto';
import type { TContactsAknowledgeUpdateOutgoingFields } from '../dto/contacts/aknowledge-update.contacts';
import { ContactsAknowledgeUpdateIncomingSuccessDTO } from '../dto/contacts/aknowledge-update.contacts';
import { GET_ROUTE } from '../routes.api.const';

export async function aknowledgeUpdate({
  dto,
  abortSignal,
}: {
  dto: TContactsAknowledgeUpdateOutgoingFields;
  abortSignal: AbortSignal;
}) {
  try {
    const { idInstance, apiTokenInstance, receiptId } = dto;
    const response: Response = await request({
      url: qs.stringifyUrl({
        url: GET_ROUTE.AKNOWLEDGE_UPDATE({ idInstance, apiTokenInstance, receiptId }),
      }),
      method: 'DELETE',
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
          schema: ContactsAknowledgeUpdateIncomingSuccessDTO,
          value: parsedJsonResponse,
        }),
      };
    }

    if (response.status === 429) {
      return {
        failure: {
          detail: 'Failed to aknowledge update, too many requests',
        },
      };
    }

    return {
      failure: {
        detail: 'Failed to aknowledge update',
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
