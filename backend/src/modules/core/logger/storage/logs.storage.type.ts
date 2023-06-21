type TLog = string;

type THashLogMap = Map<string, TLog>;

type TPropertyNames = 'maxSize' | 'lastLogId' | 'logs';

type TSource = {
  maxSize: number;
  lastLogId: string;
  lastAccessedLogId: string;
  logs: THashLogMap;
};

type TStorage = Record<string, TSource>;

export type { TLog, THashLogMap, TPropertyNames, TSource, TStorage };
