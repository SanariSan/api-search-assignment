import { createSlice } from '@reduxjs/toolkit';
import type { TAccessCheckSessionOutgoingFields } from '../../../services/api';
import { USER_AUTH_INIT_STATE } from './user.slice.const';
import type { TIsAuthenticated, TUserAuthInitState } from './user.slice.type';

/* eslint-disable no-param-reassign */

// example of action creator for saga if decide to move those empty ones
// const registerUserAsync = (payload: IAccessRegisterOutgoingDM) => ({
//   type: 'userAuth/registerUserAsync',
//   payload,
// });

const userSlice = createSlice({
  name: 'user',
  initialState: USER_AUTH_INIT_STATE,
  reducers: {
    setUserIsAuthenticated(state, action: { payload: { status: TIsAuthenticated }; type: string }) {
      state.isAuthenticated = action.payload.status;
    },
    setUserInfo(state, action: { payload: Partial<TUserAuthInitState>; type: string }) {
      Object.entries(action.payload).forEach(([key, val]) => {
        state[key] = val;
      });
    },
    // sagas
    checkUserAuthStatusAsync(
      state,
      action: { payload: Partial<TAccessCheckSessionOutgoingFields>; type: string },
    ) {},
    logoutUserAsync() {},
  },
});

const user = userSlice.reducer;
const { setUserIsAuthenticated, checkUserAuthStatusAsync, logoutUserAsync, setUserInfo } =
  userSlice.actions;

export { checkUserAuthStatusAsync, logoutUserAsync, setUserInfo, setUserIsAuthenticated, user };
