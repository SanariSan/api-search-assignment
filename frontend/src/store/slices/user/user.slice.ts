import { createSlice } from '@reduxjs/toolkit';
import { USER_AUTH_INIT_STATE } from './user.slice.const';
import type { TIsAuthenticated } from './user.slice.type';

/* eslint-disable no-param-reassign */

const userSlice = createSlice({
  name: 'user',
  initialState: USER_AUTH_INIT_STATE,
  reducers: {
    setUserIsAuthenticated(state, action: { payload: { status: TIsAuthenticated }; type: string }) {
      state.isAuthenticated = action.payload.status;
    },
    // sagas
    obtainSessionAsync() {},
  },
});

const user = userSlice.reducer;
const { setUserIsAuthenticated, obtainSessionAsync } = userSlice.actions;

export { obtainSessionAsync, setUserIsAuthenticated, user };
