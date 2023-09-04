import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { handleValidation } from '../helpers/form';
import { CommentFormProps } from '../types';

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, type, closeForm }) => {
  const [comment, setComment] = useState('');

  const formatedType = type.charAt(0).toUpperCase() + type.slice(1);

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const authenticatedUser = localStorage.getItem('blog_user');

    if (authenticatedUser) {
      onSubmit(comment);
      setComment('');
    } else {
      console.log('User is not authenticated.');
      throw new Error('User is not authenticated')
    }
  };

  return (
      <Formik
          initialValues={{ comment: '' }}
          onSubmit={() => {}}
          validate={() => handleValidation}
      >
        <Form onSubmit={handleSubmit} className='w-full flex flex-col'>
          <label htmlFor='comment' className='mb-1'>
            Your {type}:
          </label>
          <Field
              id='comment'
              as='textarea'
              name='comment'
              className='w-full border border-gray-light bg-black-lighter text-white p-2 rounded focus:outline-none focus:border-calm-primary mb-6'
              placeholder={`Enter your ${type}`}
              value={comment}
              onChange={handleCommentChange}
          />

          <div className='flex items-center justify-between'>
            <button
              type='button'
              onClick={closeForm}
              className='rounded border border-gray-light font-normal py-1 px-4 w-auto text-md'
            >
              Cancel
            </button>
            <button
                type='submit'
                className='rounded border border-gray-light font-normal py-1 px-4 w-auto text-md'
            >
              Submit {formatedType}
            </button>
          </div>
        </Form>
      </Formik>
  );
};

export default CommentForm;
