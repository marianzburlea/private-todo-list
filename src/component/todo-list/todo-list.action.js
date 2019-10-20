import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from "./todo-list.const"

export const addTodoAction = value => ({
  type: ADD_TODO,
  value,
})

export const removeTodoAction = id => ({
  type: REMOVE_TODO,
  id,
})

export const toggleTodoAction = id => ({
  type: TOGGLE_TODO,
  id,
})
