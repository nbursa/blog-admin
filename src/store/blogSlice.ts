import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlogPost } from '../types';
import { initialState } from '../constants';

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<BlogPost[]>) {
      state.posts = action.payload;
      state.loading = false;
    },
    setSinglePost(state, action: PayloadAction<BlogPost>) {
      state.currentPost = action.payload;
      state.loading = false;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading(state) {
      state.loading = true;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { setPosts, setSinglePost, setError, setLoading, clearError } =
  blogSlice.actions;

export default blogSlice.reducer;
