import type { RequestHandler } from 'express';

type TApiVersion = 'v1' | 'v2';
type TApiBranches = Record<TApiVersion, RequestHandler>;

export type { TApiVersion, TApiBranches };
