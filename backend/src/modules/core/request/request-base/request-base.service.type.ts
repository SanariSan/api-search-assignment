import type { AxiosProxyConfig, AxiosRequestConfig } from 'axios';

type TRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface IRequest {
  method?: TRequestMethod;
  url?: string;
  headers?: HeadersInit;
  data?: unknown;
  proxy?: AxiosProxyConfig;
}

interface IGenericRequest {
  method: TRequestMethod;
  host: string;
  path: string;
  data?: unknown;
  headers?: Record<string, unknown>;
  proxyType?: 'socks' | 'http';
  proxy?: string | AxiosProxyConfig;
  args?: AxiosRequestConfig;
}

export type { IRequest, TRequestMethod, IGenericRequest };
