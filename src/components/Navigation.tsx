import React, { useRef, useState } from 'react';
import { NavigationProps } from '../types';
import useAuth from '../hooks/useAuth';
import useLayoutHeight from '../hooks/useLayoutHeight.ts';

const Navigation: React.FC<NavigationProps> = ({ routes, currentPath }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigationRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, logoutUser } = useAuth();

  const filteredRoutes = routes.filter(
    route =>
      (isAuthenticated
        ? route.protected && !route.hidden
        : !route.protected && !route.hidden) && route.path !== currentPath
  );

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useLayoutHeight(navigationRef);

  return (
    <nav
      ref={navigationRef}
      className='fixed top-0 w-full flex flex-row items-center justify-between bg-gray-dark h-auto z-50 py-2 px-4 sm:px-8 shadow-gray'
    >
      <div className='flex flex-row justify-between items-center w-full'>
        <div className='font-poppins text-white text-4xl font-extrabold'>
          Nest Blog
        </div>
        <div className='md:hidden'>
          <button
            className='text-white text-xl focus:outline-none border border-white rounded px-2 py-1'
            onClick={toggleDrawer}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
        </div>
      </div>
      <ul
        className={`flex-col md:flex md:flex-row md:visible items-center ${
          isDrawerOpen
            ? 'font-poppins font-extrabold text-3xl visible flex flex-col items-center justify-center gap-12 pt-16 fixed left-0 right-0 top-20 bottom-0 bg-gray-dark text-white z-40 px-4'
            : 'hidden'
        } bg-gray-dark md:text-base font-poppins font-normal`}
      >
        {filteredRoutes.map(route => (
          <li
            key={route.path}
            className='transform -translate-y-16 md:transform-none'
          >
            <a
              href={route.path}
              className='w-full text-white hover:underline py-10 m-0 sm:ml-8 whitespace-nowrap'
            >
              {route.label}
            </a>
          </li>
        ))}
        {isAuthenticated ? (
          <li className='transform -translate-y-16 md:transform-none'>
            <a
              href='/'
              onClick={() => logoutUser()}
              className='w-full text-white hover:underline py-10 m-0 sm:ml-8 whitespace-nowrap'
            >
              Logout
            </a>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default Navigation;
