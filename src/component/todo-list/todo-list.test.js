import React from 'react'
import { todoReducer } from "./todo-list.reducer"
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from "./todo-list.const"
import { addTodoAction, removeTodoAction, toggleTodoAction } from "./todo-list.action"
import { TodoList } from "./todo-list.component"
import { render, fireEvent, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { getCompleted } from './todo-list.util'

describe('Util', () => {
  it('should count completed', () => {
    const initialTodoList = [
      {id: 1, completed: false, value: 'do groceries'},
      {id: 2, completed: true, value: 'send test'},
      {id: 3, completed: true, value: 'deal with reducer'},
      {id: 4, completed: true, value: 'remember to have fun'},
    ]

    const completed = getCompleted(initialTodoList)
    
    expect(completed).toEqual(3)
  })

  it('should return 0', () => {
    const completed = getCompleted()
    
    expect(completed).toEqual(0)
  })
})

describe('<TodoList />', () => {
  it('should render the component', async () => {
    const addValue = 'fun assignment'
    const { container, findByTestId, findByLabelText, findAllByTestId } = render(<TodoList />)

    const todoInput = await waitForElement(() => findByLabelText('Add todo item'), { container })
    const addButton = await waitForElement(() => findByTestId('submit'), { container })
    
    todoInput.value = addValue
    fireEvent.click(addButton)
    expect(container).toHaveTextContent(addValue)
    
    const deleteButtonList = await waitForElement(() => findAllByTestId('delete'), { container })
    
    fireEvent.click(deleteButtonList[deleteButtonList.length - 1])
    expect(container).not.toHaveTextContent(addValue)
    
    const toggleList = await waitForElement(() => findAllByTestId('toggle'), { container })
    fireEvent.click(toggleList[toggleList.length - 1])

    expect(toggleList[toggleList.length - 1].querySelector('s')).toBeFalsy()
  })
})
describe('action list', () => {
  it('should return an add action', () => {
    const value = 'hi'
    const result = addTodoAction(value)

    expect(result.type).toBe(ADD_TODO)
    expect(result.value).toBe(value)
  })

  it('should return a remove action', () => {
    const id = 2
    const result = removeTodoAction(id)

    expect(result.type).toBe(REMOVE_TODO)
    expect(result.id).toBe(id)
  })

  it('should return a toggle action', () => {
    const id = 2
    const result = toggleTodoAction(id)

    expect(result.type).toBe(TOGGLE_TODO)
    expect(result.id).toBe(id)
  })
})

describe('todoReducer()', () => {
  let state

  beforeEach(() => {
    state = [
      {id: 1, completed: false, value: 'do groceries'},
      {id: 2, completed: true, value: 'send test'},
    ]
  })

  it('should add a todo', () => {
    const action = {
      type: ADD_TODO,
      value: 'new todo'
    }
    const result = todoReducer(state, action)

    expect(result).toHaveLength(state.length + 1)
    expect(result[state.length].completed).toBeFalsy()
  })

  it('should remove a todo', () => {
    const action = {
      type: REMOVE_TODO,
      id: 2
    }
    const result = todoReducer(state, action)

    expect(result).toHaveLength(state.length - 1)
    expect(result[state.length]).toBeFalsy()
  })

  it('should toggle a todo', () => {
    const id = 2
    const action = {
      type: TOGGLE_TODO,
      id
    }
    const result = todoReducer(state, action)

    expect(result).toHaveLength(state.length)
    expect(!result.filter(t => t.id === id)[0].completed).toBe(state.filter(t => t.id === id)[0].completed)
  })

  it('should return the same state', () => {
    const action = {}
    const result = todoReducer(state, action)

    expect(result).toEqual(state)
  })

  it('should return an empty array', () => {
    const action = {}
    const result = todoReducer(undefined, action)

    expect(result).toEqual([])
  })
})
