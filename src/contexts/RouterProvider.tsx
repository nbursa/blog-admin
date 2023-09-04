import {
  BrowserRouter as ReactRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { RouteConfig, RouterProviderProps } from '../types';
import React, { startTransition, useState } from 'react';
import AppLayout from '../layouts/AppLayout';
import Loader from '../components/Loader';
import useAuth from "../hooks/useAuth";
import ScrollToTop from '../components/ScrollToTop';

const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { isAdmin } = useAuth();

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

  const filteredRoutes = children.filter((route: RouteConfig) => {
    return !(route.protected && !isAdmin);
  });

  return (
    <ReactRouter>
      <ScrollToTop />
      <AppLayout routes={filteredRoutes}>
        <Routes>
          {filteredRoutes.map((route: RouteConfig, index: number) => {
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
