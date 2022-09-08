import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, ReactReduxContext } from 'react-redux'

import noteService from './services/notes'
import sessionService from './services/sessions'
import { allIntervals } from './services/intervals'

import ScaleList from './components/ScaleList'
import IntervalContainer from './components/IntervalContainer'
import SessionSummary from './components/SessionSummary'
import Frontpage from './components/Frontpage'
import LoginForm from './components/LoginForm'
import Userpage from './components/Userpage'
import Signup from './components/Signup'
import Navbar from './components/Navbar/Navbar'
import Aboutpage from './components/Aboutpage'
import GlobalStyle, { Button, Page, StyledButton } from './globalStyles'

import { loginUser, logoutUser } from './reducers/userReducer'
import { visitUserpage, resetSession } from './reducers/sessionReducer'
import { resetScales } from './reducers/scaleReducer.js'
import { resetIntervals } from './reducers/intervalReducer.js'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('musicappUserLoggedIn')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      sessionService.setToken(user.token)
      dispatch(loginUser(user))
    } else {
      dispatch(resetSession())
      dispatch(resetScales())
      dispatch(resetIntervals())
    }
  }, [dispatch])

  const user = useSelector(state => state.user)
  const currentSession = useSelector(state => state.session)
  const currentIntervals = useSelector(state => state.intervals)

  const choosableScales = [...noteService.getMajorScales()]

  return (
    <Page>
      <GlobalStyle />
      <Navbar />
      { currentSession.currentPage === 'login' && <LoginForm /> }
      { currentSession.currentPage === 'front' && <Frontpage /> }
      { currentSession.currentPage === 'intervalQuestions' && <IntervalContainer /> }
      { currentSession.currentPage === 'intervalSettings' && <ScaleList scales={choosableScales} intervals={allIntervals}/> }
      { currentSession.currentPage === 'intervalSummary' && <SessionSummary /> }
      { currentSession.currentPage === 'userPage' && <Userpage /> }
      { currentSession.currentPage === 'signup' && <Signup /> }
      { currentSession.currentPage === 'about' && <Aboutpage /> }
    </Page>
  )
}

export default App