import type { ELOG_LEVEL } from '../../../../general.type';

interface IPublishEntityCore {
  readonly channel: string;
  readonly logLevel: ELOG_LEVEL;
  readonly message: unknown | Error;
}

export type { IPublishEntityCore };
