import React from 'react'

const TodoItem = ({ id, value, actionItem, completed = false }) => {
  return (
    <div>
      <div data-testid="toggle" onClick={() => actionItem({ id, action: 'toggle' })}>
        {completed
          ? <s data-testid="completed">{value}</s>
          : <span>{value}</span>
        }
      </div>
      <button
        data-testid="delete"
        onClick={() => actionItem({ id, action: 'remove' })}>
        &times;
      </button>
    </div>
  )
}

export { TodoItem }
