import React from 'react';

const Loader: React.FC = () => (
  <div className='absolute bg-gray-dark top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-full'>
    <img src='/spinner.svg' alt='spinner icon' className='animate-spin' />
  </div>
);

export default Loader;
