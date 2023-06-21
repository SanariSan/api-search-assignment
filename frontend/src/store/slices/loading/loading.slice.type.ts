import type { TLoadingStatus } from '../slices.type';

type TLoadingInitState = {
  searchEntitiesLoadingStatus: TLoadingStatus;
  userAuthLoadingStatus: TLoadingStatus;
};

export type { TLoadingInitState };
