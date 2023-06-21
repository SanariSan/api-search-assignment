import type { TRootState } from '../../redux.store.type';

const entitiesSelector = (state: TRootState) => state.entities.entities;

export { entitiesSelector };
