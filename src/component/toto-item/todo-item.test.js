import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { TodoItem } from '.'

describe('<TodoItem />', () => {
  const actionItem = jest.fn();
  const id = 4
  const value = "do groceries"

  it('should render the component', () => {
    const { getByTestId, getByText, queryByTestId, unmount } = render(<TodoItem id={id} value={value} actionItem={actionItem} />)
    const deleteButton = getByTestId('delete')
    const displayValue = getByText(value)
    const completedValue = queryByTestId('completed')
    expect(completedValue).toBeFalsy()

    fireEvent.click(deleteButton)
    fireEvent.click(displayValue)

    expect(deleteButton).toHaveTextContent('×')
    expect(actionItem).toHaveBeenCalledTimes(2)
    expect(actionItem).toHaveBeenCalledWith({ id, action: 'remove' })
    expect(actionItem).toHaveBeenCalledWith({ id, action: 'toggle' })

    unmount()
  })

  it('should render as completed', () => {
    const { getByTestId, unmount } = render(<TodoItem id={id} completed={true} value={value} actionItem={actionItem} />)
    const completedValue = getByTestId('completed')
    expect(completedValue).toBeTruthy()

    unmount()
  })
})
