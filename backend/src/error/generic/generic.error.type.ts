interface IError extends Error {
  name: string;
  description: string;
  errorTimestamp: number;
  errorTimestampHr: Readonly<Date>;
  miscellaneous?: Record<string, unknown>;
}

export type { IError };
