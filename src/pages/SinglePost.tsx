import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchSinglePostThunk,
  deletePostThunk
} from '../store/blog/blogActions';
import { RootState } from '../store/store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from '../components/MarkdownEditor';
import { useNotification } from '../contexts/NotificationProvider';
import { CompleteState, User } from '../types';
import CommentComponent from '../components/Comment';
import CommentForm from '../components/CommentForm';
import { useComments } from '../hooks/useComments';

const SinglePost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<ThunkDispatch<CompleteState, any, AnyAction>>();
  const currentPost = useSelector((state: RootState) => state.blog.currentPost);
  const [deleteStatus, setDeleteStatus] = useState<string | null>(null);
  const notify = useNotification();
  const navigate = useNavigate();
  const userStorage = localStorage.getItem('blog_user');
  const user = userStorage && (JSON.parse(userStorage) as User);
  const isAdmin = user && user?.isAdmin;
  const [showModal, setShowModal] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  const {
    comments,
    submitComment,
    submitReply,
    // selectedComment,
    showReplyForm,
    toggleReplyForm,
  } = useComments({ postId: id as string });

  const authenticatedUser = localStorage.getItem('blog_user');

  useEffect(() => {
    dispatch(fetchSinglePostThunk(id as string));
  }, [id, dispatch]);

  if (
    !currentPost ||
    !currentPost._id ||
    currentPost.createdAt === undefined ||
    currentPost.updatedAt === undefined
  ) {
    return null;
  }

  const toggleCommentForm = () => {
    setShowCommentForm((prevState) => !prevState);
  };

  const handleDelete = async () => {
    setDeleteStatus('Deleting...');
    try {
      dispatch(deletePostThunk(id as string));
      setDeleteStatus('Post deleted!');
      notify('success', 'Post deleted!');
      if (deleteStatus === 'Post deleted!') {
        navigate('/');
      }
    } catch (error) {
      setDeleteStatus('Failed to delete');
      notify('failure', 'Failed to delete');
    }
  };

  const PageHeader: React.FC = () => {
    return (
      <>
        <small className='text-xs'>
          Created At:{' '}
          {currentPost?.createdAt ? new Date(currentPost.createdAt).toLocaleString().replace(/\//g, '.') : ""}
        </small>
        {isAdmin && (
          <>
            <a
              href={`/edit/${currentPost._id}`}
              className='text-center mr-2 py-1 px-2 border border-gray-light rounded'
            >
              Edit Post
            </a>
            <button
              onClick={() => setShowModal(true)}
              className='text-center px-2 py-1 bg-calm-accent border border-calm-accent rounded'
            >
              Delete Post
            </button>
          </>
        )}
        <small className='text-xs text-right'>
          Updated At:{' '}
          {currentPost?.updatedAt ? new Date(currentPost.updatedAt).toLocaleString().replace(/\//g, '.') : ""}
        </small>
      </>
    );
  };

  const BackLink: React.FC = () => {
    return (
      <a
        href='/'
        className='text-xl font-poppins inline-flex flex-1 items-center justify-start group w-auto mb-4'
      >
        <img
          className='h-3.5 transform rotate-180 group-hover:-translate-x-1 ease-in duration-200'
          src='/arrow.svg'
          alt='arrow icon'
        />{' '}
        <span className='group-hover:transform group-hover:translate-x-1 ease-in duration-200'>
          All Posts
        </span>
      </a>
    );
  };

  const ConfirmationModal: React.FC = () => {
    return (
      <div className='fixed top-0 left-0 right-0 bottom-0 z-50 inset-0 overflow-y-auto bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center '>
        <div className='bg-white text-black p-6 rounded-lg'>
          <h3 className='mb-8 text-lg font-bold'>
            Are you sure you want to delete this post?
          </h3>
          <div className='flex items-center justify-evenly gap-4 font-normal'>
            <button
              className='px-4 py-2 border border-calm-accent rounded bg-calm-accent text-white flex-1 hover:shadow-lg hover:font-bold'
              onClick={() => {
                handleDelete();
                setShowModal(false);
                navigate('/');
              }}
            >
              Yes
            </button>
            <button
              className='px-4 text-gray-darker py-2 border rounded flex-1 hover:shadow-lg hover:font-bold'
              onClick={() => setShowModal(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='container mx-auto p-6 max-w-3xl'>
      <article className='w-full'>
        <div className='flex items-center justify-between my-4'>
          <PageHeader />
        </div>
        <p className='font-poppins text-left text-sm mb-12'>
          Keywords: {currentPost.keywords || ''}
        </p>
        <div className='text-base mb-16'>
          <BackLink />
          <ReactMarkdown
            components={{ code: CodeBlock }}
            className='markdown'
          >
            {currentPost.content}
          </ReactMarkdown>
          <BackLink />
        </div>
        <div className='flex items-center justify-between my-4'>
          <PageHeader />
        </div>
      </article>

      <div className='w-full py-4 rounded-lg my-14'>
        <h3 className='font-poppins font-bold mb-4'>Comments:</h3>
        {comments?.length > 0 &&
          comments.map((comment, index: number) => (
            <CommentComponent
              key={index}
              comment={comment}
              // submitNestedReplyForm={submitNestedReplyForm}
              selectedCommentId={comment?._id}
              showReplyForm={showReplyForm}
              submitReplyForm={(reply) => submitReply(comment?._id as string, reply)}
              toggleReplyForm={toggleReplyForm}
            />
          ))}
        {showCommentForm &&
          <CommentForm onSubmit={submitComment} type={'comment'} closeForm={toggleCommentForm}/>
        }
        {(!showCommentForm && !!authenticatedUser) && <div
          className='flex flex-col items-center justify-center mt-6 w-full'>
          {comments?.length < 1 &&
            <h4 className='mb-4'>No comments yet.</h4>}
          <button
            onClick={toggleCommentForm}
            className='border border-gray-light rounded-lg px-4 py-1 hover:shadow-white'
          >
            Add new comment
          </button>
        </div>}
        {(!showCommentForm && !authenticatedUser) &&
          <h4 className='my-6 text-center'>No comments yet.</h4>
        }
        {!authenticatedUser && (
          <h3 className='text-center'>
            You need to <a href={'/login'} className="text-blue">login</a> or <a href={'/register'} className="text-blue">register</a> in order to leave comment.
          </h3>
        )}
      </div>

      {showModal && <ConfirmationModal />}
      {deleteStatus && <p>{deleteStatus}</p>}
    </div>
  );
};

export default SinglePost;
