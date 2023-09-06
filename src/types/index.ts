import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store/store';
import { Action } from '@reduxjs/toolkit';
import React, { ReactNode } from 'react';
import { UserState } from '../store/user/userSlice';

export interface LoginFormValues {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface User {
  _id: string;
  name?: string;
  email: string;
  password: string;
  __v: number;
  isAdmin?: boolean;
  role?: string;
  error?: string | null;
}

export interface CreatePostProps {}

export interface BlogPost {
  _id?: string;
  title: string;
  keywords?: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface BlogState {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
  currentPost: BlogPost | null;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export interface AppProps {}

interface RouteComponentProps {
  postId?: string;
}

export interface RouteConfig {
  path: string;
  component: React.FC<RouteComponentProps>;
  label?: string;
  hidden?: boolean;
  protected?: boolean;
}

export interface NavigationProps {
  routes: RouteConfig[];
  currentPath?: string;
}

export interface AppLayoutProps {
  children: React.ReactNode;
  pathname?: string;
  routes: RouteConfig[];
}

export interface BlogListProps {
  onClick?: (postId: string) => void;
}

export interface EditPostProps {
  postId?: string;
}

export interface HomeProps {}

type NavigateFunctionType = (
  to: string,
  options?: { replace?: boolean; state?: BlogState }
) => void;

export interface FormikFormProps {
  initialValues: BlogPost;
  handleValidation?: (values: BlogPost) => void | object;
  onSubmit: (values: BlogPost) => void;
  navigate: NavigateFunctionType;
  isSuccessful?: boolean;
  type: 'Create' | 'Update';
}

export interface NotificationProps {
  status: 'success' | 'failure' | 'idle';
  message: string;
}

export interface MarkdownEditorProps {
  id?: string;
  label: string;
  name: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: (name: string, isTouched: boolean, shouldValidate: boolean) => void;
  placeholder?: string;
  content?: string;
}

export type NotificationContextType = (
  status: 'success' | 'failure' | 'idle',
  message: string,
  duration?: number
) => void;

export interface NotificationState {
  show: boolean;
  status: 'idle' | 'success' | 'failure';
  message: string;
  duration: number;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthContextProps {
  isAuthenticated: boolean;
  authError: string | null;
  loggedUser: User | null;
  registerUser: (values: LoginFormValues) => void;
  loginUser: (values: {
    email: string;
    password: string;
  }) => Promise<User | undefined>;
  logoutUser: () => void;
  isAdmin?: boolean | undefined;
}

export interface MarkdownWithImageProps {
  content: string;
}

export interface State {
  hasError: boolean;
  errorMessage?: string;
}

export interface Props {
  children: ReactNode;
}

export interface ProtectedRouteProps {
  element: React.ReactElement;
  path: string;
  protected?: boolean;
  caseSensitive?: boolean;
  isAuthenticated?: boolean;
}

export interface RouterProviderProps {
  children: RouteConfig[];
}


// RootState presumably imported from somewhere
export type CompleteState = RootState & {
  user: UserState;
};

export interface Reply {
  _id?: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
  userId: string;
  reply: string;
  commentId?: string;
}

export interface Comment {
  _id?: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
  userName: string;
  userId: string;
  comment: string;
  replies: Reply[];
}

export interface FormProps {
  onSubmit: (comment: string) => void;
  type: 'reply' | 'comment';
  closeForm: () => void;
}

export interface CommentProps {
  comment: Comment;
  showReplyForm: boolean;
  selectedCommentId: string | undefined;
  toggleReplyForm: (comment: Comment) => void;
  submitReplyForm: (commentId: string, reply: string) => void;
  // submitNestedReplyForm: (parentCommentId: string, reply: string) => void;
}
