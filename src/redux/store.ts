import { Action, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk, { ThunkAction } from 'redux-thunk';

const store = configureStore({
  reducer: {},
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(thunk).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch;
