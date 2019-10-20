import React from 'react'
import ReactDOM from 'react-dom'
import { renderToDom } from '.'

describe('index', () => {
  const originalRender = ReactDOM.render
  const originalQuerySelector = global.document.querySelector

  beforeEach(() => {
    global.document.querySelector = jest.fn(() => true)
    ReactDOM.render = jest.fn()
  })

  afterEach(() => {
    ReactDOM.render = originalRender
    global.document.querySelector = originalQuerySelector
  })

  it('should call the render function', () => {
    renderToDom()
    expect(ReactDOM.render).toHaveBeenCalled()
    expect(global.document.querySelector).toHaveBeenCalled()
  })
})
