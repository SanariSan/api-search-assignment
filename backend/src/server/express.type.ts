import type { Request } from 'express';
import type { Session } from 'express-session';

type TSessionCustomFields = {
  isProcessing?: boolean;
};

type TEntity = {
  email: string;
  number?: string;
};

type TRequestTypedBody = Omit<Request, 'body'> & {
  body?: Record<string, unknown> | string;
};

type TRequestNarrowed = TRequestTypedBody & {
  session: Session & {
    user?: TSessionCustomFields;
  };
};

type TRequestValidatedEntity = TRequestNarrowed & {
  query: TEntity;
};

type TRequest = TRequestNarrowed | TRequestValidatedEntity;

export type { TRequestNarrowed, TRequest, TRequestValidatedEntity, TEntity };
