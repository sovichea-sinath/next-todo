import styles from '../../styles/TodoRow/TodoRow.module.scss'

interface Props {
  id: string,
  todo: string,
  isCompleted: boolean,
  createdAt?: Date
}

export const TodoRow = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        {props.todo}
      </div>
      <div className={styles.actions}>
        button
      </div>
    </div>
  )
}
