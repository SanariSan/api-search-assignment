import type { AxiosResponse } from 'axios';

interface IParsedResponse {
  request: {
    // data: ;
    request: Record<string, unknown>;
    headers: string;
  };
  response: {
    response: AxiosResponse;
    data?: string | Record<string, unknown>;
    headers: Record<string, unknown>;
  };
}

export type { IParsedResponse };
