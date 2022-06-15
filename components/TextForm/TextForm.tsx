import { ChangeEvent, FormEvent, useState } from 'react';
import { getTodoState, setTodoList, Todo } from '../../store/slices/todoSlice';
import { useDispatch, useSelector } from '../../store/store';
import styles from '../../styles/TextForm/TextForm.module.scss'

export const TextForm = () => {
  const dispatch = useDispatch()
  const { todos } = useSelector(getTodoState)
  
  const [text, setText] = useState('')

  function onTextChange(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value)
  }

  function onTextSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (text === '') {
      alert('Task should not be empty')
    } else {
      dispatch(setTodoList([
        ...todos,
        {
          todo: text,
          isCompleted: false,
        } as Todo
      ]))
      
      setText('')
    }
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
