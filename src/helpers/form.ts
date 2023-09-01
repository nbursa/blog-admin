import { BlogPost } from '../types';

export const handleValidation = (values: BlogPost) => {
  const errors: { title: string; content: string } = { title: '', content: '' };
  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title.length < 5) {
    errors.title = 'Must be at least 5 characters long';
  }
  if (!values.content) {
    errors.content = 'Required';
  } else if (values.content.length < 10) {
    errors.content = 'Must be at least 10 characters long';
  }
  return errors;
};

export const handleSubmit = (
  dispatchFunction: (values: BlogPost) => void,
  values: BlogPost,
  clearValues: () => void,
  setIsSuccessful: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    dispatchFunction(values);
    clearValues();
    setIsSuccessful(true);
  } catch (error) {
    console.log('Error submitting post:', error);
    setIsSuccessful(false);
  }
};
