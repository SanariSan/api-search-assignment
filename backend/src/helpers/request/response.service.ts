import type { AxiosError, AxiosResponse } from 'axios';
import type { IParsedResponse } from './response.service.type';
import { ELOG_LEVEL } from '../../general.type';
import { publishErrorUnexpected } from '../../modules/access-layer/events/pubsub';

function parseResponse({ response }: { readonly response: unknown }): IParsedResponse {
  const castedResponse = response as AxiosResponse;
  return {
    request: {
      // data: response.request.data,
      request: castedResponse.request as Record<string, unknown>,
      /* eslint-disable-next-line no-underscore-dangle */
      headers: (castedResponse.request as Record<string, unknown>)._header as string,
      /* eslint-enable-next-line no-underscore-dangle */
    },
    response: {
      response: castedResponse,
      data: castedResponse.data,
      headers: castedResponse.headers as Record<string, unknown>,
    },
  };
}

function handleErrorResponse(response: Readonly<unknown>): Promise<AxiosResponse> {
  const castedResponse = response as AxiosError;

  // @ts-expect-error Will rework axios later and fix this
  publishErrorUnexpected(ELOG_LEVEL.WARN, castedResponse.message);

  return Promise.reject(castedResponse.response);
}

export { handleErrorResponse, parseResponse };
