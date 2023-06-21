import type { ReactNode } from 'react';

type TAuthRoute =
  | {
      children: ReactNode;
      mustBe: 'authenticated' | 'unauthenticated';
      redirectLocation: string;
    }
  | {
      children: ReactNode;
      mustBe: 'any';
      redirectLocation?: string;
    };

export type { TAuthRoute };
