import qs from 'query-string';
import { ELOG_LEVEL } from '../../../general.type';
import { publishError } from '../../../modules/access-layer/events/pubsub';
import { request } from '../../request.services';
import type { TAccessCheckSessionOutgoingFields } from '../dto';
import { AccessCheckSessionIncomingSuccessDTO, validateDTO } from '../dto';
import { AbortError, InternalError } from '../../errors.services';
import { GET_ROUTE } from '../routes.api.const';

export async function checkUserAuthStatus({
  dto,
  abortSignal,
}: {
  dto: TAccessCheckSessionOutgoingFields;
  abortSignal: AbortSignal;
}) {
  try {
    const { idInstance, apiTokenInstance } = dto;
    const response: Response = await request({
      url: qs.stringifyUrl({
        url: GET_ROUTE.CHECK_SESSION({ idInstance, apiTokenInstance }),
      }),
      abortSignal,
    });
    const parsedJsonResponse: unknown = await response.clone().json();

    if (response.status > 100 && response.status < 400) {
      return {
        success: await validateDTO({
          schema: AccessCheckSessionIncomingSuccessDTO,
          value: parsedJsonResponse,
        }),
      };
    }

    return {
      failure: {
        detail: 'Invalid credentials',
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
