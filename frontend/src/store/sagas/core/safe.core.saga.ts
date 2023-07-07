import type { CallEffect } from 'redux-saga/effects';

export function* safe<
  TReturnType,
  TCallEffectWrapped extends CallEffect<unknown> = CallEffect<unknown>,
>(effect: TCallEffectWrapped) {
  try {
    return { response: (yield effect) as TReturnType };
  } catch (error) {
    return { error: error as Error };
  }
}
