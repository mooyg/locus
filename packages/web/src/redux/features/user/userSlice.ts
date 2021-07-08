import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface UserStruct {
  id?: string;
  username?: string;
  email?: string;
  avatar?: string;
  discord_user_id?: string;
}
const initialState: Record<'value', UserStruct> = {
  value: {},
};
export const userSlice = createSlice({
  name: 'user',

  initialState,

  reducers: {
    setUser(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectMessage = (state: RootState) =>
  state.wrappedReducer.userSlice.value;
export default userSlice.reducer;
