type TSafeReturn<TReturn = unknown, TError = Error> =
  | { response: TReturn; error: undefined }
  | { response: undefined; error: TError };

export type { TSafeReturn };
