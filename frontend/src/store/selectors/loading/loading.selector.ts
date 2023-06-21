import type { TRootState } from '../../redux.store.type';

const loadingSearchEntitiesSelector = (state: TRootState) =>
  state.loading.searchEntitiesLoadingStatus;
const loadingUserAuthSelector = (state: TRootState) => state.loading.userAuthLoadingStatus;

export { loadingSearchEntitiesSelector, loadingUserAuthSelector };
