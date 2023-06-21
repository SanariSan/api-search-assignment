import type { TLoadingInitState } from './loading.slice.type';

const LOADING_INIT_STATE: TLoadingInitState = {
  historyLoadingStatus: 'idle',
  updatesLoadingStatus: 'idle',
  aknowledgeLoadingStatus: 'idle',
  sendMessageLoadingStatus: 'idle',
  userAuthLoadingStatus: 'idle',
};

export { LOADING_INIT_STATE };
