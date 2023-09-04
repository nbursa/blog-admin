import React from 'react';
import routes from './router/config';
import { AppProps } from './types';
import RouterProvider from './contexts/RouterProvider';

const App: React.FC<AppProps> = () => {
  return (
    <div className='bg-gray-dark h-screen w-screen overflow-hidden'>
        <RouterProvider children={routes} />
    </div>
  );
};

export default App;
