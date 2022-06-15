import { getTodoState } from "../../store/slices/todoSlice"
import { useSelector } from "../../store/store"
import { TodoRow } from "../TodoRow/TodoRow"

export const TodoTable = () => {
  const { todos } = useSelector(getTodoState)

  return (
    todos.length === 0?
      <div>There is no tasks to complete.</div> :
      <div>
        {todos.map(todo => {
          return (
            <TodoRow
              key={todo.todo} // should be todo.id
              {...todo}
            />
          )
        })}
      </div>
  )
}

