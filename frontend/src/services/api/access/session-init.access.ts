import qs from 'query-string';
import { ELOG_LEVEL } from '../../../general.type';
import { publishError } from '../../../modules/access-layer/events/pubsub';
import { AbortError, InternalError } from '../../errors.services';
import { request } from '../../request.services';
import {
  AccessSessionInitIncomingFailureDTO,
  AccessSessionInitIncomingSuccessDTO,
  validateDTO,
} from '../dto';
import { ROUTES } from '../routes.api.const';

export async function obtainSession({ abortSignal }: { abortSignal: AbortSignal }) {
  try {
    const response: Response = await request({
      url: qs.stringifyUrl({
        url: ROUTES.ACCESS.SESSION_INIT,
      }),
      maxAttempts: 3,
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
          schema: AccessSessionInitIncomingSuccessDTO,
          value: parsedJsonResponse,
        }),
      };
    }

    return {
      failure: await validateDTO({
        schema: AccessSessionInitIncomingFailureDTO,
        value: parsedJsonResponse,
      }),
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
