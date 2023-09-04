import { Dispatch } from 'redux';
import { clearUser } from './userSlice';
import { User } from '../../types';

const apiUrl = process.env.REACT_APP_ENDPOINT as string;

export const authAction = async (
  endpoint: string,
  values: { email: string; password: string },
  actionName: string
): Promise<User | null> => {
  try {
    const res = await fetch(`${apiUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    const response: { access_token?: string; user: User; message?: string } =
      await res.json();

    console.log('response: ' + response.access_token)

    if (response.user) {
      console.log('response user: ' + response.user)
    }

    if (response.access_token) {
      console.log('getting token = response.access_token');
      localStorage.setItem('blog_access_token', response.access_token);
      const user = {
        ...response.user,
        isAdmin: response.user.role === 'admin',
      };
      localStorage.setItem('blog_user', JSON.stringify(user));
      return user;
    }

    if (response.message) {
      console.error(`Error during ${actionName} -`, response.message);
      throw new Error(response.message);
    }

    throw new Error(`${actionName} failed.`);
  } catch (error: any) {
    console.error(`Error during ${actionName} -`, error);
    throw error;
  }
};

// Clear the user data and authentication token
const logoutUser = (dispatch: Dispatch) => {
  localStorage.removeItem('blog_access_token');
  localStorage.removeItem('blog_user');
  dispatch(clearUser());
};

export { logoutUser };
