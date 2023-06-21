import type { ELOG_LEVEL } from '../../../../general.type';

interface IPublishEntity {
  readonly channel: string;
  readonly logLevel: ELOG_LEVEL;
  readonly message: unknown;
}

export type { IPublishEntity };
