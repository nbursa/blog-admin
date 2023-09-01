import React from 'react';
import routes from './router/config';
import { AppProps } from './types';
import { NotificationProvider } from './components/NotificationProvider';
import RouterProvider from './router/RouterProvider';

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
