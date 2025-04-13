import { configureStore } from '@reduxjs/toolkit';
import tablesReducer from './slices/tableSlice';

export const store = configureStore({
  reducer: {
    tables: tablesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
