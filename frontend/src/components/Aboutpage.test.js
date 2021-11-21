import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'  // for debugging

import { Provider } from 'react-redux'
import store from '../store'

import Aboutpage from './Aboutpage'


test('renders content', () => {
  const component = render(
    <Provider store={store}>
      <Aboutpage />
    </Provider>

  )

  expect(component.container).toHaveTextContent(
    'More text.'
  )
})