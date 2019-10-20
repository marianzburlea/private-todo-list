import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ManageTodo } from '.'

describe('<ManageTodo />', () => {
  const handleSave = jest.fn()
  it('should render the component', () => {
    const { getByTestId, unmount } = render(<ManageTodo handleSave={handleSave} />)
    const submitButton = getByTestId('submit')
    expect(submitButton).toHaveTextContent('Add')
    unmount()
  })

  it('should handle the create', () => {
    const { getByLabelText, getByTestId, unmount } = render(<ManageTodo handleSave={handleSave} />)
    const todoInput = getByLabelText(/add todo/i)
    const submitButton = getByTestId('submit')
    const form = getByTestId('form')
    fireEvent.submit(form)

    expect(todoInput.value).toBeFalsy()
    expect(handleSave).toHaveBeenCalledTimes(1)
    expect(submitButton).toHaveTextContent('Add')
    unmount()
  })
})
