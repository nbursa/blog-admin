import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FormikFormProps } from '../types';
import { handleValidation } from '../helpers/form.ts';
import MarkdownEditor from './MarkdownEditor.tsx';

const BlogForm: React.FC<FormikFormProps> = ({
  initialValues,
  onSubmit,
  navigate,
  type = 'Create',
}) => {
  return (
    <Formik
      className='w-full flex flex-col items-center justify-center'
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
      validate={() => handleValidation}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit} className='w-full flex flex-col'>
          <label htmlFor='title' className='mb-1'>
            Keywords:
          </label>
          <Field
            id='title'
            type='text'
            name='title'
            className={`w-full border border-gray-light bg-black-lighter text-white p-2 rounded ${
              errors.title && touched.title ? 'mb-1' : 'mb-8'
            } focus:outline-none focus:border-calm-primary`}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='Enter a title'
            value={values.title}
          />
          {errors.title && touched.title && (
            <ErrorMessage
              name='title'
              component='div'
              className='mb-2 text-sm text-calm-accent'
            />
          )}

          <MarkdownEditor
            id='content'
            label='Content'
            name='content'
            className={`relative w-full bg-gray-dark border border-gray-dark text-white rounded ${
              errors.content && touched.content ? 'mb-1' : 'mb-8'
            } focus:outline-none focus:border-calm-primary`}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.content}
            placeholder='Enter content'
          />

          <div className='flex items-center justify-between'>
            <button
              type='button'
              onClick={() => navigate('/')}
              disabled={isSubmitting}
              className='bg-calm-accent rounded text-white font-bold py-2 px-4 w-auto disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='bg-calm-secondary rounded text-gray-darker font-bold py-2 px-4 w-auto disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {type} Post
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BlogForm;
