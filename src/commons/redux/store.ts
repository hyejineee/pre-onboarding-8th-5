import { configureStore } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import commentReducer from './commentReducer';

const store: ToolkitStore = configureStore({
  reducer: {
    comment: commentReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(thunk).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
