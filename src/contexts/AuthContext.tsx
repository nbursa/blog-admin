import React, { createContext, useState, useEffect } from 'react';
import { AuthContextProps, AuthProviderProps } from '../types';
import Loader from '../components/Loader';

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  authError: null,
  loginUser: async () => false,
  logoutUser: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_ENDPOINT as string;

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className='fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-gray-dark text-5xl'>
        <Loader />
      </div>
    );
  }

  const loginUser = async (values: { email: string; password: string }) => {
    try {
      setAuthError(null);
      console.log('apiUrl: ', apiUrl);
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      console.log('res: ', res);
      const data: { access_token?: string } = await res.json();

      if (data.access_token) {
        localStorage.setItem('jwt', data.access_token);
        setIsAuthenticated(true);
        return true;
      } else {
        console.error('No token received', JSON.stringify(data));
        throw new Error('Authentication failed.');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error during login:', error);
      setAuthError(error.message);
      throw error;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('jwt');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, authError, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
