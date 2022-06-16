import { deleteTodo } from '../../store/slices/todoSlice'
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

  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        {props.todo}
      </div>
      <div className={styles.actions}>
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
