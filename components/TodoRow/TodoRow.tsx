import { RefObject, MouseEvent } from 'react'
import { deleteTodo, editTodo, setSearchPattern, setSelectedTaskId, Todo } from '../../store/slices/todoSlice'
import { useDispatch } from '../../store/store'
import styles from '../../styles/TodoRow/TodoRow.module.scss'

interface Props {
  id: string,
  todo: string,
  isCompleted: boolean,
  createdAt: Date,

  inputRef: RefObject<HTMLInputElement>
}

export const TodoRow = (props: Props) => {
  const { inputRef } = props
  const dispatch = useDispatch()
  
  async function deleteTask(id: string) {
    await dispatch(deleteTodo({ id })).unwrap()
  }

  async function onToggleIsComplete(todo: Todo) {
    const data: Partial<Todo> = { isCompleted: !todo.isCompleted }
    await dispatch(editTodo({id: todo.id, data})).unwrap()
  }

  function onEdit(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, todo: Todo) {
    e.preventDefault()
    if (inputRef.current) {
      inputRef.current.value = todo.todo
      inputRef.current.focus()
      dispatch(setSearchPattern(todo.todo))
      dispatch(setSelectedTaskId(todo.id))

      // trigger onChange
      // const event = new Event('change', { bubbles: true })
      // inputRef.current.dispatchEvent(event)
    }
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.contents} ${props.isCompleted? styles.completed : ''}`}>
        {props.todo}
      </div>
      <div className={styles.actions}>
        <input
          type='checkbox'
          checked={props.isCompleted}
          onChange={() => onToggleIsComplete(props)}
        />
        <div
          className={styles.edit}
          onClick={(e) => onEdit(e, props)}
        >
          edit
        </div>
        <div
          className={styles.delete}
          onClick={() => deleteTask(props.id)}
        >
          delete
        </div>
      </div>
    </div>
  )
}
