import intervalReducer from './intervalReducer'
import deepFreeze from 'deep-freeze'

describe('intervalReducer', () => {
  test('action ADD_INTERVAL adds an interval to the state', () => {
    const state = []
    const action = {
      type: 'ADD_INTERVAL',
      data: 'perfect unison'
    }

    deepFreeze(state)
    const newState = intervalReducer(state, action)

    expect(newState).toContain('perfect unison')
    expect(newState.length).toBe(1)

  })

  test('action ADD_MULTIPLE_INTERVALS adds multiple intervals to the state', () => {
    const state = []
    const action = {
      type: 'ADD_MULTIPLE_INTERVALS',
      data: ['perfect unison', 'major third', 'minor seventh']
    }

    deepFreeze(state)
    const newState = intervalReducer(state, action)

    for (let interval of action.data) {
      expect(newState).toContain(interval)
    }
    expect(newState.length).toBe(3)
    expect(newState.length).toBe(state.length + action.data.length)
  })

  test('action REMOVE_INTERVAL removes the correct interval from the state', () => {
    const state = ['major seventh', 'minor second', 'major second', 'minor third', 'perfect octave']
    const initialLength = state.length
    const intervalToBeRemoved = 'minor second'
    const action = {
      type: 'REMOVE_INTERVAL',
      data: intervalToBeRemoved
    }

    deepFreeze(state)
    const newState = intervalReducer(state, action)

    expect(newState).not.toContain(intervalToBeRemoved)
    expect(newState.length).toBe(initialLength - 1)
  })

  test('action RESET_INTERVALS removes all intervals from the state', () => {
    const state = ['minor sixth', 'perfect octave', 'major sixth']
    const action = {
      type: 'RESET_INTERVALS',
    }

    deepFreeze(state)
    const newState = intervalReducer(state, action)
    expect(newState.length).toBe(0)
  })

})