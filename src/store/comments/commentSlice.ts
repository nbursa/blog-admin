import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types';

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetLoading: (state) => {
      state.loading = false;
    },
  },
});

export default commentSlice.reducer;
export const { setComments, setLoading, setError, resetLoading } = commentSlice.actions;
