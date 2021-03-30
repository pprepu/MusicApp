import scaleReducer from './scaleReducer'
import deepFreeze from 'deep-freeze'
import { initialState } from './scaleReducer'

describe('scaleReducer', () => {
  test('action ADD_SCALE adds a scale to the state', () => {
    const state = initialState
    const action = {
      type: 'ADD_SCALE',
      data: 'g-maj'
    }

    deepFreeze(state)
    const newState = scaleReducer(state, action)

    expect(newState[0]).toBe('g-maj')
    expect(newState).toContain('g-maj')
    expect(newState.length).toBe(1)
    
  })

  test('action REMOVE_SCALE removes the correct scale from the state', () => {
    const state = ['a-maj', 'c-maj', 'f-maj']
    const action = {
      type: 'REMOVE_SCALE',
      data: 'c-maj'
    }

    deepFreeze(state)
    const newState = scaleReducer(state, action)

    // console.log(state)
    // console.log(newState)

    expect(newState).not.toContain('c-maj')
    expect(newState.length).toBe(2)
    
  })
})