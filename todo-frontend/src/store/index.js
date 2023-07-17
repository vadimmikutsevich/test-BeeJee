import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import authReducer from './authSlice';

export default configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer
  }
});