import { fetchTodos, getTodoState, RequestStatus } from "../../store/slices/todoSlice"
import { useEffect } from 'react'
import { useDispatch, useSelector } from "../../store/store"
import { TodoRow } from "../TodoRow/TodoRow"
import styles from "../../styles/TodoTable/TodoTable.module.scss"

export const TodoTable = () => {
  const dispatch = useDispatch()
  const todoStatus = useSelector(state => state.todo.status)
  const { todos } = useSelector(getTodoState)

  useEffect(() => {
    if (todoStatus === RequestStatus.IDLE) {
      console.log('here');
      dispatch(fetchTodos())
    }
  }, [todoStatus, dispatch])
  

  return (
    <div className={styles.container}>
      {todos.length === 0?
        <div className={styles.empty}>
          There is no tasks to complete.
        </div> :
        <div>
          {todos.map(todo => {
            return (
              <TodoRow
                key={todo.id}
                {...todo}
              />
            )
          })}
        </div>}
    </div>
  )
}

