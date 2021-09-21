import sessionReducer from './sessionReducer'
import deepFreeze from 'deep-freeze'
import { initialSession } from './sessionReducer'

describe('sessionReducer', () => {

  const stateMidSession = {
    sessionType: 'interval',
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
    expect(newState.sessionType).toBe('interval')

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

    expect(newState.answersCorrect).toBe(stateMidSession.answersCorrect)
    expect(newState.answersWrong).toBe(stateMidSession.answersWrong + 1)
    expect(newState.currentPage).toBe(stateMidSession.currentPage)
    expect(newState.sessionType).toBe(stateMidSession.sessionType)

    expect(newState.sessionHistory.length).toBe(stateMidSession.sessionHistory.length + 1)
    expect(newState.sessionHistory[newState.sessionHistory.length - 1].answer).toBe('perfect octave')
    expect(newState.sessionHistory[newState.sessionHistory.length - 1].correctAnswer).toBe('major third')
  })

  test('action START_SETTINGS changes the page to the correct one, but does not affect other values', () => {
    const state = {  ...initialSession }
    const action = {
      type: 'START_SETTINGS'
    }
    deepFreeze(state)
    const newState = sessionReducer(state, action)

    expect(newState.currentPage).toBe('intervalSettings')
    expect(newState.sessionType).toBe('interval')

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
    expect(newState.sessionType).toBe('interval')

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
    expect(newState.sessionType).toBe('interval')

    expect(newState.answersCorrect).toBe(stateMidSession.answersCorrect)
    expect(newState.answersWrong).toBe(stateMidSession.answersWrong)
    expect(newState.sessionHistory.length).toBe(stateMidSession.sessionHistory.length)

  })

  test('action VISIT_USERPAGE changes the page to the correct one, but does not affect other values', () => {
    const state = {  ...stateMidSession }
    const action = {
      type: 'VISIT_USERPAGE'
    }
    deepFreeze(state)
    const newState = sessionReducer(state, action)

    expect(newState.answersCorrect).toBe(stateMidSession.answersCorrect)
    expect(newState.answersWrong).toBe(stateMidSession.answersWrong)
    expect(newState.currentPage).toBe('userPage')
    expect(newState.sessionType).toBe(stateMidSession.sessionType)

    expect(newState.sessionHistory.length).toBe(stateMidSession.sessionHistory.length)

  })

  test('action VISIT_LOGINPAGE changes the page to the correct one, but does not affect other values', () => {
    const state = {  ...initialSession }
    const action = {
      type: 'VISIT_LOGINPAGE'
    }
    deepFreeze(state)
    const newState = sessionReducer(state, action)

    expect(newState.currentPage).toBe('login')
    expect(newState.sessionType).toBe('interval')

    expect(newState.answersCorrect).toBe(0)
    expect(newState.answersWrong).toBe(0)
    expect(newState.sessionHistory.length).toBe(0)

  })

  test('action VISIT_SIGNUP changes the page to the correct one, but does not affect other values', () => {
    const state = {  ...initialSession }
    const action = {
      type: 'VISIT_SIGNUP'
    }
    deepFreeze(state)
    const newState = sessionReducer(state, action)

    expect(newState.currentPage).toBe('signup')
    expect(newState.sessionType).toBe('interval')

    expect(newState.answersCorrect).toBe(0)
    expect(newState.answersWrong).toBe(0)
    expect(newState.sessionHistory.length).toBe(0)

  })

  test('action VISIT_ABOUT changes the page to the correct one, but does not affect other values', () => {
    const state = {  ...initialSession }
    const action = {
      type: 'VISIT_ABOUT'
    }
    deepFreeze(state)
    const newState = sessionReducer(state, action)

    expect(newState.currentPage).toBe('about')
    expect(newState.sessionType).toBe('interval')

    expect(newState.answersCorrect).toBe(0)
    expect(newState.answersWrong).toBe(0)
    expect(newState.sessionHistory.length).toBe(0)

  })

  test('action RESET_SESSION resets the session to original values', () => {
    const state = {  ...stateMidSession }
    const action = {
      type: 'RESET_SESSION'
    }
    deepFreeze(state)
    const newState = sessionReducer(state, action)

    expect(newState.currentPage).toBe('front')
    expect(newState.sessionType).toBe('interval')

    expect(newState.answersCorrect).toBe(0)
    expect(newState.answersWrong).toBe(0)
    expect(newState.sessionHistory.length).toBe(0)
  })
})