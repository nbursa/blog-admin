import axios from 'axios';
import { setPosts, setError, setLoading, setSinglePost } from './blogSlice';
import { AppThunk, BlogPost } from '../../types';

const BLOG_API = `${process.env.REACT_APP_ENDPOINT}/blog` as string;

export const fetchPostsThunk = (): AppThunk => {
  return async dispatch => {
    dispatch(setLoading());
    try {
      const response = await axios.get(BLOG_API);
      dispatch(setPosts(response.data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };
};

export const fetchSinglePostThunk = (postId: string): AppThunk => {
  return async dispatch => {
    if (!postId) {
      return;
    }
    dispatch(setLoading());
    try {
      const response = await axios.get(`${BLOG_API}/${postId}`);
      dispatch(setSinglePost(response.data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };
};

export const createPostThunk = (newPost: BlogPost): AppThunk => {
  return async (dispatch, getState) => {
    console.log(`createPostThunk: newPost: ${JSON.stringify(newPost)}`);
    dispatch(setLoading());
    try {
      const response = await axios.post(BLOG_API, newPost);
      const updatedPosts = [...getState().blog.posts, response.data];
      dispatch(setPosts(updatedPosts));
      return Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(setError(error.message));
      return Promise.reject(error);
    }
  };
};

export const updatePostThunk = (updatedPost: BlogPost): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(setLoading());
    try {
      const response = await axios.put(
        `${BLOG_API}/${updatedPost._id}`,
        updatedPost
      );

      const updatedPosts = getState().blog.posts.map(post =>
        post._id === updatedPost._id ? response.data : post
      );

      dispatch(setPosts(updatedPosts));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };
};

export const deletePostThunk = (postId: string): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(setLoading());
    try {
      await axios.delete(`${BLOG_API}/${postId}`);

      const updatedPosts = getState().blog.posts.filter(
        post => post._id !== postId
      );

      dispatch(setPosts(updatedPosts));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };
};
