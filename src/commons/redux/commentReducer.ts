import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import CommentType from 'commons/types/comment.types';
import { ICommentRepository } from 'commons/types/module.types';

import { RootState } from './types';

const name = 'comment';

type CommentStateType = {
  comments: CommentType[];
  isLoading: boolean;
  error: { visible: boolean; message: string };
};

const initialState: CommentStateType = {
  comments: [],
  isLoading: false,
  error: {
    visible: false,
    message: '',
  },
};

const reducer = {
  toggleIsLoading: (state: RootState) => ({
    ...state,
    isLoading: !state.isLoading,
  }),
};

export type ThunkPayloadType<T> = {
  repository: ICommentRepository;
  payload: T;
};

export const fetchCommentsAction = createAsyncThunk(
  `${name}/fetchComments`,
  async ({ repository }: ThunkPayloadType<undefined>, thunkAPI: any) => {
    try {
      return await repository.fetchComments();
    } catch (e) {
      return thunkAPI.rejectWithValue((e as AxiosError).message);
    }
  },
);

export const createCommentAction = createAsyncThunk(
  `${name}/createComment`,
  async (
    { repository, payload }: ThunkPayloadType<CommentType>,
    thunkAPI: any,
  ) => {
    try {
      await repository.createComment(payload);
      return await repository.fetchComments();
    } catch (e) {
      return thunkAPI.rejectWithValue((e as AxiosError).message);
    }
  },
);

const changeCommentState = (
  state: RootState,
  action: PayloadAction<CommentType[]>,
) => ({ ...state, isLoading: false, comments: action.payload });

const showLoading = (state: RootState) => ({
  ...state,
  isLoading: true,
});

const showError = (state: RootState, action: PayloadAction<string>) => ({
  ...state,
  isLoading: false,
  error: {
    visible: true,
    message: action.payload,
  },
});

const fetchCommentsStatusReducer = {
  [fetchCommentsAction.pending.type]: showLoading,
  [fetchCommentsAction.fulfilled.type]: changeCommentState,
  [fetchCommentsAction.rejected.type]: showError,
};

export const { reducer: commentReducer, actions } = createSlice({
  name,
  initialState,
  reducers: { ...reducer },
  extraReducers: { ...fetchCommentsStatusReducer },
});
