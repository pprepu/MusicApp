import sessionReducer from './sessionReducer'
import deepFreeze from 'deep-freeze'
import { initialSession } from './sessionReducer'

describe('sessionReducer', () => {

  const stateMidSession = {
    answersCorrect: 5,
    answersWrong: 2,
    currentPage: 'intervalQuestions',
    sessionHistory: []
  }

  for (let i = 0; i < stateMidSession.answersCorrect; i++) {
    stateMidSession.sessionHistory.push({ answer: 'perfect unison', currentInterval: 'perfect unison' })
  }

  for (let i = 0; i < stateMidSession.answersWrong; i++) {
    stateMidSession.sessionHistory.push({ answer: 'perfect fifth', currentInterval: 'major seventh' })
  }

  test('action ADD_CORRECT adds a correct answer to the state and modifies the sessionhistory, but it does not affect other values', () => {
    const state = { ...initialSession }

    const data = {
      answer: 'perfect unison',
      correctAnswer: 'perfect unison'
    }
    const action = {
      type: 'ADD_CORRECT',
      data
    }

    deepFreeze(state)
    const newState = sessionReducer(state, action)

    expect(newState.answersCorrect).toBe(1)
    expect(newState.answersWrong).toBe(0)
    expect(newState.currentPage).toBe('front')

    expect(newState.sessionHistory.length).toBe(1)
    expect(newState.sessionHistory[0].answer).toBe('perfect unison')
    expect(newState.sessionHistory[0].correctAnswer).toBe('perfect unison')
    
  })

  test('action ADD_WRONG adds an incorrect answer to the state and modifies the sessionhistory, but it does not affect other values', () => {
    const state = { ...stateMidSession }

    const data = {
      answer: 'perfect octave',
      correctAnswer: 'major third'
    }
    const action = {
      type: 'ADD_WRONG',
      data
    }

    deepFreeze(state)
    const newState = sessionReducer(state, action)

    expect(newState.answersCorrect).toBe(5)
    expect(newState.answersWrong).toBe(3)
    expect(newState.currentPage).toBe('intervalQuestions')

    expect(newState.sessionHistory.length).toBe(8)
    expect(newState.sessionHistory[newState.sessionHistory.length - 1].answer).toBe('perfect octave')
    expect(newState.sessionHistory[newState.sessionHistory.length - 1].correctAnswerl).toBe('major third')
  })

  test('action START_SETTINGS changes the page to the correct one, but does not affect other values', () => {
    const state = {  ...initialSession }
    const action = {
      type: 'START_SETTINGS'
    }
    deepFreeze(state)
    const newState = sessionReducer(state, action)

    expect(newState.currentPage).toBe('intervalSettings')

    expect(newState.answersCorrect).toBe(0)
    expect(newState.answersWrong).toBe(0)
    expect(newState.sessionHistory.length).toBe(0)

  })

  test('action START_SESSION changes the page to the correct one, but does not affect other values', () => {
    const state = {  ...initialSession }
    const action = {
      type: 'START_SESSION'
    }
    deepFreeze(state)
    const newState = sessionReducer(state, action)

    expect(newState.currentPage).toBe('intervalQuestions')

    expect(newState.answersCorrect).toBe(0)
    expect(newState.answersWrong).toBe(0)
    expect(newState.sessionHistory.length).toBe(0)
    
  })

  test('action END_SESSION changes the page to the correct one, but does not affect other values', () => {
    const state = {  ...stateMidSession }
    const action = {
      type: 'END_SESSION'
    }
    deepFreeze(state)
    const newState = sessionReducer(state, action)

    expect(newState.currentPage).toBe('intervalSummary')

    expect(newState.answersCorrect).toBe(stateMidSession.answersCorrect)
    expect(newState.answersWrong).toBe(stateMidSession.answersWrong)
    expect(newState.sessionHistory.length).toBe(stateMidSession.sessionHistory.length)
    
  })

  test('action RESET_SESSION resets the session to original values', () => {
    const state = {  ...stateMidSession }
    const action = {
      type: 'RESET_SESSION'
    }
    deepFreeze(state)
    const newState = sessionReducer(state, action)

    expect(newState.currentPage).toBe('front')

    expect(newState.answersCorrect).toBe(0)
    expect(newState.answersWrong).toBe(0)
    expect(newState.sessionHistory.length).toBe(0)
  })
})