import {
  BrowserRouter as ReactRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { RouteConfig, RouterProviderProps } from '../types';
// import useAuth from '../hooks/useAuth.ts';
import React, { startTransition, useState } from 'react';
import AppLayout from '../components/AppLayout.tsx';
import Loader from '../components/Loader.tsx';

const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  // const { isAuthenticated } = useAuth();
  // console.log('isAuthenticated: ', isAuthenticated);
  const [loading, setLoading] = useState(false);
  const isAdmin =
    localStorage.getItem('user') &&
    JSON.parse(localStorage.getItem('user') as string).isAdmin;

  const handleEnter = () => {
    startTransition(() => {
      setLoading(true);
    });
  };

  const handleLeave = () => {
    startTransition(() => {
      setLoading(false);
    });
  };

  return (
    <ReactRouter>
      <AppLayout>
        <Routes>
          {children.map((route: RouteConfig, index: number) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <div
                    onAnimationStart={handleEnter}
                    onAnimationEnd={handleLeave}
                    className='w-full h-full'
                  >
                    {loading ? (
                      <div className='fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-gray-dark text-5xl'>
                        <Loader />
                      </div>
                    ) : route.protected && !isAdmin ? (
                      <Navigate to='/login' replace />
                    ) : (
                      <route.component />
                    )}
                  </div>
                }
              />
            );
          })}
        </Routes>
      </AppLayout>
    </ReactRouter>
  );
};

export default RouterProvider;
