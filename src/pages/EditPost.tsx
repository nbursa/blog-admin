import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSinglePostThunk, updatePostThunk } from '../store/blogActions.ts';
import { RootState } from '../store/store.ts';
import { EditPostProps, BlogPost } from '../types';
import type { AppDispatch } from '../store/store';
import { useNavigate, useParams } from 'react-router-dom';
import BlogForm from '../components/BlogForm.tsx';
import { useNotification } from '../contexts/NotificationProvider.tsx';

const EditPost: React.FC<EditPostProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const notify = useNotification();
  const [isLoading, setLoading] = useState(true);

  const { id } = useParams<{ id: string }>();
  const postToUpdate = useSelector(
    (state: RootState) => state.blog.currentPost
  );

  const initialValues: BlogPost = React.useMemo(
    () => ({
      title: postToUpdate?.title || '',
      content: postToUpdate?.content || '',
    }),
    [postToUpdate]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchSinglePostThunk(id as string));
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    if (!postToUpdate || postToUpdate._id !== id) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [id, dispatch, postToUpdate]);

  const onSubmit = async (values: BlogPost) => {
    try {
      await dispatch(updatePostThunk({ _id: postToUpdate?._id, ...values }));
      notify('success', 'Post updated successfully');
    } catch (error) {
      console.error('Failed to update the post', error);
      notify('failure', 'Failed to update the post');
    }
  };

  return (
    <div className='container w-full h-full mx-auto py-4 px-6 sm:max-w-3xl flex flex-col'>
      <div className='w-full pb-8'>
        {!isLoading ? (
          <>
            <h2 className='font-poppins font-bold text-center text-4xl my-12'>
              Edit Post
            </h2>
            <BlogForm
              initialValues={initialValues}
              onSubmit={(values: BlogPost) => onSubmit(values)}
              navigate={navigate}
              type={'Update'}
            />
          </>
        ) : (
          <h2 className='absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 font-poppins font-bold text-center text-4xl my-12'>
            Loading post...
          </h2>
        )}
      </div>
    </div>
  );
};

export default EditPost;
