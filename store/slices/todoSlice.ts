import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

export interface Todo {
  id: string,
  todo: string,
  isCompleted: boolean,
  createdAt?: Date
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
    setTodoList: {
      reducer(
        state: Draft<typeof initialState>,
        action: PayloadAction<Todo>
      ) {
        state.todos.push(action.payload)
      },
      prepare(todo: string, isCompleted: boolean) {
        return {
          payload: {
            id: uuidv4(),
            todo,
            isCompleted
          }
        }
      }
    }
  },
})

export const getTodoState = (state: { todo: TodoState }) => state.todo

export const { setTodoList } = todoSlice.actions

export default todoSlice.reducer
