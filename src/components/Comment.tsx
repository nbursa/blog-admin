import React, { useState } from 'react';
import {
  CommentComponentProps,
} from '../types';
import CommentForm from './CommentForm';
import useAuth from '../hooks/useAuth';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/store';

const CommentComponent: React.FC<CommentComponentProps> = ({
                                           comment,
                                           selectedCommentId,
                                           toggleReplyForm,
                                           submitReplyForm,
                                         }) => {
  const userString = localStorage.getItem('blog_user');
  const user = userString ? JSON.parse(userString) : null;
  const {isAuthenticated} = useAuth();

  const postTitle = comment.postTitle;

  const isSelected = selectedCommentId === comment.id;
  const [showReplyForm, setShowReplyForm] = useState(false);

  console.log('user: ', user);

  const toggleThisReplyForm = () => {
    console.log('toggle this reply', isSelected)
    setShowReplyForm(!showReplyForm);
    if (!isSelected || !showReplyForm) {
      toggleReplyForm(comment);
    }
  };

  return (
    <div key={comment.id} className='p-4 border border-gray-light mb-4 rounded-lg'>
      <div className='grid grid-cols-2 mb-0'>
        <div className='text-sm'>
          {user.name || user.email}
        </div>
        <div className='text-xs text-right'>
          {comment.createdAt.toLocaleString()}
        </div>
      </div>
      <div className='text-sm mb-4'>
        {postTitle}
      </div>
      <div className='text-base mb-4'>
        <div>{comment.comment}</div>
      </div>
      {(!showReplyForm && isAuthenticated) && <div className='flex justify-end'>
        <button
          onClick={toggleThisReplyForm}
          className='border border-gray-light rounded-lg py-0 px-3 text-sm'
        >
          Reply
        </button>
      </div>}
      {comment.replies &&
        <>
          <div className='text-sm mb-2 ml-4'>Replies:</div>
          {comment.replies.map((reply) => (
            <div key={reply.id}
                 className='p-2 ml-4 border-t border-gray-light my-2 bg-gray-lightest'>
              <div className='grid grid-cols-2 mb-4'>
                <div className='text-sm'>
                  {comment.userId}
                </div>
                <div className='text-sm text-right'>
                  {comment.createdAt.toLocaleString()}
                </div>
              </div>
              <div className='text-base'>
                {reply.reply}
              </div>
            </div>
          ))}
        </>
      }
      {showReplyForm && isSelected && (
        <div className='p-4'>
          <CommentForm
            onSubmit={(reply) => {
              submitReplyForm(reply);
              toggleThisReplyForm();
            }}
            closeForm={toggleThisReplyForm}
            type='reply'
          />
        </div>
      )}
    </div>
  );
};

export default CommentComponent;
