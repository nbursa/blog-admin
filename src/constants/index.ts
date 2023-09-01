import { BlogState, NotificationState } from '../types';

export const initialState: BlogState = {
  posts: [],
  loading: false,
  error: null,
  currentPost: null,
};

export const initialNotificationState: NotificationState = {
  show: false,
  status: 'idle',
  message: '',
  duration: 3000,
};
