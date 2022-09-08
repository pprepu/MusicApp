import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'  // for debugging

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import Userpage from './Userpage'
import { useDispatch } from 'react-redux'
import userService from '../../services/users'

const mockStore = configureStore([])

describe('Userpage component: ', () => {

  let store

  beforeEach(() => {
    const mockUser = {
      username: 'test',
      id: '456789456'
    }
    store = mockStore({
      user: mockUser
    })
  })

  test('renders content', () => {
    const component = render(
      <Provider store={store}>
        <Userpage />
      </Provider>
    )
    const element = component.getByText(
      'username:'
    )
    expect(element).toBeDefined()
    // expect(component.container).toHaveTextContent(
    //   'userpage: test'
    // )
  })
})