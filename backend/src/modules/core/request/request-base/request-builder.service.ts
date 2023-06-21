import type { AxiosProxyConfig } from 'axios';
import type { IGenericRequest, IRequest, TRequestMethod } from './request-base.service.type';

class RequestBuilder {
  private request: IRequest;

  constructor() {
    this.request = {};
  }

  setUrl({ url }: { url: string }) {
    this.request.url = url;
    return this;
  }

  setMethod({ method }: { method: TRequestMethod }) {
    this.request.method = method;
    return this;
  }

  setHeaders({ headers }: { headers: HeadersInit }) {
    this.request.headers = headers;
    return this;
  }

  setBody({ data }: { data?: unknown }) {
    this.request.data = data;
    return this;
  }

  setProxy({ proxy }: { proxy: AxiosProxyConfig }) {
    this.request.proxy = proxy;
    return this;
  }

  // FIXME: later fix type here, same as type file
  setLibSpecificOptions({ ...args }: Pick<IGenericRequest, 'args'>) {
    this.request = { ...this.request, ...args };
    return this;
  }

  getRequest() {
    return this.request;
  }
}

export { RequestBuilder };
