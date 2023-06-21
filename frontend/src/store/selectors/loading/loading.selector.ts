import type { TRootState } from '../../redux.store.type';

const loadingSearchEntitiesSelector = (state: TRootState) =>
  state.loading.searchEntitiesLoadingStatus;

export { loadingSearchEntitiesSelector };
