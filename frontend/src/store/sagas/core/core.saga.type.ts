// interface IT<T, TResult> extends Iterator<T, TResult> {
//   [Symbol.iterator]: () => IT<T, TResult>;
// }

type TSafeReturn<TReturn = unknown, TError = Error> =
  | { response: TReturn; error: undefined }
  | { response: undefined; error: TError };

export type { TSafeReturn };
