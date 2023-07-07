import qs from 'query-string';
import { ELOG_LEVEL } from '../../../general.type';
import { publishError } from '../../../modules/access-layer/events/pubsub';
import { AbortError, InternalError } from '../../errors.services';
import { request } from '../../request.services';
import { classifyResponse } from '../classify-response.api';
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

    // request came through successfully, parse it accordingly
    return await classifyResponse({
      response,
      expectedSuccessDTO: EntitiesSearchIncomingSuccessDTO,
      expectedFailureDTO: EntitiesSearchIncomingFailureDTO,
    });
  } catch (error) {
    // request failed, parse system error
    // when more cases are encountered I'll move this to classifySystemError
    const eCast = error as Error;
    publishError(ELOG_LEVEL.DEBUG, eCast);

    if (eCast.message === 'Request externally aborted') {
      throw new AbortError({ message: eCast.message });
    }

    throw new InternalError({ message: 'Internal error' });
  }
}
