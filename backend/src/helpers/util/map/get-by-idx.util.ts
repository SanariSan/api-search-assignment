function mapGetByIdx<TKey, TVal>(map: Map<TKey, TVal>, idx: number): Map<TKey, TVal> {
  return new Map<TKey, TVal>([[...map.entries()][idx]]);
}

export { mapGetByIdx };
