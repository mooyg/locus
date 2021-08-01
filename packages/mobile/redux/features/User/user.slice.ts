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
    incrementByAmount: (state, action: PayloadAction<number>) => {
      //tate.value += action.payload;
    },
    setUser: (state, action) => {
      console.log(action);
    },
  },
});

export const { setUser, incrementByAmount } = userSlice.actions;

export const selectCount = (state: RootState) => state.user.value;

export default userSlice.reducer;
