import React, { useState } from 'react';
import {
  CommentProps, Reply,
} from '../types';
import CommentForm from './CommentForm';
import useAuth from '../hooks/useAuth';

const CommentComponent: React.FC<CommentProps> = ({
                                           comment,
                                           selectedCommentId,
                                           toggleReplyForm,
                                           submitReplyForm,
                                         }) => {
  const {isAuthenticated} = useAuth();

  const commentId = comment._id as string;
  const isSelected = selectedCommentId === commentId;
  const [showReplyForm, setShowReplyForm] = useState(false);

  const toggleThisReplyForm = () => {
    console.log('toggle this reply', isSelected)
    setShowReplyForm(!showReplyForm);
    if (!isSelected || !showReplyForm) {
      toggleReplyForm(comment);
    }
  };

  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
  };

  return (
    <div key={comment?._id} className='pt-2 border-t border-gray-light mb-2 group'>
      <div className='flex items-center justify-start mb-2'>
        <div className='text-xs'>
          {comment.userName}
        </div>
        <div className='text-[10px] ml-2'>
          {comment?.createdAt ? new Date(comment?.createdAt).toLocaleString().replace(/\//g, '.') : ""}
        </div>
      </div>
      <div className='text-sm'>
        <div>{comment?.comment}</div>
      </div>
      {(!showReplyForm && isAuthenticated) && <div className={`flex justify-end ${isTouchDevice() ? '' : 'invisible group-hover:visible'}`}>
        <button
          onClick={toggleThisReplyForm}
          className='border border-gray-light rounded-lg py-0 px-3 text-sm'
        >
          Reply
        </button>
      </div>}
      {comment?.replies?.length > 0 &&
        <>
          <div className='text-[10px] mb-1 ml-4'>Replies:</div>
          {comment?.replies.map((reply: Reply, index: number) => (
            <div key={index}
                 className='p-2 ml-4 border-t border-gray-light mt-2 bg-gray-lightest'>
              <div className='flex items-center justify-start mb-2'>
                <div className='text-xs'>
                  {reply?.userName}
                </div>
                <div className='text-[10px] ml-2'>
                  {reply?.createdAt ? new Date(reply.createdAt).toLocaleString() : ""}
                </div>
              </div>
              <div className='text-sm'>
                {reply?.reply}
              </div>
            </div>
          ))}
        </>
      }
      {showReplyForm && isSelected && (
        <div className='p-4'>
          <CommentForm
            onSubmit={(commentId: string, reply: string) => {
              submitReplyForm(commentId, reply);
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
