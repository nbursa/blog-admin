import { RouteConfig } from '../types';
import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const CreatePost = lazy(() => import('../pages/CreatePost'));
const EditPost = lazy(() => import('../pages/EditPost'));
const SinglePost = lazy(() => import('../pages/SinglePost'));

// const isAdmin =
//   localStorage.getItem('user') &&
//   JSON.parse(localStorage.getItem('user') as string).isAdmin;
const isAuthenticated = !!localStorage.getItem('jwt');

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Home,
    label: 'Blog',
    hidden: false,
    protected: false,
  },
  {
    path: '/login',
    component: Login,
    label: 'Login',
    hidden: isAuthenticated,
    protected: false,
  },
  {
    path: '/post/:id',
    component: SinglePost,
    label: 'Post',
    hidden: true,
    protected: false,
  },
  {
    path: '/register',
    component: Register,
    label: 'Register',
    hidden: isAuthenticated,
  },
  {
    path: '/create',
    component: CreatePost,
    label: 'New Post',
    protected: true,
    hidden: false,
  },
  {
    path: '/edit/:id',
    component: EditPost,
    label: 'Edit Post',
    protected: true,
    hidden: true,
  },
];

export default routes;
