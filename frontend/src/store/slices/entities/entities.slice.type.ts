import type { TEntitiesSearchIncomingSuccessFields } from '../../../services/api/dto/entities';

type TEntities = TEntitiesSearchIncomingSuccessFields['data']['entities'];

type TEntitiesInitState = {
  entities: TEntities;
};

export type { TEntities, TEntitiesInitState };
