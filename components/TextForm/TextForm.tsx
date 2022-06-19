import { ChangeEvent, FormEvent, RefObject, useState } from 'react';
import { createTodo, editTodo, getTodoState, setSearchPattern, setSelectedTaskId } from '../../store/slices/todoSlice';
import { useDispatch, useSelector } from '../../store/store';
import styles from '../../styles/TextForm/TextForm.module.scss'

type Props = {
  inputRef: RefObject<HTMLInputElement>
}

export const TextForm = (props: Props) => {
  const { inputRef } = props
  const dispatch = useDispatch()
  const { todos, pattern, selectedTaskId } = useSelector(getTodoState)

  function onTextChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    dispatch(setSearchPattern(e.target.value))
  }

  async function onTextSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (pattern === '') {
      alert('Task should not be empty!')
      return
    }

    const isTaskExisted = todos.filter(task => task.todo === pattern).length > 0
    if (isTaskExisted) {
      alert('Task already exist!')
      return
    }
    if (selectedTaskId) {
      await dispatch(editTodo({id: selectedTaskId, data: { todo: pattern }})).unwrap()
    } else {
      await dispatch(createTodo({todo: pattern, isCompleted: false})).unwrap()
    }
    dispatch(setSearchPattern(''))
    dispatch(setSelectedTaskId(''))
  }

  return (
    <form
      className={styles.input}
      onSubmit={onTextSubmit}
    >
      <input
        ref={inputRef}
        value={pattern}
        onChange={onTextChange}
        className={styles.input}
        type='text'
        placeholder="Enter your tasks here"
      />
    </form>
  )
}
