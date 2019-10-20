import React, { useReducer } from 'react'
import { ManageTodo } from '../manage-todo'
import { todoReducer } from './todo-list.reducer'
import { TodoItem } from '../toto-item'
import { addTodoAction, removeTodoAction, toggleTodoAction } from './todo-list.action'

const initialTodoList = [
  {id: 1, completed: false, value: 'do groceries'},
  {id: 2, completed: true, value: 'send test'},
]

const TodoList = () => {
  const [todoList, updateTodoList] = useReducer(todoReducer, initialTodoList)

  const handleSave = value => {
    updateTodoList(addTodoAction(value))
  }

  const handleActionItem = ({ id, action }) => {
    switch(action) {
      case 'remove':
        updateTodoList(removeTodoAction(id))
        break
      default:
        updateTodoList(toggleTodoAction(id))
    }
  }

  return (
    <div>
      <h1>Awesome todo list 2020</h1>
      {todoList.map(todo => <TodoItem key={todo.id} {...todo} actionItem={handleActionItem} />)}
      <ManageTodo handleSave={handleSave} />
    </div>
  )
}

export { TodoList }
