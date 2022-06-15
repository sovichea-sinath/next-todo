import { ChangeEvent, FormEvent, useState } from 'react';
import styles from '../../styles/TextForm/TextForm.module.scss'

export const TextForm = () => {
  const [text, setText] = useState('')

  function onTextChange(e: ChangeEvent<HTMLInputElement>) {
    console.log(text)
    setText(e.target.value)
  }

  function onTextSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(text)
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
