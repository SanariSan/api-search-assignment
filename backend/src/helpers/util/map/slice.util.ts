function mapSlice<TKey, TVal>(
  map: Map<TKey, TVal> = new Map<TKey, TVal>(),
  start = 0,
  end = map.size,
) {
  return [...map.keys()]
    .slice(start, end)
    .reduce<Map<TKey, TVal>>((acc, key) => acc.set(key, map.get(key) as TVal), new Map());
}

export { mapSlice };
