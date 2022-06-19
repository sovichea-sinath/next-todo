// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs'
import { Todo } from '.'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string
  switch (req.method) {
    case 'GET': {
      
      const rawData = fs.readFileSync('data.json', 'utf8')
      const todoList: Todo[] = JSON.parse(rawData)

      const todo = todoList.filter(task => task.id === id)
      res.status(200).json(todo.length > 0? todo[0] : {})
      break
    }

    case 'PATCH': {
      const newTodo: Partial<Todo> = req.body

      const rawData = fs.readFileSync('data.json', 'utf8')
      const todoList: Todo[] = JSON.parse(rawData)

      const index = todoList.findIndex(todo => todo.id === id)
      if (index === -1) {
        res.status(400).json(`todo with id: ${id} does not exist!`)
      }

      todoList[index] = {
        ...todoList[index],
        ...newTodo
      }

      const json = JSON.stringify(todoList)
      fs.writeFileSync('data.json', json)

      res.status(200).json(todoList[index])
      break
    }

    case 'DELETE': {

      const rawData = fs.readFileSync('data.json', 'utf8')
      let todoList: Todo[] = JSON.parse(rawData)

      const index = todoList.findIndex(todo => todo.id === id)
      if (index === -1) {
        res.status(400).json(`todo with id: ${id} does not exist!`)
      }

      todoList.splice(index, 1)

      const json = JSON.stringify(todoList)
      fs.writeFileSync('data.json', json)

      res.status(200).json({ id })
      break
    }
  
    default:
      res.status(400).json("Request method is invalid!")
      break;
  }
}
