import { BlogState, NotificationState, User } from '../types';

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

export const initialUserState: User | null = null;
