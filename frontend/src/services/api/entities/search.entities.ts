import qs from 'query-string';
import { ELOG_LEVEL } from '../../../general.type';
import { publishError } from '../../../modules/access-layer/events/pubsub';
import { AbortError, InternalError } from '../../errors.services';
import { request } from '../../request.services';
import { validateDTO } from '../dto';
import type { TEntitiesSearchOutgoingFields } from '../dto/entities';
import {
  EntitiesSearchIncomingFailureDTO,
  EntitiesSearchIncomingSuccessDTO,
} from '../dto/entities';
import { ROUTES } from '../routes.api.const';

export async function searchEntities({
  dto,
  abortSignal,
}: {
  dto: TEntitiesSearchOutgoingFields;
  abortSignal: AbortSignal;
}) {
  try {
    const response: Response = await request({
      url: qs.stringifyUrl({
        url: ROUTES.SEARCH.ENTITY,
        query: dto,
      }),
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
          schema: EntitiesSearchIncomingSuccessDTO,
          value: parsedJsonResponse,
        }),
      };
    }

    return {
      failure: await validateDTO({
        schema: EntitiesSearchIncomingFailureDTO,
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
