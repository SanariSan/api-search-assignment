import type { TKeyValArg } from './map.type';

function mapFindIdx<TKey, TVal>(
  map: Map<TKey, TVal>,
  { key, value }: TKeyValArg<TKey, TVal>,
): number | -1 {
  if (map.size === 0) {
    return -1;
  }

  if (key !== undefined) {
    return [...map.keys()].indexOf(key);
  }

  if (value !== undefined) {
    return [...map.values()].indexOf(value);
  }

  return -1;
}

export { mapFindIdx };
