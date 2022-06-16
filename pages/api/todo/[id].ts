// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { todoList } from '.';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string
  switch (req.method) {
    case 'GET':
      const todo = todoList.filter(task => task.id === id)
      res.status(200).json(todo.length > 0? todo[0] : {})
      break;

    case 'PATCH':
    
      break;

    case 'DELETE':

      break;
  
    default:
      res.status(400).json("Request method is invalid!")
      break;
  }
}
