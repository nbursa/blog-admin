import React, { createContext, useEffect, useState } from 'react';
import { AuthContextProps, AuthProviderProps, User } from '../types';
import { useDispatch } from 'react-redux';
import { clearUser } from '../store/user/userSlice';
import { authAction } from '../store/user/userActions';

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  authError: null,
  loggedUser: null,
  registerUser: async () => {
    return {} as User;
  },
  loginUser: async () => {
    return {} as User;
  },
  logoutUser: () => {},
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [loggedUser, setLocalUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('blog_access_token');
    if (token) {
      setIsAuthenticated(true);
      const storedUser = localStorage.getItem('blog_user');

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setLocalUser(parsedUser);
      }
    }
  }, []);

  const loginUser = async (values: { email: string; password: string }) => {
    try {
      const user = await authAction('/auth/login', values, 'login');
      if (user) {
        setLocalUser(user);
        setIsAuthenticated(true);
        return user;
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setAuthError(error.message);
      throw new Error(error);
    }
  };

  const registerUser = async (values: { email: string; password: string }) => {
    try {
      const user = await authAction('/user/create', values, 'registration');
      if (user) {
        setLocalUser(user);
        setIsAuthenticated(true);
        return user;
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      setAuthError(error.message);
      throw new Error(error);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('blog_access_token');
    localStorage.removeItem('blog_user');
    setIsAuthenticated(false);
    dispatch(clearUser());
  };

  const authContextValue: AuthContextProps = {
    isAuthenticated,
    authError,
    loggedUser,
    isAdmin: loggedUser?.isAdmin ?? false,
    registerUser,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
