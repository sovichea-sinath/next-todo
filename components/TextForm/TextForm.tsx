import { ChangeEvent, FormEvent, useState } from 'react';
import { createTodo, getTodoState, setSearchPattern } from '../../store/slices/todoSlice';
import { useDispatch, useSelector } from '../../store/store';
import styles from '../../styles/TextForm/TextForm.module.scss'

export const TextForm = () => {
  const dispatch = useDispatch()
  const { todos } = useSelector(getTodoState)
  
  const [text, setText] = useState('')

  function onTextChange(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value)
    dispatch(setSearchPattern(e.target.value))
  }

  async function onTextSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (text === '') {
      alert('Task should not be empty!')
      return
    }

    const isTaskExisted = todos.filter(task => task.todo === text).length > 0
    if (isTaskExisted) {
      alert('Task already exist!')
      return
    }
    await dispatch(createTodo ({todo: text, isCompleted: false})).unwrap()
    dispatch(setSearchPattern(''))

    setText('')
  }

  return (
    <form
      className={styles.input}
      onSubmit={onTextSubmit}
    >
      <input
        value={text}
        onChange={onTextChange}
        className={styles.input}
        type='text'
        placeholder="Enter your tasks here"
      />
    </form>
  )
}
