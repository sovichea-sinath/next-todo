// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

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
      
      break;

    case 'GET':
      res.status(200).json(todoList)
      break;
  
    default:
      res.status(400).json("Request method is invalid!")
      break;
  }
}
