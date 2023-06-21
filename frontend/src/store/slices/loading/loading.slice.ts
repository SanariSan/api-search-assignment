import { createSlice } from '@reduxjs/toolkit';
import type { TLoadingStatus } from '../slices.type';
import { LOADING_INIT_STATE } from './loading.slice.const';

/* eslint-disable no-param-reassign */

const loadingSlice = createSlice({
  name: 'loading',
  initialState: LOADING_INIT_STATE,
  reducers: {
    setSearchEntitiesLoadingStatus(
      state,
      action: { payload: { status: TLoadingStatus; message?: string }; type: string },
    ) {
      state.searchEntitiesLoadingStatus = action.payload.status;
    },
  },
});

const loading = loadingSlice.reducer;
const { setSearchEntitiesLoadingStatus } = loadingSlice.actions;

export { loading, setSearchEntitiesLoadingStatus };
