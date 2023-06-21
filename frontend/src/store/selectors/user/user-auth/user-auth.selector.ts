import { createSelector } from 'reselect';
import type { TRootState } from '../../../redux.store.type';

const userAuthIsAuthenticatedSelector = (state: TRootState) => state.user.isAuthenticated;
const userInfoIdInstanceSelector = (state: TRootState) => state.user.idInstance;
const userInfoApiTokenInstanceSelector = (state: TRootState) => state.user.apiTokenInstance;
const userInfoWIdSelector = (state: TRootState) => state.user.wid;
const userInfoSelector = createSelector(
  userInfoIdInstanceSelector,
  userInfoApiTokenInstanceSelector,
  userInfoWIdSelector,
  (idInstance, apiTokenInstance, wid) => ({
    idInstance,
    apiTokenInstance,
    wid,
  }),
);

export {
  userAuthIsAuthenticatedSelector,
  userInfoIdInstanceSelector,
  userInfoApiTokenInstanceSelector,
  userInfoSelector,
};
