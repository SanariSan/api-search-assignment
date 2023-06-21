import { ELOG_LEVEL } from '../../../general.type';
import { publishLog } from '../../../modules/access-layer/events/pubsub';
import type { TLocalStorageKey } from './local-storage.helper.type';

const getLSValue = (key: TLocalStorageKey, logging = false): string | undefined => {
  const item = window.localStorage.getItem(key);
  let parsed: string | undefined;

  try {
    parsed = item !== null ? String(item) : undefined;
  } catch {
    if (logging) publishLog(ELOG_LEVEL.DEBUG, `No key (${key}) in local storage`);
  }

  return parsed;
};

const setLSValue = (key: TLocalStorageKey, value: unknown): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const delLSValue = (key: TLocalStorageKey): void => {
  window.localStorage.removeItem(key);
};

export { getLSValue, setLSValue, delLSValue };
