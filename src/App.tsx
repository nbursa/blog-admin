import React from 'react';
import routes from './router/config';
import { AppProps } from './types';
import { NotificationProvider } from './contexts/NotificationProvider.tsx';
import RouterProvider from './contexts/RouterProvider.tsx';

const App: React.FC<AppProps> = () => {
  return (
    <div className='bg-gray-dark h-screen w-screen overflow-hidden'>
      <NotificationProvider>
        <RouterProvider children={routes} />
      </NotificationProvider>
    </div>
  );
};

export default App;
