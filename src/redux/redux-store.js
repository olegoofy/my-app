import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import dialogsSlice from './dialogsSlice';
import profileSlice from './profileSlice';
import sideBarReducer from './sideBarReducer';
import usersSlice from './usersSlice';

const reducers = combineReducers({
  profilePage: profileSlice,
  dialogsPage: dialogsSlice,
  usersPage: usersSlice,
  sideBar: sideBarReducer,
  auth: authSlice,
});

export const store = configureStore({ reducer: reducers });

window.store = store;
