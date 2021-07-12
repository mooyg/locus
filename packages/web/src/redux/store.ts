import { configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import userReducer from './features/user/userSlice';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({ userSlice: userReducer });
const wrappedReducer: typeof rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    console.log('HYDRATE');
    return {
      ...state,
      ...action.payload.wrappedReducer,
    };
  }
  return rootReducer(state, action);
};
export const store = () =>
  configureStore({
    reducer: {
      wrappedReducer,
    },
  });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(store);
