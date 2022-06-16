// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid';

type Todo = {
  id: string,
  todo: string,
  isCompleted: boolean,
  createdAt?: Date
}

export const todoList: Todo[] = [{
  id: 'someid',
  todo: 'sometask',
  isCompleted: false,
  createdAt: new Date()
}]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      const { todo, isCompleted } : { todo: string, isCompleted: boolean } =
        req.body
      const newTodo: Todo = {
        id: uuidv4(),
        todo,
        isCompleted,
        createdAt: new Date()
      }
      todoList.push(newTodo)
      res.status(201).json(newTodo)
      break;

    case 'GET':
      res.status(200).json(todoList)
      break;
  
    default:
      res.status(400).json("Request method is invalid!")
      break;
  }
}
