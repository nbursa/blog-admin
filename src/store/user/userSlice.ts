import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

export interface UserState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin?: boolean;
  authError: string | null;
  role?: string | undefined;
}

const initialState: UserState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  isAdmin: false,
  authError: null,
  role: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      console.log('setUser action.payload: ', action.payload);
      state.user = action.payload;
      state.loading = false;
      state.user.isAdmin = action.payload.role === 'admin';
      console.log('state: ', state.user);
    },
    clearUser(state) {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
