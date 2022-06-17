import { createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
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
  pattern: string,
  status: RequestStatus,
  error: string | null
}

const initialState: TodoState = {
  todos: [],
  pattern: '',
  status: RequestStatus.IDLE,
  error: null
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (payload?: {keywords?: string}) => {
  const keywords = payload?.keywords
  const url =(`${SERVER_URL}/todo`) + (keywords? `?keywords=${keywords}` : '')
  const response = await axios.get(url)
  return response.data
})

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (initialTodo: {todo: string, isCompleted: boolean}) => {
    const response = await axios.post(`${SERVER_URL}/todo`, initialTodo)
    return response.data
})

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (payload: { id: string }) => {
    const { id } = payload
    const response = await axios.delete(`${SERVER_URL}/todo/${id}`)
    return response.data
})

export const editTodo = createAsyncThunk(
  'todos/editTodo',
  async (payload: { id: string, data: Partial<Todo> }) => {
    const { id, data } = payload
    const response = await axios.patch(`${SERVER_URL}/todo/${id}`, data)
    return response.data
})

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setSearchPattern: (
      state: Draft<typeof initialState>,
      action: PayloadAction<string>
    ) => {
      state.pattern = action.payload
    }
  },
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

    builder
      .addCase(deleteTodo.fulfilled, (state, action) => {
        console.log('action.payload', action.payload)
        const { id } = action.payload

        console.log('state.todos', state.todos)
        const index = state.todos.findIndex(todo => todo.id === id)
        if (index === -1) {
          console.log('id', id)
          alert(`todo with id: ${id} does not exist!`)
        }
  
        state.todos.splice(index, 1)
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.error.message ?? ''
        alert(action.error.message ?? '')
      })

    builder
      .addCase(editTodo.fulfilled, (state, action) => {
        const editedTodo: Todo = action.payload
        const index = state.todos.findIndex(todo => todo.id === editedTodo.id)
        state.todos[index] = editedTodo
      })

      .addCase(editTodo.rejected, (state, action) => {
        state.error = action.error.message ?? ''
        alert(action.error.message ?? '')
      })
  },
})

export const getTodoState = (state: { todo: TodoState }) => state.todo

export const { setSearchPattern } = todoSlice.actions

export default todoSlice.reducer
