import { Dispatch } from 'redux';
import { clearUser } from './userSlice';
import { User } from '../types';

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
    if (response.access_token) {
      localStorage.setItem('jwt', response.access_token);
      const user = {
        ...response.user,
        isAdmin: response.user.role === 'admin',
      };
      localStorage.setItem('user', JSON.stringify(user));
      if (response.user) {
        return response.user;
      } else {
        // console.error('No user response received', JSON.stringify(response));
        throw new Error(`${actionName} failed.`);
      }
    } else {
      // console.error(`${actionName} failed. ${response?.message}`);
      // throw new Error(`${actionName} failed. ${response?.message}`);
      if (response?.message) {
        console.log('response: ', response);
        // return response as any;
        throw new Error(response.message);
      } else {
        throw new Error(`${actionName} failed.`);
      }
    }
  } catch (error: any) {
    console.error(`Error during ${actionName} -`, error);
    throw new Error(error);
    // return error;
  }
};

// Clear the user data and authentication token
const logoutUser = (dispatch: Dispatch) => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('user');
  dispatch(clearUser());
};

export { logoutUser };
