import type { TLoadingInitState } from './loading.slice.type';

const LOADING_INIT_STATE: TLoadingInitState = {
  searchEntitiesLoadingStatus: 'idle',
  userAuthLoadingStatus: 'idle',
};

export { LOADING_INIT_STATE };
