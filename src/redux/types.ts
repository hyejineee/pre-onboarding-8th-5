import { Action, AnyAction } from '@reduxjs/toolkit';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import store from './store';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
