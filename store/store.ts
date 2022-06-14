import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './slices/todoSlice'
import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from 'react-redux'

export const store = configureStore({
  reducer: {
    todo: todoSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useDispatch = () => useDispatchBase<AppDispatch>()

export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector)
