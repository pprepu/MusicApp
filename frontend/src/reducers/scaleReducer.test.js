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

  test('action ADD_MULTIPLE_SCALES adds multiple scales to the state', () => {
    const state = ['f-maj']
    const action = {
      type: 'ADD_MULTIPLE_SCALES',
      data: ['c-maj', 'g-maj', 'b-maj', 'db-maj']
    }

    deepFreeze(state)
    const newState = scaleReducer(state, action)

    for (let interval of action.data) {
      expect(newState).toContain(interval)
    }

    expect(newState.length).toBe(5)
    
  })

  test('action RESET_SCALES removes all scales from the state', () => {
    const state = ['bb-maj', 'eb-maj', 'd-maj']
    const action = {
      type: 'RESET_SCALES'
    }

    deepFreeze(state)
    const newState = scaleReducer(state, action)

    expect(newState.length).toBe(0)
  })
})