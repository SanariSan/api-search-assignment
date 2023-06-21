import type { Store } from './redux.store';

// Infer the `RootState` and `AppDispatch` types from the store itself
export type TRootState = ReturnType<typeof Store.getState>;
export type TAppDispatch = typeof Store.dispatch;
