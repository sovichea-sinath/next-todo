import { fetchTodos, getTodoState, RequestStatus } from "../../store/slices/todoSlice"
import { RefObject, useEffect } from 'react'
import { useDispatch, useSelector } from "../../store/store"
import { TodoRow } from "../TodoRow/TodoRow"
import styles from "../../styles/TodoTable/TodoTable.module.scss"

type Props = {
  inputRef: RefObject<HTMLInputElement>
}

export const TodoTable = (props: Props) => {
  const { inputRef } = props
  const dispatch = useDispatch()
  const todoStatus = useSelector(state => state.todo.status)
  const { todos, pattern, selectedTaskId } = useSelector(getTodoState)

  const filteredTodos = todos.reduce((todoList, todo) => {
    if ((new RegExp(pattern)).test(todo.todo)) {
      todoList.push(
        <TodoRow
          inputRef={inputRef}
          key={todo.id}
          {...todo}
        />
      )
    }

    return todoList
  }, [] as JSX.Element[])
  const selectedTodo = todos.find(todo => todo.id === selectedTaskId)

  useEffect(() => {
    if (todoStatus === RequestStatus.IDLE) {
      dispatch(fetchTodos())
    }
  }, [todoStatus, dispatch])

  if (selectedTodo) {
    return (
      <TodoRow
        inputRef={inputRef}
        key={selectedTodo.id}
        {...selectedTodo}
      />
    )
  }

  return (
    <div className={styles.container}>
      {filteredTodos.length === 0?
        <div className={styles.empty}>
          There is no tasks to complete. Create a new one instead!
        </div> :
        <div>
          {filteredTodos}
        </div>}
    </div>
  )
}

