import { AppLayoutProps } from '../types';
import React from 'react';
import routes from '../router/config';
import Navigation from '../components/Navigation';
import useLayoutHeight from '../hooks/useLayoutHeight';
import { useLocation } from 'react-router-dom';

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [bodyHeight, navHeight] = useLayoutHeight();
  const { pathname } = useLocation();

  const bodyStyle: React.CSSProperties = {
    height: `${bodyHeight}px`,
    marginTop: `${navHeight}px`,
  };

  return (
    <>
      <Navigation routes={routes} currentPath={pathname} />
      <div
        style={bodyStyle}
        className='bg-gray-dark w-full h-full overflow-hidden overflow-y-auto'
      >
        {children}
      </div>
    </>
  );
};

export default AppLayout;
