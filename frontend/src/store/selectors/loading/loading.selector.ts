import type { TRootState } from '../../redux.store.type';

const loadingUpdatesSelector = (state: TRootState) => state.loading.updatesLoadingStatus;
const loadingAknowledgeSelector = (state: TRootState) => state.loading.aknowledgeLoadingStatus;
const loadingHistorySelector = (state: TRootState) => state.loading.historyLoadingStatus;
const loadingSendMessageSelector = (state: TRootState) => state.loading.sendMessageLoadingStatus;
const loadingUserAuthSelector = (state: TRootState) => state.loading.userAuthLoadingStatus;

export {
  loadingUpdatesSelector,
  loadingAknowledgeSelector,
  loadingHistorySelector,
  loadingSendMessageSelector,
  loadingUserAuthSelector,
};
