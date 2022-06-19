// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'
import * as fs from 'fs'

export type Todo = {
  id: string,
  todo: string,
  isCompleted: boolean,
  createdAt?: Date
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const keywords = req.query.keywords as string | undefined
  switch (req.method) {
    case 'POST': {
      const { todo, isCompleted } : { todo: string, isCompleted: boolean } =
        req.body
      const newTodo: Todo = {
        id: uuidv4(),
        todo,
        isCompleted,
        createdAt: new Date()
      }

      const rawData = fs.readFileSync('data.json', 'utf8')
      let todoList = JSON.parse(rawData)

      todoList.push(newTodo)
      const json = JSON.stringify(todoList)
      fs.writeFileSync('data.json', json)

      res.status(201).json(newTodo)
      break
    }

    case 'GET': {
      const rawData = fs.readFileSync('data.json', 'utf8')
      const todoList: Todo[] = JSON.parse(rawData)

      if (keywords) {
        const pattern = new RegExp(keywords)
        const filterList = todoList.filter(task => pattern.test(task.todo))
        res.status(200).json(filterList)
        break
      }
      
      res.status(200).json(todoList)
      break
    }
  
    default:
      res.status(400).json("Request method is invalid!")
      break;
  }
}
