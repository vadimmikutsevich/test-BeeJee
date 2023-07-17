import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async ({ sortOrder, page }) => {
  const response = await api.get('/tasks', {
    params: { order: sortOrder, limit: 3, offset: page * 3 }
  });
  return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const response = await api.post('/tasks', task);
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task) => {
  const response = await api.put(`/tasks/${task.id}`, task, { withCredentials: true });
  return response.data;
});

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [], status: 'idle', error: null, totalTasks: 0 },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload.tasks;
        state.totalTasks = action.payload.totalTasks;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        state.tasks[index] = action.payload;
      });
  }
});

export default tasksSlice.reducer;