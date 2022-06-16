import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const SERVER_URL = 'http://localhost:3000/api'

export interface Todo {
  id: string,
  todo: string,
  isCompleted: boolean,
  createdAt: Date
}

export enum RequestStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED'
}
export interface TodoState {
  todos: Todo[],
  status: RequestStatus,
  error: string | null
}

const initialState: TodoState = {
  todos: [],
  status: RequestStatus.IDLE,
  error: null
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(`${SERVER_URL}/todo`)
  return response.data
})

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (initialTodo: {todo: string, isCompleted: boolean}) => {
    const response = await axios.post(`${SERVER_URL}/todo`, initialTodo)
    return response.data
})

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // get todo
    builder
      .addCase(fetchTodos.pending, (state, _action) => {
        state.status = RequestStatus.LOADING
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = RequestStatus.SUCCEEDED
        // Add any fetched posts to the array
        state.todos = action.payload
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = RequestStatus.FAILED
        state.error = action.error.message ?? ''
      })

    builder
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload)
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.error = action.error.message ?? ''
      })
  },
})

export const getTodoState = (state: { todo: TodoState }) => state.todo


export default todoSlice.reducer
