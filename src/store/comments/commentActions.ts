import axios from 'axios';
import { setComments, setError, setLoading } from './commentSlice';
import { AppThunk, Comment, Reply } from '../../types';

const COMMENTS_ENDPOINT = `${process.env.REACT_APP_ENDPOINT}/comments`;

export const fetchCommentsThunk = (postId: string): AppThunk => {
  return async dispatch => {
    dispatch(setLoading());
    try {
      const response = await axios.get(`${COMMENTS_ENDPOINT}/post/${postId}`);
      dispatch(setComments(response.data));
      return response.data;
    } catch (error: any) {
      dispatch(setError(error.message));
      throw error;
    }
  };
};

export const createCommentThunk = (newComment: Comment): AppThunk => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${COMMENTS_ENDPOINT}/create`, newComment);
      if (response.status === 201) {
        const updatedComment: Comment = response.data.comment;

        dispatch(fetchCommentsThunk(updatedComment.postId));

        return Promise.resolve(updatedComment);
      }
    } catch (error: any) {
      dispatch(setError(error.message));
      return Promise.reject(error);
    }
  };
};

export const createReplyThunk = (commentId: string, newReply: Reply): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.put(`${COMMENTS_ENDPOINT}/${commentId}/replies`, newReply);
      const postId = getState().comment.comments.find(c => c._id === commentId)?.postId;
      if (postId) {
        dispatch(fetchCommentsThunk(postId));
      }
      return Promise.resolve(response.data);
    } catch (error: any) {
      dispatch(setError(error.message));
      return Promise.reject(error);
    }
  };
};
