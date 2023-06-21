import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import createSagaMiddleware from 'redux-saga';
import { rootWatcher } from './sagas';
import { entities, loading, user, ui } from './slices';

// advanced debugging template
const sagaMiddleware = createSagaMiddleware({
  effectMiddlewares: [
    (next) => (action) => {
      // console.dir(action);
      // console.log({
      //   userType: action.payload?.args?.[0]?.type,
      //   userPayload: action.payload?.args?.[0]?.payload,
      // });
      next(action);
    },
  ],
});

/**
 * Outdated since not passing dtos to sagas, intead sending raw object, then validating in sagas
 *
 * I'm using /rtk's createSlice()/ to create async actions for sagas along with default slice actions
 * It's convenient and removes a need for writing separate action creators
 * Some of those actions-sagas receive DTO classes from UI, process them, then put() RAW VALS to store with other actions
 * However redux-persist effectively think of those async actions as they are directly meant for the slice state mutation
 * So ACTUALLY I don't pass unserializable vals to store, but need to point that to rtk like this:
 *
 * const ignoreSerializableCheckActions = [registerUserAsync, loginUserAsync].map((_) => _.toString());
 */

// Using abort controller as an argument, so have to ignore here
// const ignoredSerializableCheckActions = [fetchChatHistoryAsync, fetchUpdateAsync].map((_) =>
//   _.toString(),
// );

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['ui', 'loading'],
};

const rootReducer = combineReducers({
  entities,
  ui,
  loading,
  user,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const Store = configureStore({
  reducer: persistedReducer,
  // because concat preserves types, spread not
  // https://redux-toolkit.js.org/api/getDefaultMiddleware
  /* eslint-disable unicorn/prefer-spread */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist and custom
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          // ...ignoredSerializableCheckActions,
        ],
      },
    }).concat(sagaMiddleware),
  devTools: process.env.REACT_APP_NODE_ENV === 'development',
  /* eslint-enable unicorn/prefer-spread */
});

const Persistor = persistStore(Store);

sagaMiddleware.run(rootWatcher);

export { Persistor, Store };
