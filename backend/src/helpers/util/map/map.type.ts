type TKeyValArg<TKey, TVal> =
  | {
      readonly key: TKey;
      readonly value?: never;
    }
  | {
      readonly key?: never;
      readonly value: TVal;
    };

export type { TKeyValArg };
