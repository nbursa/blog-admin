import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSinglePostThunk, deletePostThunk } from '../store/blogActions.ts';
import { RootState } from '../store/store.ts';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import ReactMarkdown from 'react-markdown';
// import { BlogState } from '../types';
import { CodeBlock } from '../components/MarkdownEditor.tsx';
import { useNotification } from '../contexts/NotificationProvider.tsx';
import { UserState } from '../store/userSlice.ts';
import { User } from '../types';

type CompleteState = RootState & {
  user: UserState;
};

const SinglePost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // const dispatch: ThunkDispatch<{ blog: BlogState }, BlogState, AnyAction> =
  useDispatch();
  const dispatch = useDispatch<ThunkDispatch<CompleteState, any, AnyAction>>();

  const currentPost = useSelector((state: RootState) => state.blog.currentPost);
  const [deleteStatus, setDeleteStatus] = React.useState<string | null>(null);
  const notify = useNotification();
  const navigate = useNavigate();
  // const isAuthenticated = useSelector((state: RootState) => state.user.isAdmin);
  // const userState = useSelector((state: RootState) => state.user);
  // const isAdmin = userState.user.isAdmin;
  const userStorage = localStorage.getItem('user');
  const user = userStorage && (JSON.parse(userStorage) as User);
  const isAdmin = user && user?.isAdmin;
  // if (userStorage !== null) {
  //   console.log('user state: ', user);
  // } else {
  //   console.log('User data not found in local storage');
  // }

  useEffect(() => {
    dispatch(fetchSinglePostThunk(id as string));
  }, [id, dispatch]);

  if (
    !currentPost ||
    currentPost.createdAt === undefined ||
    currentPost.updatedAt === undefined
  ) {
    return null;
  }

  const handleDelete = async () => {
    setDeleteStatus('Deleting...');
    try {
      dispatch(deletePostThunk(id as string));
      setDeleteStatus('Post deleted!');
      notify('success', 'Post deleted!');
      if (deleteStatus === 'Post deleted!') {
        return navigate('/');
      }
    } catch (error) {
      setDeleteStatus('Failed to delete');
      notify('failure', 'Failed to delete');
    }
  };

  const PageHeader = () => {
    return (
      <>
        <small className='text-xs'>
          Created At:{' '}
          {new Date(currentPost?.createdAt ?? new Date()).toLocaleString()}
        </small>
        {isAdmin && (
          <>
            <a
              href={`/edit/${currentPost._id}`}
              className='mr-2 p-2 border border-gray-light  rounded'
            >
              Edit Post
            </a>
            <button
              onClick={handleDelete}
              className='p-2 bg-calm-accent border border-calm-accent rounded'
            >
              Delete Post
            </button>
          </>
        )}
        <small className='text-xs text-right'>
          Updated At:{' '}
          {new Date(currentPost?.updatedAt ?? new Date()).toLocaleString()}
        </small>
      </>
    );
  };

  const BackLink = () => {
    return (
      <a
        href='/'
        className='text-xl font-poppins inline-flex flex-1 items-center justify-start group w-auto'
      >
        <img
          className='h-3.5 transform rotate-180 group-hover:-translate-x-1 ease-in duration-200'
          src='/arrow.svg'
          alt='arrow icon'
        />{' '}
        <span className='group-hover:transform group-hover:translate-x-1 ease-in duration-200'>
          Back
        </span>
      </a>
    );
  };

  return (
    <>
      <article className='container mx-auto p-6 max-w-3xl'>
        <div className='flex items-center justify-between my-4'>
          <PageHeader />
        </div>
        <p className='font-poppins text-left text-sm mb-12'>
          Keywords: {currentPost.title}
        </p>
        <div className='text-base'>
          <BackLink />
          <ReactMarkdown components={{ code: CodeBlock }} className='markdown'>
            {currentPost.content}
          </ReactMarkdown>
          <BackLink />
        </div>
        {deleteStatus && <p>{deleteStatus}</p>}
      </article>
    </>
  );
};

export default SinglePost;
