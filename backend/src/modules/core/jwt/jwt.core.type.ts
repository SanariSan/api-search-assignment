import type { Secret, SignOptions, VerifyOptions } from 'jsonwebtoken';

type TPayload = {
  iat?: number;
  exp?: number;
  prm?: string;
  iss?: string;
  aud?: string;
  sub?: string;
};

type TPayloadBaseChecked = {
  iat: number;
  exp: number;
  prm: string;
} & TPayload;

type TSign = (
  payload: string | Buffer | object,
  secretOrPrivateKey: Secret,
  options?: SignOptions | undefined,
) => Promise<string>;

type TVerify = (
  token: string,
  secretOrPublicKey: Secret,
  options: VerifyOptions,
) => Promise<TPayload>;

export type { TSign, TVerify, TPayload, TPayloadBaseChecked };
