import type { IGenericRequest } from '../../core/request';
import { requestGeneric } from '../../core/request';
import type { TBindedMethodHostRequest, TBindedMethodRequest } from './request.type';

const Request = {
  get: ({ host, path, data, headers, ...args }: TBindedMethodRequest) =>
    requestGeneric({ method: 'GET', host, path, data, headers, ...args }),
  post: ({ host, path, data, headers, ...args }: TBindedMethodRequest) =>
    requestGeneric({ method: 'POST', host, path, data, headers, ...args }),
  put: ({ host, path, data, headers, ...args }: TBindedMethodRequest) =>
    requestGeneric({ method: 'PUT', host, path, data, headers, ...args }),
  delete: ({ host, path, data, headers, ...args }: TBindedMethodRequest) =>
    requestGeneric({ method: 'DELETE', host, path, data, headers, ...args }),
};

const requestBindedHost = ({ host }: Pick<IGenericRequest, 'host'>) => ({
  get: ({ path, data, headers, ...args }: TBindedMethodHostRequest) =>
    Request.get({ host, path, data, headers, ...args }),
  post: ({ path, data, headers, ...args }: TBindedMethodHostRequest) =>
    Request.post({ host, path, data, headers, ...args }),
  put: ({ path, data, headers, ...args }: TBindedMethodHostRequest) =>
    Request.put({ host, path, data, headers, ...args }),
  delete: ({ path, data, headers, ...args }: TBindedMethodHostRequest) =>
    Request.delete({ host, path, data, headers, ...args }),
});

export { Request, requestBindedHost };
