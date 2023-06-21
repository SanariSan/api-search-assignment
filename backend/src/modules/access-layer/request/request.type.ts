import type { IGenericRequest } from '../../core/request';

type TBindedMethodRequest = Omit<IGenericRequest, 'method'>;
type TBindedMethodHostRequest = Omit<IGenericRequest, 'method' | 'host'>;

export type { TBindedMethodRequest, TBindedMethodHostRequest };
