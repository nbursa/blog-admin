import { RouteConfig } from '../types';
import {lazy} from 'react';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const CreatePost = lazy(() => import('../pages/CreatePost'));
const EditPost = lazy(() => import('../pages/EditPost'));
const SinglePost = lazy(() => import('../pages/SinglePost'));

const isAuthenticated = !!localStorage.getItem('blog_access_token');
const isAdmin =
  localStorage.getItem('blog_user') &&
  JSON.parse(localStorage.getItem('blog_user') as string).isAdmin;

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Home,
    label: 'Blogs',
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
    protected: false,
  },
  {
    path: '/create',
    component: CreatePost,
    label: 'New Post',
    protected: true,
    hidden: !isAuthenticated || !isAdmin,
  },
  {
    path: '/edit/:id',
    component: EditPost,
    label: 'Find & Edit',
    protected: true,
    hidden: true,
  },
];

export default routes;
