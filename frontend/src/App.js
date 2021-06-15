import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, ReactReduxContext } from 'react-redux'
import './App.css'

import noteService from './services/notes'
import { allIntervals } from './services/intervals'

import ScaleList from './components/ScaleList'
import IntervalContainer from './components/IntervalContainer'
import SessionSummary from './components/SessionSummary'
import Frontpage from './components/Frontpage'
import LoginForm from './components/LoginForm'
import Userpage from './components/Userpage'

import { loginUser, logoutUser } from './reducers/userReducer'
import { visitUserpage, resetSession } from './reducers/sessionReducer'
import { resetScales } from './reducers/scaleReducer.js'
import { resetIntervals } from './reducers/intervalReducer.js'


const App = () => {
  // const [intervalMode, setIntervalMode] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('musicappUserLoggedIn')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loginUser(user))
    } else {
      dispatch(resetSession())
      dispatch(resetScales())
      dispatch(resetIntervals())
    }
  }, [])

  const user = useSelector(state => state.user)
  const currentSession = useSelector(state => state.session)
  const currentIntervals = useSelector(state => state.intervals)
  // const choosableScales = ['c-maj', 'g-maj', 'd-maj', 'a-maj', 'f-maj', 'bb-maj', 'eb-maj', 'ab-maj']
  // const choosableScales = [...noteService.getMajorScales(), 'flat-chrom']
  const choosableScales = [...noteService.getMajorScales()]

  const getDate = () => {
    return new Date().toDateString().split(" ").slice(1).join(" ")
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    window.localStorage.removeItem('musicappUserLoggedIn')
  }

  return (
    <div className='App-container'>
      <div className='App'>
        <div className='menu-container'>
          <div className='menu'>
          <div className='date'>{getDate()}</div>
          <div className='links'>
            <div className='signup'>{user ? <p onClick={() => dispatch(visitUserpage() )}>{user.username}</p> : <p>Signup</p>}</div>
            <div className='login'>{user ? <p onClick={() => handleLogout() }>Logout</p> : <LoginForm />}</div>
          </div>
          </div>
        </div>
        {currentSession.currentPage === 'front' && <Frontpage />}
        {currentSession.currentPage === 'intervalQuestions' && <IntervalContainer />}
        {currentSession.currentPage === 'intervalSettings' && <ScaleList scales={choosableScales} intervals={allIntervals}/>}
        {currentSession.currentPage === 'intervalSummary' && <SessionSummary />}
        {currentSession.currentPage === 'userPage' && <Userpage />}
        
        <div>
          <button className='debug-button' onClick={() => console.log(currentSession, '---', currentIntervals, '---', user)}>debug</button>
        </div>
      </div>
    </div>
  )
}
/*
const App = () => {
  const [note1, setNote1] = useState('')
  const [note2, setNote2] = useState('')
  // currentScale käyttö, jotta sävelet samasta asteikosta vs randomizer kaikista valituista
  const [currentScale, setCurrentScale] = useState('')
  const [currentInterval, setCurrentInterval] = useState('')
  const [otherIntervals, setOtherIntervals] = useState([])

  const scalesInApp = useSelector(state => state.scales)
  const scales = ['c-maj', 'g-maj', 'd-maj', 'a-maj']

  const setRandomNotes = () => {
    if (scalesInApp.length ===  0) {
      console.log('setRandomNotes() needs state.scales to not be empty')
      return 'No scales shown'
    }


    const randomScaleChosen = scalesInApp[Math.floor(Math.random() * Math.floor(scalesInApp.length))]
    setCurrentScale(randomScaleChosen)
    setNote1(noteService.getRandomNoteFromScale(randomScaleChosen))
    setNote2(noteService.getRandomNoteFromScale(randomScaleChosen))
  }

  const findInterval = () => {
    if (note1 === '' || note2 === '' || currentScale === '') {
      return
    }

    setCurrentInterval(intervalService.findIntervalForMajor(note1, note2, currentScale))
    
  }
  
  const findOtherIntervals = () => {
    if (!currentInterval) {
      return
    }
    const otherIntervals = intervalService.generateAllIntervals(currentInterval)
    console.log(`other intervals received = ${otherIntervals}`)
    setOtherIntervals(otherIntervals)
  }

  return (
    <div>
      <ScaleList scales={scales} />
      <button onClick={() => console.log(`scales atm: ${scalesInApp}`)}>scales atm?</button>
      <div>scales atm: {scalesInApp}</div>
      <div>
        <div>notes from scale: {currentScale}</div>
        note 1: {note1}   note 2: {note2}   
        <button onClick={() => setRandomNotes()}>set notes</button>
      </div>
      <div>
        <button onClick={() => findInterval()}>find Interval</button>
        current interval: {currentInterval}
        <button onClick={() => findOtherIntervals()}>find other intervals</button>
        other intervals: {otherIntervals}
      </div>
    </div>
  )
}
*/
export default App
