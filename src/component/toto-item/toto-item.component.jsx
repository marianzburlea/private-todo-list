import React from 'react'
import { StyledTodoItem, StyledTodoItemDisplay, StyledTodoItemRemove } from './todo-item.styled'

const TodoItem = ({ id, value, actionItem, completed = false }) => {
  return (
    <StyledTodoItem>
      <StyledTodoItemDisplay
        data-testid="toggle"
        title="Click to toggle completed status"
        onClick={() => actionItem({ id, action: 'toggle' })}>
        {completed
          ? <s data-testid="completed">{value}</s>
          : <span>{value}</span>
        }
      </StyledTodoItemDisplay>
      <StyledTodoItemRemove
        data-testid="delete"
        onClick={() => actionItem({ id, action: 'remove' })}>
        &times;
      </StyledTodoItemRemove>
    </StyledTodoItem>
  )
}

export { TodoItem }
