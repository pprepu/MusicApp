import userReducer from './userReducer'

describe('userReducer', () => {
  const userObject = {
    username: 'tester',
  }
  test('action LOGIN puts an user into the state', () => {
    const state = null
    const action = {
      type: 'LOGIN',
      data: userObject
    }

    const newState = userReducer(state, action)

    expect(newState.username).toBe('tester')

  })
  test('action LOGOUT removes the user from the state, changing its value to null', () => {
    const state = userObject
    const action = {
      type: 'LOGOUT'
    }

    const newState = userReducer(state, action)

    expect(newState).toBeNull()
  })
})

