import { useState, useEffect } from 'react';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { Comment, Reply } from '../types';
import {
  createCommentThunk,
  createReplyThunk,
  fetchCommentsThunk,
} from '../store/comments/commentActions';
import { RootState } from '../store/store';

type UseCommentsProps = {
  postId: string;
};

type UseCommentsReturn = {
  comments: Comment[];
  submitComment: (comment: string) => void;
  submitReply: (commentId: string, reply: string) => void;
  selectedComment: Comment | null;
  showReplyForm: boolean;
  toggleReplyForm: (comment: Comment | null) => void;
};

export const useComments = ({ postId }: UseCommentsProps): UseCommentsReturn => {
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const comments = useSelector((state: RootState) => state.comment.comments);

  const authenticatedUser = localStorage.getItem('blog_user');
  const parsedUser = authenticatedUser && JSON.parse(authenticatedUser);
  const userId = parsedUser ? parsedUser._id : null;

  console.log('post id: ', postId)

  useEffect(() => {
    try {
      dispatch(fetchCommentsThunk(postId))
    } catch (e) {
      console.error('Failed to fetch comments:', e);
    }
  }, [postId, dispatch]);

  const submitComment = (comment: string) => {
    const newComment: Comment = {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      postId,
      userId,
      userName: parsedUser.name,
      comment,
      replies: [],
    };

    try {
      dispatch(createCommentThunk(newComment))
      dispatch(fetchCommentsThunk(postId));
    } catch (err) {
      console.error('Failed to create comment:', err);
    }
  };

  const submitReply = (commentId: string, reply: string) => {
    const newReply: Reply = {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId,
      userName: parsedUser.name,
      reply,
    };
    try {
      dispatch(createReplyThunk(commentId, newReply))
      dispatch(fetchCommentsThunk(postId));
    } catch (err) {
      console.error('Failed to create reply:', err);
    }
  };

  const toggleReplyForm = (comment: Comment | null) => {
    setSelectedComment(comment);
    setShowReplyForm(!showReplyForm);
  };

  return {
    comments,
    submitComment,
    submitReply,
    selectedComment,
    showReplyForm,
    toggleReplyForm,
  };
};
