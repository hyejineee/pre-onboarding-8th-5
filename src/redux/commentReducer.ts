import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import CommentType from 'types/comment.types';
import { RootState } from './types';

const httpClient = axios.create({
  baseURL: 'http://localhost:4000',
});

type CommentStateType = {
  comments: CommentType[];
  isLoading: boolean;
};

const name = 'comment';

const initialState: CommentStateType = {
  comments: [],
  isLoading: false,
};

const reducer = {
  empty: () => {},
};

export const fetchComments = createAsyncThunk(
  `${name}/fetchComments`,
  async (payload: unknown, thunkAPI: any) => {
    try {
      return await httpClient.get<AxiosResponse<CommentType[]>>('/comments');
    } catch (e) {
      return thunkAPI.rejectWithValue('ss');
    }
  },
);

const fetchCommentsStatus = {
  [fetchComments.pending.type]: (state: RootState, action: PayloadAction) => ({
    ...state,
    isLoading: true,
  }),
  [fetchComments.fulfilled.type]: (
    state: RootState,
    action: PayloadAction<CommentType[]>,
  ) => ({
    ...state,
    isLoading: false,
    comments: action.payload,
  }),
};

export const { reducer: commentReducer, actions } = createSlice({
  name,
  initialState,
  reducers: { ...reducer },
  extraReducers: { ...fetchCommentsStatus },
});
