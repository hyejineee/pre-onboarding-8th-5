import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import CommentType from 'commons/types/comment.types';
import { ICommentRepository } from 'commons/types/module.types';

import { RootState } from './types';

const name = 'comment';

type CommentStateType = {
  totalComment: number;
  comments: CommentType[];
  isLoading: boolean;
  page: number;
  error: { visible: boolean; message: string };
};

type ThunkPayloadType<T> = {
  repository: ICommentRepository;
  payload: T;
};

const initialState: CommentStateType = {
  comments: [],
  page: 1,
  totalComment: 0,
  isLoading: false,
  error: {
    visible: false,
    message: '',
  },
};

export const fetchCommentsPageAction = createAsyncThunk(
  `${name}/fetchCommentsPage`,
  async ({ repository, payload }: ThunkPayloadType<number>, thunkAPI: any) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      thunkAPI.dispatch(updatePage(payload));
      return await repository.fetchCommentsPage(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue((e as AxiosError).message);
    }
  },
);

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
      const comments = await repository.fetchComments();
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      thunkAPI.dispatch(updateTotalComment(comments.length));
      return comments;
    } catch (e) {
      return thunkAPI.rejectWithValue((e as AxiosError).message);
    }
  },
);

export const updateCommentAction = createAsyncThunk(
  `${name}/updateComment`,
  async (
    {
      repository,
      payload,
    }: ThunkPayloadType<{ id: number; comment: CommentType; page: number }>,
    thunkAPI: any,
  ) => {
    try {
      await repository.updateComment(payload.id, payload.comment);
      return await repository.fetchCommentsPage(payload.page);
    } catch (e) {
      return thunkAPI.rejectWithValue((e as AxiosError).message);
    }
  },
);

export const deleteCommentAction = createAsyncThunk(
  `${name}/deleteComment`,
  async ({ repository, payload }: ThunkPayloadType<number>, thunkAPI: any) => {
    try {
      await repository.deleteComment(payload);
      const comments = await repository.fetchComments();
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      thunkAPI.dispatch(updateTotalComment(comments.length));
      return comments;
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
  [fetchCommentsPageAction.pending.type]: showLoading,
  [fetchCommentsAction.pending.type]: showLoading,
  [createCommentAction.pending.type]: showLoading,
  [updateCommentAction.pending.type]: showLoading,
  [deleteCommentAction.pending.type]: showLoading,

  [fetchCommentsPageAction.fulfilled.type]: changeCommentState,
  [fetchCommentsAction.fulfilled.type]: changeCommentState,
  [createCommentAction.fulfilled.type]: changeCommentState,
  [updateCommentAction.fulfilled.type]: changeCommentState,
  [deleteCommentAction.fulfilled.type]: changeCommentState,

  [fetchCommentsPageAction.rejected.type]: showError,
  [fetchCommentsAction.rejected.type]: showError,
  [createCommentAction.rejected.type]: showError,
  [updateCommentAction.rejected.type]: showError,
  [deleteCommentAction.rejected.type]: showError,
};

const reducers = {
  toggleLoading: (state: RootState) => ({
    ...state,
    isLoading: !state.isLoading,
  }),

  hideError: (state: RootState) => ({
    ...state,
    error: {
      visible: false,
      message: '',
    },
  }),

  updateTotalComment: (state: RootState, action: PayloadAction<number>) => ({
    ...state,
    totalComment: action.payload,
  }),

  updatePage: (state: RootState, action: PayloadAction<number>) => ({
    ...state,
    page: action.payload,
  }),
};

const { reducer: commentReducer, actions } = createSlice({
  name,
  initialState,
  reducers,
  extraReducers: { ...fetchCommentsStatusReducer },
});

export default commentReducer;
export const { toggleLoading, hideError, updateTotalComment, updatePage } =
  actions;
