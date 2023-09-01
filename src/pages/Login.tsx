import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { LoginFormValues } from '../types';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { loginUser, authError } = useAuth();
  const navigate = useNavigate();
  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const handleValidation = (values: LoginFormValues) => {
    const errors: Partial<LoginFormValues> = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    } else if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 5) {
      errors.password = 'Password must be at least 5 characters long';
    }
    return errors;
  };

  const onSubmit = async (values: LoginFormValues, { setSubmitting }: any) => {
    setSubmitting(true);
    try {
      await loginUser(values);
      // console.log('login values ', values);
      setSubmitting(false);
      navigate('/');
    } catch (error) {
      setSubmitting(false);
    }
    setSubmitting(false);
  };

  return (
    <div className='container w-full h-full mx-auto py-4 px-6 sm:max-w-xs flex flex-col items-center justify-center'>
      <div className='w-full transform -translate-y-24'>
        <h2 className='font-poppins font-bold text-center text-4xl my-12'>
          Login Page
        </h2>
        <Formik
          className='w-full flex flex-col items-center justify-center'
          initialValues={initialValues}
          validate={handleValidation}
          onSubmit={(values, { setSubmitting }) =>
            onSubmit(values, { setSubmitting })
          }
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
              <label htmlFor='email'>Email:</label>
              <Field
                id='email'
                type='email'
                name='email'
                className={`w-full border border-gray-light text-white p-2 rounded ${
                  errors.email && touched.email ? 'mb-1' : 'mb-8'
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && (
                <ErrorMessage
                  name='email'
                  component='div'
                  className='mb-2 text-sm text-calm-accent'
                />
              )}
              <label htmlFor='password'>Password:</label>
              <Field
                id='password'
                type='password'
                name='password'
                className={`w-full border border-gray-light text-white p-2 rounded ${
                  errors.password && touched.password ? 'mb-1' : 'mb-8'
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && (
                <ErrorMessage
                  name='password'
                  component='div'
                  className='mb-2 text-sm text-calm-accent'
                />
              )}

              <button
                type='submit'
                disabled={isSubmitting}
                className='bg-calm-primary rounded text-white font-bold py-2 px-4 w-auto sm:mx-auto disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
        {authError && (
          <div className='mt-6 mx-auto text-center text-calm-accent'>
            {authError}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
