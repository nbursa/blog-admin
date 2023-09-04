import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './blog/blogSlice';
import userReducer from './user/userSlice';

const store = configureStore({
  reducer: {
    blog: blogReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
