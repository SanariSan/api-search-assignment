import { createSlice } from '@reduxjs/toolkit';
import type { TEntities } from './entities.slice.type';
import { ENTITIES_INIT_STATE } from './entities.slice.const';

/* eslint-disable no-param-reassign */

const entitiesSlice = createSlice({
  name: 'entities',
  initialState: ENTITIES_INIT_STATE,
  reducers: {
    setEntities(
      state,
      action: {
        payload: { entities: TEntities };
        type: string;
      },
    ) {
      state.entities = action.payload.entities;
    },

    // sagas
    searchEntitiesAsync(
      state,
      action: { payload: Partial<Exclude<TEntities[number], undefined>> },
    ) {},
    searchEntitiesV2Async(
      state,
      action: { payload: Partial<Exclude<TEntities[number], undefined>> },
    ) {},
  },
});

const entities = entitiesSlice.reducer;
const { setEntities, searchEntitiesAsync, searchEntitiesV2Async } = entitiesSlice.actions;

export { entities, searchEntitiesAsync, setEntities, searchEntitiesV2Async };
