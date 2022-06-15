import { getTodoState } from "../../store/slices/todoSlice"
import { useSelector } from "../../store/store"
import { TodoRow } from "../TodoRow/TodoRow"
import styles from "../../styles/TodoTable/TodoTable.module.scss"

export const TodoTable = () => {
  const { todos } = useSelector(getTodoState)

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

