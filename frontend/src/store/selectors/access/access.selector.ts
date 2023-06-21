import type { TRootState } from '../../redux.store.type';

const userIsAuthenticatedSelector = (state: TRootState) => state.user.isAuthenticated;

export { userIsAuthenticatedSelector };
