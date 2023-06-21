import { createSlice } from '@reduxjs/toolkit';
import type { TLoadingStatus } from '../slices.type';
import { LOADING_INIT_STATE } from './loading.slice.const';

/* eslint-disable no-param-reassign */

const loadingSlice = createSlice({
  name: 'loading',
  initialState: LOADING_INIT_STATE,
  reducers: {
    setHistoryLoadStatus(
      state,
      action: { payload: { status: TLoadingStatus; message?: string }; type: string },
    ) {
      state.historyLoadingStatus = action.payload.status;
    },
    setUpdatesLoadStatus(
      state,
      action: { payload: { status: TLoadingStatus; message?: string }; type: string },
    ) {
      state.updatesLoadingStatus = action.payload.status;
    },
    setAknowledgeLoadStatus(
      state,
      action: { payload: { status: TLoadingStatus; message?: string }; type: string },
    ) {
      state.aknowledgeLoadingStatus = action.payload.status;
    },
    setSendMessageLoadStatus(
      state,
      action: { payload: { status: TLoadingStatus; message?: string }; type: string },
    ) {
      state.sendMessageLoadingStatus = action.payload.status;
    },
    setUserAuthLoadStatus(
      state,
      action: { payload: { status: TLoadingStatus; message?: string }; type: string },
    ) {
      state.userAuthLoadingStatus = action.payload.status;
    },
  },
});

const loading = loadingSlice.reducer;
const {
  setHistoryLoadStatus,
  setUpdatesLoadStatus,
  setAknowledgeLoadStatus,
  setSendMessageLoadStatus,
  setUserAuthLoadStatus,
} = loadingSlice.actions;

export {
  loading,
  setHistoryLoadStatus,
  setUpdatesLoadStatus,
  setAknowledgeLoadStatus,
  setSendMessageLoadStatus,
  setUserAuthLoadStatus,
};
