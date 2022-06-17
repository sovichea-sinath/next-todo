import { ChangeEvent } from 'react'
import { deleteTodo, editTodo, Todo } from '../../store/slices/todoSlice'
import { useDispatch } from '../../store/store'
import styles from '../../styles/TodoRow/TodoRow.module.scss'

interface Props {
  id: string,
  todo: string,
  isCompleted: boolean,
  createdAt: Date
}

export const TodoRow = (props: Props) => {
  const dispatch = useDispatch()

  
  async function deleteTask(id: string) {
    await dispatch(deleteTodo({ id })).unwrap()
  }

  async function onToggleIsComplete(todo: Todo) {
    const data: Partial<Todo> = { isCompleted: !todo.isCompleted }
    await dispatch(editTodo({id: todo.id, data})).unwrap()
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
          className={styles.delete}
          onClick={() => deleteTask(props.id)}
        >
          delete
        </div>
      </div>
    </div>
  )
}
