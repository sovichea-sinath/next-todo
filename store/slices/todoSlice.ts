import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

export interface Todo {
  id: string,
  todo: string,
  isCompleted: boolean,
  createdAt: Date
}

export interface TodoState {
  todos: Todo[]
}

const initialState: TodoState = {
  todos: []
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodoList: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.todos>
    ) => {
      state.todos = action.payload
    }
  }
})

export const getTodoState = (state: { todo: TodoState }) => state.todo
export const { setTodoList } = todoSlice.actions
export default todoSlice.reducer
