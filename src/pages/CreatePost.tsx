import React, {useMemo} from 'react';
import { useDispatch } from 'react-redux';
import { BlogPost, CreatePostProps } from '../types';
import { AppDispatch } from '../store/store';
import { useNavigate } from 'react-router-dom';
import BlogForm from '../components/BlogForm';
import { createPostThunk } from '../store/blog/blogActions';
import { useNotification } from '../contexts/NotificationProvider';

const CreatePost: React.FC<CreatePostProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const notify = useNotification();

  const initialValues: BlogPost = useMemo(
    () => ({
      keywords: '',
      title: '',
      content: '',
    }),
    []
  );

  const onSubmit = async (values: BlogPost) => {
    console.log('edit post submit values', values);
    try {
      await dispatch(createPostThunk(values));
      notify('success', 'Post created successfully');
      navigate('/');
    } catch (error) {
      console.error('Failed to update the post', error);
      notify('failure', 'Failed to create the post');
    }
  };

  return (
    <div className='container w-full h-full mx-auto py-4 px-6 sm:max-w-3xl flex flex-col'>
      <div className='w-full pb-20'>
        <h2 className='font-poppins font-bold text-center text-4xl my-12'>
          Create Post
        </h2>
        <BlogForm
          initialValues={initialValues}
          onSubmit={(values: BlogPost) => onSubmit(values)}
          navigate={navigate}
          type={'Create'}
        />
      </div>
    </div>
  );
};

export default CreatePost;
