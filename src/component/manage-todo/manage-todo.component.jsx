import React, { useState, useRef } from 'react'

const ManageTodo = ({ handleSave }) => {
  const todoRef = useRef()

  const handleSubmit = se => {
    se.preventDefault()
    const { value } = todoRef.current
    handleSave(value)
    todoRef.current.value = ''
  }

  return (
    <form data-testid="form" onSubmit={handleSubmit}>
      <label htmlFor="todo-value">Add todo item</label>
      <input
        type="text"
        id="todo-value"
        ref={todoRef}
      />

      <button type="submit" data-testid="submit">Add</button>
    </form>
  )
}

export { ManageTodo }
