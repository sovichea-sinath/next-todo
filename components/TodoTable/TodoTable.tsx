import { fetchTodos, getTodoState, RequestStatus } from "../../store/slices/todoSlice"
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "../../store/store"
import { TodoRow } from "../TodoRow/TodoRow"
import styles from "../../styles/TodoTable/TodoTable.module.scss"

export const TodoTable = () => {
  const dispatch = useDispatch()
  const todoStatus = useSelector(state => state.todo.status)
  const { todos } = useSelector(getTodoState)

  const [text, setText] = useState('')

  useEffect(() => {
    if (todoStatus === RequestStatus.IDLE) {
      console.log('here');
      dispatch(fetchTodos())
    }
  }, [todoStatus, dispatch])

  function onTextChange(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value)
  }
  
  async function onTextSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (text === '') {
      await dispatch(fetchTodos()).unwrap()
      return
    }

    await dispatch(fetchTodos({ keywords: text })).unwrap()
  }

  return (
    <div className={styles.container}>
      {todos.length === 0?
        <div className={styles.empty}>
          There is no tasks to complete.
        </div> :

        <>
          <form
            onSubmit={onTextSubmit}
          >
            <input
            onChange={onTextChange}
              type='text'
              placeholder="Enter your keywords"
            />
          </form>

          <div>
            {todos.map(todo => {
              return (
                <TodoRow
                  key={todo.id}
                  {...todo}
                />
              )
            })}
          </div>
        </>}
    </div>
  )
}

