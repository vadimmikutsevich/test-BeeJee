import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true
});

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/logout');
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const checkSession = createAsyncThunk('auth/check', async (_, {rejectWithValue}) => {
  try {
    const response = await api.get('/auth/check');
    return response.data;
  } catch(err) {
    return rejectWithValue(err.response.data);
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState: { admin: false, status: 'idle', error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.admin = action.payload.admin;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(checkSession.pending, state => {
        state.status = 'loading';
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        state.admin = action.payload.admin;
      })
      .addCase(checkSession.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logout.pending, state => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, state => {
        state.admin = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});

export default authSlice.reducer;