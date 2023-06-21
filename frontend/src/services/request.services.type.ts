type TRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface IRequestOptions {
  url: RequestInfo | string;
  method?: TRequestMethod;
  headers?: HeadersInit;
  body?: BodyInit | null | undefined;
  fetchOtions?: RequestInit;
  timeoutMS?: number;
  attemptDelayMS?: number;
  attemptDelayGrowthMS?: number;
  maxAttempts?: number;
  abortSignal?: AbortSignal;
}

export type { TRequestMethod, IRequestOptions };
