import { ErrorMessage, useField, useFormikContext } from 'formik';
import SimpleMDE from 'react-simplemde-editor';
import React from 'react';
import 'easymde/dist/easymde.min.css';
import { MarkdownEditorProps } from '../types';
import { CodeComponent } from 'react-markdown/lib/ast-to-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export const CodeBlock: CodeComponent = ({ inline, className, children }) => {
  const match = /language-(\w+)/.exec(className || '');
  console.log(match);
  return !inline && match ? (
    <SyntaxHighlighter style={atomOneDark} language={match[1]}>
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className}>{children}</code>
  );
};

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  label,
  placeholder,
  ...props
}) => {
  const [field, meta, helpers] = useField(
    props as { name: string; content: string }
  );
  const { setFieldTouched, setFieldValue } = useFormikContext();

  const handleMarkdownChange = (value: string) => {
    helpers.setValue(value);
    setFieldTouched(field.name, true, true);
    setFieldValue(field.name, value, true);
  };

  const handleMarkdownBlur = () => {
    setFieldTouched(field.name, true, false);
  };

  return (
    <>
      <label htmlFor='content'>{label}:</label>
      <SimpleMDE
        id='content'
        {...field}
        {...props}
        onBlur={handleMarkdownBlur}
        onChange={handleMarkdownChange}
        placeholder={placeholder}
      />
      {meta.touched && meta.error && (
        <ErrorMessage
          name={field.name}
          component='div'
          className='mb-2 text-sm text-calm-accent transform
                -translate-y-[35px]'
        />
      )}
    </>
  );
};

export default MarkdownEditor;
