import React from 'react'
import { render } from 'react-dom'
import { TodoList } from './component/todo-list'

const renderToDom = () => {
  const awesomeTodoList = document.querySelector('#awesome-todo-list')
  if (awesomeTodoList !== null) {
    render(<TodoList />, awesomeTodoList)
  }
}
renderToDom()

export { renderToDom }
