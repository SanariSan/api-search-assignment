interface IError extends Error {
  name: string;
  description: string;
  errorTimestamp: number;
  errorTimestampHr: Readonly<Date>;
}

export type { IError };
