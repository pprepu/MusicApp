import sessionReducer from './sessionReducer'
import deepFreeze from 'deep-freeze'
import { initialSession } from './sessionReducer'

describe('sessionReducer', () => {
  test('action ADD_CORRECT adds a correct answer to the state', () => {
    const state = initialSession
    const action = {
      type: 'ADD_CORRECT'
    }

    deepFreeze(state)
    const newState = sessionReducer(state, action)

    expect(newState.answersCorrect).toBe(1)
    expect(newState.answersWrong).toBe(0)
    
  })
})