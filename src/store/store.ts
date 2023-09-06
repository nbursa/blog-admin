import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './blog/blogSlice';
import userReducer from './user/userSlice';
import commentReducer from './comments/commentSlice';

const store = configureStore({
  reducer: {
    blog: blogReducer,
    user: userReducer,
    comment: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
