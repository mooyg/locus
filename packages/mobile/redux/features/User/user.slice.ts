import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface UserState {
  value: User;
}

interface User {
  avatar: string;
  email: string;
  id: string;
  username: string;
  discordUserId: string;
}

const initialState: UserState = {
  value: {} as User,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action);
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectCount = (state: RootState) => state.user.value;

export default userSlice.reducer;
