import React from 'react';
import { Props, State } from '../types';

class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, errorMessage: '' };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='container font-poppins w-screen h-screen text-calm-accent flex flex-col items-center justify-center'>
          <h1 className='text-2xl font-extrabold mb-8'>
            Something went wrong:{' '}
          </h1>
          <p className='text-xl'>
            <span className='text-2xl font-bold'>Error:</span> "
            {this.state.errorMessage}"
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
