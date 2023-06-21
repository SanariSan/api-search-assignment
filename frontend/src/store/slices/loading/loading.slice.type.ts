import type { TLoadingStatus } from '../slices.type';

type TLoadingInitState = {
  historyLoadingStatus: TLoadingStatus;
  updatesLoadingStatus: TLoadingStatus;
  aknowledgeLoadingStatus: TLoadingStatus;
  sendMessageLoadingStatus: TLoadingStatus;
  userAuthLoadingStatus: TLoadingStatus;
};

export type { TLoadingInitState };
