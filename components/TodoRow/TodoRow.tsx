interface Props {
  id: string,
  todo: string,
  isCompleted: boolean,
  createdAt?: Date
}

export const TodoRow = (props: Props) => {
  return (
    <div>TodoRow</div>
  )
}
