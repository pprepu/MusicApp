import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'  // for debugging

import { Provider } from 'react-redux'
import store from '../store'

import ScaleList from './ScaleList'


test('renders content', () => {
  const component = render(
    <Provider store={store}>
      <ScaleList />
    </Provider>
    
  )

  expect(component.container).toHaveTextContent(
    'Choose the scales you want to get the notes from:'
  )
})