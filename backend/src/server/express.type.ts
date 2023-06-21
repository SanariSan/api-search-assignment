import type { Request } from 'express';
import type { Session } from 'express-session';

type TSessionCustomFields = {
  isProcessing?: boolean;
};

type TRequestTypedBody = Omit<Request, 'body'> & {
  body?: Record<string, unknown> | string;
};

type TRequestNarrowed = TRequestTypedBody & {
  session: Session & {
    user?: TSessionCustomFields;
  };
};

type TRequestNarrowedAuthenticated = TRequestTypedBody & {
  session: Session & {
    user: Required<TSessionCustomFields>;
  };
};

type TRequestValidatedLogin = TRequestNarrowed & {
  body: {
    username: string;
    password: string;
  };
};

type TRequestValidatedRegister = TRequestNarrowed & {
  body: {
    email: string;
    username: string;
    password: string;
  };
};

type TRequestValidatedChangePassword = TRequestNarrowedAuthenticated & {
  body: {
    oldPassword: string;
    newPassword: string;
  };
};

type TRequest =
  | TRequestNarrowed
  | TRequestNarrowedAuthenticated
  | TRequestValidatedLogin
  | TRequestValidatedRegister
  | TRequestValidatedChangePassword;

export type {
  TRequestNarrowed,
  TRequestNarrowedAuthenticated,
  TRequestValidatedLogin,
  TRequestValidatedRegister,
  TRequestValidatedChangePassword,
  TRequest,
};
